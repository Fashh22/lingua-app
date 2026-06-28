import { useAuth, useClerk } from "@clerk/expo";
import { Href, Redirect, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>You're in! 🎉</Text>
        <Text style={styles.subtitle}>Home screen coming soon.</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/language-select" as Href)}
        >
          <Text style={styles.btnText}>Select a Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGhost} onPress={() => signOut()}>
          <Text style={styles.btnGhostText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  title: { fontFamily: "Poppins_700Bold", fontSize: 28, color: "#0D132B" },
  subtitle: { fontFamily: "Poppins_400Regular", fontSize: 16, color: "#6B7280" },
  btn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
  btnText: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#fff" },
  btnGhost: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  btnGhostText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
  },
});
