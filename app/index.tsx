import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, hasHydrated } = useLanguageStore();

  if (!isLoaded || !hasHydrated) return null;

  if (!isSignedIn) return <Redirect href="/onboarding" />;

  if (!selectedLanguage) return <Redirect href="/language-select" />;

  return <Redirect href="/(tabs)" />;
}
