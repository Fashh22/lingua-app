import Constants from "expo-constants";
import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

export function getApiBaseUrl(): string {
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri ?? "localhost:8081";
    return `http://${hostUri}`;
  }
  return process.env.EXPO_PUBLIC_API_URL ?? "";
}

type StreamUser = { id: string; name?: string; image?: string };

export function createStreamVideoClient(user: StreamUser): StreamVideoClient {
  const tokenProvider = async () => {
    const url = `${getApiBaseUrl()}/api/stream-token?userId=${encodeURIComponent(String(user.id))}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Stream token");
    const data = (await res.json()) as { token: string };
    return data.token;
  };

  return StreamVideoClient.getOrCreateInstance({
    apiKey: STREAM_API_KEY,
    user: { id: user.id, name: user.name, image: user.image, type: "authenticated" as const },
    tokenProvider,
  });
}
