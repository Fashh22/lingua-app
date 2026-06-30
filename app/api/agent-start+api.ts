import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET!;
const AGENT_SERVER_URL = process.env.VISION_AGENT_SERVER_URL ?? "http://127.0.0.1:8000";
const AGENT_USER_ID = "lingua-teacher";

type StartAgentBody = {
  callId: string;
  callType: string;
  userId: string;
  language: string;
  lessonId: string;
  goals: string[];
  vocabulary: Array<{ word: string; translation: string }>;
  phrases: Array<{ phrase: string; translation: string }>;
  aiTeacherPrompt: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StartAgentBody;
    const {
      callId,
      callType = "audio_room",
      userId,
      language,
      lessonId,
      goals,
      vocabulary,
      phrases,
      aiTeacherPrompt,
    } = body;

    if (!callId || !userId) {
      return Response.json({ error: "Missing callId or userId" }, { status: 400 });
    }
    if (!STREAM_API_KEY || !STREAM_API_SECRET) {
      console.error("[agent-start] Stream env vars not configured");
      return Response.json({ error: "Stream not configured" }, { status: 500 });
    }

    // 1. Set up the Stream call server-side: add agent as admin + go live
    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
    const call = streamClient.video.call(callType, callId);

    try {
      await call.getOrCreate({
        data: {
          created_by_id: userId,
          members: [
            { user_id: userId, role: "admin" },
            { user_id: AGENT_USER_ID, role: "admin" },
          ],
        },
      });
    } catch (err) {
      // Call likely already exists — that's fine
      console.warn("[agent-start] getOrCreate skipped:", (err as Error)?.message);
    }

    try {
      await call.updateCallMembers({
        update_members: [{ user_id: AGENT_USER_ID, role: "admin" }],
      });
    } catch (err) {
      console.warn("[agent-start] updateCallMembers skipped:", (err as Error)?.message);
    }

    try {
      await call.goLive();
    } catch (err) {
      // Already live is fine
      console.warn("[agent-start] goLive skipped:", (err as Error)?.message);
    }

    // 2. Spawn the Vision Agent for this call
    const agentUrl = `${AGENT_SERVER_URL}/calls/${encodeURIComponent(callId)}/sessions`;
    console.log("[agent-start] Calling Vision Agent:", agentUrl);

    let agentRes: Response;
    try {
      agentRes = await fetch(agentUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call_type: callType,
          target_language: language,
          lesson_id: lessonId,
          goals,
          vocabulary,
          phrases,
          ai_teacher_prompt: aiTeacherPrompt,
        }),
      });
    } catch (err) {
      console.error("[agent-start] Cannot reach Vision Agent at", agentUrl, err);
      return Response.json(
        { error: "Vision Agent unreachable — is it running at " + AGENT_SERVER_URL + "?" },
        { status: 502 }
      );
    }

    if (!agentRes.ok) {
      const text = await agentRes.text().catch(() => "");
      console.error("[agent-start] Vision Agent returned", agentRes.status, text);
      return Response.json(
        { error: "Failed to start agent", detail: text },
        { status: 502 }
      );
    }

    const { session_id } = (await agentRes.json()) as { session_id: string };
    console.log("[agent-start] Agent session started:", session_id);
    return Response.json({ sessionId: session_id });
  } catch (err) {
    console.error("[agent-start] Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
