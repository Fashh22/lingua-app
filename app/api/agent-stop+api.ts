const AGENT_SERVER_URL = process.env.VISION_AGENT_SERVER_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const { callId, sessionId } = (await request.json()) as {
      callId: string;
      sessionId: string;
    };

    if (!callId || !sessionId) {
      return Response.json({ error: "Missing callId or sessionId" }, { status: 400 });
    }

    const res = await fetch(
      `${AGENT_SERVER_URL}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
      { method: "DELETE" }
    );

    // 404 means the session is already gone — treat as success
    if (!res.ok && res.status !== 404) {
      return Response.json({ error: "Failed to stop agent" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("agent-stop error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
