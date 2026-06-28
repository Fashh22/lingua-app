import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Jamsani Pogi</Text>
      <TouchableOpacity
        onPress={() => router.push("/onboarding" as any)}
        style={{ marginTop: 16, padding: 12 }}
      >
        <Text style={{ color: "#6C4EF5", fontWeight: "600" }}>
          Go to Onboarding →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
