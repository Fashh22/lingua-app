import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }
  if (!apiKey || !apiSecret) {
    return Response.json({ error: "Stream not configured" }, { status: 500 });
  }

  const client = new StreamClient(apiKey, apiSecret);
  const token = client.generateUserToken({ user_id: userId });

  return Response.json({ token });
}
