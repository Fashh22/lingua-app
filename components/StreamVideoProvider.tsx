import { useUser } from "@clerk/expo";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Lazy-load to support Expo Go (WebRTC native module requires a dev build)
let StreamVideoComp: React.ComponentType<any> | null = null;
let createClient: ((user: { id: string; name?: string; image?: string }) => any) | null = null;

try {
  StreamVideoComp = require("@stream-io/video-react-native-sdk").StreamVideo;
  createClient = require("@/lib/stream").createStreamVideoClient;
} catch {
  // Expo Go: WebRTC native module not available — Stream features disabled
}

export function StreamVideoProvider({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useUser();
  const [client, setClient] = useState<any>(undefined);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isSignedIn || !user || !createClient) {
      setClient(undefined);
      return;
    }

    const streamUser = {
      id: user.id,
      name:
        user.fullName ??
        user.primaryEmailAddress?.emailAddress ??
        user.id,
      image: user.imageUrl ?? undefined,
    };

    const c = createClient(streamUser);
    setClient(c);

    return () => {
      c.disconnectUser().catch(console.error);
      setClient(undefined);
    };
  }, [isSignedIn, user?.id]);

  if (!client || !StreamVideoComp) return <>{children}</>;

  const { top, right, bottom, left } = insets;
  const theme = { variants: { insets: { top, right, bottom, left } } };
  const SV = StreamVideoComp;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <SV client={client} style={theme as any}>
      {children}
    </SV>
  );
}
