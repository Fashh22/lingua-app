import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { useLanguageStore } from "@/store/useLanguageStore";
import { CustomTabBar } from "@/components/CustomTabBar";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, hasHydrated } = useLanguageStore();

  if (!isLoaded || !hasHydrated) return null;

  if (!isSignedIn) return <Redirect href="/onboarding" />;
  if (!selectedLanguage) return <Redirect href="/language-select" />;

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="ai-teacher" options={{ title: "AI Teacher" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
