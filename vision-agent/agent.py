import asyncio

from dotenv import load_dotenv
from vision_agents.core import Agent, Runner, User
from vision_agents.core.agents import AgentLauncher
from vision_agents.plugins import getstream, openai

load_dotenv()

DEFAULT_LANGUAGE = "Spanish"


def _build_instructions(
    target_language: str,
    ai_teacher_prompt: str = "",
    goals: list | None = None,
    vocabulary: list | None = None,
    phrases: list | None = None,
) -> str:
    parts = [
        f"You are a friendly and encouraging AI language teacher.",
        f"You always speak English and teach the user {target_language} through English.",
        "Keep responses concise and conversational — this is a voice session.",
        f"Introduce key {target_language} words and phrases, correct pronunciation gently,",
        "and give short exercises like repeating words or simple translations.",
        "Never switch away from English as your teaching language.",
    ]

    if ai_teacher_prompt:
        parts.append(f"\nLesson focus: {ai_teacher_prompt}")

    if goals:
        parts.append(f"\nLesson goals: {', '.join(goals)}")

    if vocabulary:
        vocab_items = "; ".join(
            f"{v['word']} ({v['translation']})" for v in vocabulary[:10]
        )
        parts.append(f"\nKey vocabulary to cover: {vocab_items}")

    if phrases:
        phrase_items = "; ".join(
            f"{p['phrase']} ({p['translation']})" for p in phrases[:5]
        )
        parts.append(f"\nKey phrases to teach: {phrase_items}")

    return " ".join(parts)


async def create_agent(
    target_language: str = DEFAULT_LANGUAGE,
    ai_teacher_prompt: str = "",
    goals: list | None = None,
    vocabulary: list | None = None,
    phrases: list | None = None,
    **kwargs,
) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Lingua Teacher", id="lingua-teacher"),
        instructions=_build_instructions(
            target_language=target_language,
            ai_teacher_prompt=ai_teacher_prompt,
            goals=goals or [],
            vocabulary=vocabulary or [],
            phrases=phrases or [],
        ),
        llm=openai.Realtime(),
    )


async def join_call(
    agent: Agent,
    call_type: str,
    call_id: str,
    target_language: str = DEFAULT_LANGUAGE,
    **kwargs,
) -> None:
    call = await agent.create_call(call_type, call_id)
    async with agent.join(call):
        await agent.simple_response(
            text=(
                f"Greet the user warmly, introduce yourself as their {target_language} "
                f"teacher for today's lesson, and ask them if they're ready to start."
            )
        )
        # Stay in the call until the session is stopped via DELETE /calls/{id}/sessions/{sid}
        # The AgentLauncher cancels this task on session stop, triggering CancelledError.
        try:
            await asyncio.sleep(3600)
        except asyncio.CancelledError:
            pass


runner = Runner(AgentLauncher(create_agent=create_agent, join_call=join_call))


if __name__ == "__main__":
    runner.cli()
