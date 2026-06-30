import asyncio
import logging
import sys
from contextlib import asynccontextmanager
from uuid import uuid4

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from vision_agents.core import Agent, User
from vision_agents.core.agents.events import UserTranscriptEvent
from vision_agents.core.llm.events import LLMResponseFinalEvent
from vision_agents.plugins import getstream, openai

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    stream=sys.stdout,
    force=True,
)
# Also surface DEBUG logs from the vision_agents WebRTC/ICE pipeline so we can see
# exactly what's happening with the OpenAI Realtime connection.
logging.getLogger("vision_agents.plugins.openai").setLevel(logging.DEBUG)
logging.getLogger("vision_agents.core").setLevel(logging.DEBUG)
logger = logging.getLogger("lingua-agent")

DEFAULT_LANGUAGE = "Spanish"

# session_id → running asyncio.Task
_active_sessions: dict[str, asyncio.Task] = {}


def _build_instructions(
    target_language: str,
    ai_teacher_prompt: str = "",
    goals: list | None = None,
    vocabulary: list | None = None,
    phrases: list | None = None,
) -> str:
    vocab_list = "; ".join(
        f"{v['word']} = {v['translation']}" for v in (vocabulary or [])[:10]
    )
    phrase_list = "; ".join(
        f"{p['phrase']} = {p['translation']}" for p in (phrases or [])[:5]
    )

    lines = [
        f"You're a warm, energetic {target_language} teacher having a live voice conversation with a student.",
        "",
        "TURN-TAKING — THIS IS THE MOST IMPORTANT RULE:",
        "Say ONE thing per turn. One word introduction, OR one question, OR one piece of praise — never more than two short sentences.",
        "After you finish speaking, go completely silent and wait. The student will speak next. Do not continue until you hear their response.",
        "Never chain multiple instructions or questions together in a single turn.",
        "",
        "HOW TO TEACH:",
        "- Introduce one target-language word at a time. Say it clearly, give the English meaning immediately after.",
        "- Ask the student to repeat it. Then stop and listen.",
        "- If they repeat it correctly, say a brief encouraging word (one sentence), then move to the next word.",
        "- If they struggle, gently model the word once more and ask them to try again. Then stop and listen.",
        "- Use contractions and sound like a real person ('let's', 'you'll', 'that's great!').",
        "",
        "STRICT CONTENT RULE: Teach ONLY the vocabulary and phrases listed below. Do not introduce unrelated words, grammar rules, or any other language.",
    ]

    if ai_teacher_prompt:
        lines.append(f"\nPersona and focus: {ai_teacher_prompt}")
    if goals:
        lines.append(f"Lesson goals: {', '.join(goals)}.")
    if vocab_list:
        lines.append(f"Vocabulary to cover in order: {vocab_list}.")
    if phrase_list:
        lines.append(f"Phrases to cover: {phrase_list}.")

    return "\n".join(lines)


async def _run_session(
    call_id: str,
    call_type: str,
    target_language: str,
    ai_teacher_prompt: str,
    goals: list,
    vocabulary: list,
    phrases: list,
) -> None:
    logger.info(f"[session] Building agent for call {call_id} ({target_language})")
    agent = Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Lingua Teacher", id="lingua-teacher"),
        instructions=_build_instructions(
            target_language=target_language,
            ai_teacher_prompt=ai_teacher_prompt,
            goals=goals,
            vocabulary=vocabulary,
            phrases=phrases,
        ),
        llm=openai.Realtime(),
    )
    try:
        call = await agent.create_call(call_type, call_id)
        logger.info(f"[session] Joining call {call_id}")
        async with agent.join(call):
            logger.info(f"[session] Joined — waiting 2 s for WebRTC tracks to settle")
            # Give ICE/WebRTC audio tracks a moment to fully establish before speaking
            await asyncio.sleep(2)

            # Forward transcript events as Stream custom events so the mobile app
            # can display live captions for both the teacher and the student.
            @agent.subscribe
            async def _on_transcript(event):
                try:
                    if isinstance(event, UserTranscriptEvent) and event.text:
                        await agent.edge.send_custom_event({
                            "type": "lingua.caption",
                            "speaker": "student",
                            "text": event.text,
                        })
                    elif isinstance(event, LLMResponseFinalEvent) and event.text:
                        await agent.edge.send_custom_event({
                            "type": "lingua.caption",
                            "speaker": "teacher",
                            "text": event.text,
                        })
                except Exception as exc:
                    logger.warning(f"[session] Caption send failed: {exc}")

            logger.info("[session] Sending greeting via simple_response")
            try:
                await agent.simple_response(
                    text=(
                        f"Greet the student with one warm sentence and introduce yourself as their "
                        f"{target_language} teacher. "
                        f"That is all — say nothing else. Wait for them to respond before continuing."
                    )
                )
                logger.info("[session] simple_response sent successfully")
            except Exception as exc:
                logger.error(f"[session] simple_response failed: {exc}", exc_info=True)

            # Hold the session open until cancelled (DELETE /calls/{id}/sessions/{sid})
            try:
                await asyncio.sleep(3600)
            except asyncio.CancelledError:
                logger.info(f"[session] Session {call_id} cancelled")
    except asyncio.CancelledError:
        logger.info(f"[session] Session {call_id} task cancelled during join")
    except Exception as exc:
        logger.error(f"[session] Session {call_id} failed: {exc}", exc_info=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("[server] Lingua agent server starting")
    yield
    logger.info("[server] Shutting down — cancelling active sessions")
    tasks = list(_active_sessions.values())
    for t in tasks:
        t.cancel()
    if tasks:
        await asyncio.gather(*tasks, return_exceptions=True)
    _active_sessions.clear()
    logger.info("[server] Shutdown complete")


app = FastAPI(lifespan=lifespan)


class StartSessionRequest(BaseModel):
    call_type: str = "audio_room"
    target_language: str = DEFAULT_LANGUAGE
    ai_teacher_prompt: str = ""
    goals: list[str] = []
    vocabulary: list[dict] = []
    phrases: list[dict] = []


@app.post("/calls/{call_id}/sessions", status_code=201)
async def start_session(call_id: str, request: StartSessionRequest):
    session_id = str(uuid4())
    logger.info(
        f"[server] New session {session_id} | call={call_id} | lang={request.target_language} "
        f"| vocab={len(request.vocabulary)} words"
    )
    task = asyncio.create_task(
        _run_session(
            call_id=call_id,
            call_type=request.call_type,
            target_language=request.target_language,
            ai_teacher_prompt=request.ai_teacher_prompt,
            goals=request.goals,
            vocabulary=request.vocabulary,
            phrases=request.phrases,
        ),
        name=f"session-{session_id}",
    )
    _active_sessions[session_id] = task
    task.add_done_callback(lambda _: _active_sessions.pop(session_id, None))
    return {"session_id": session_id, "call_id": call_id}


@app.delete("/calls/{call_id}/sessions/{session_id}", status_code=202)
async def stop_session(call_id: str, session_id: str):
    task = _active_sessions.pop(session_id, None)
    if task:
        task.cancel()
        logger.info(f"[server] Session {session_id} stop requested")
    return {}


@app.get("/health")
async def health():
    return {"status": "ok", "active_sessions": len(_active_sessions)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
