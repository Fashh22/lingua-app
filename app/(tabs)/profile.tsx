import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 },
  title: { fontFamily: "Poppins_600SemiBold", fontSize: 20, color: "#0D132B", marginBottom: 32 },
  signOutBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    alignItems: "center",
  },
  signOutText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
