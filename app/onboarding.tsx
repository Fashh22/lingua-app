import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View className="flex-1 px-6 pt-4">
        {/* Brand logo */}
        <View className="flex-row items-center gap-2">
          <Image
            source={images.mascotLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-h3 text-ink">Lingua</Text>
        </View>

        {/* Headline */}
        <View className="mt-8">
          <Text className="font-poppins-bold text-h1 text-ink" style={styles.headline}>
            Your AI language{"\n"}
            <Text className="text-lingua-purple">teacher</Text>
            <Text className="text-ink">.</Text>
          </Text>
          <Text className="font-poppins text-body-md text-muted mt-3 leading-body">
            Real conversations, personalized{"\n"}lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot illustration with speech bubbles */}
        <View className="flex-1 items-center justify-center" style={styles.mascotContainer}>
          <Image
            source={images.mascotWelcome}
            style={styles.mascotImage}
            resizeMode="contain"
          />

          {/* Hello! bubble — left */}
          <View style={[styles.bubble, styles.bubbleHello]}>
            <Text className="font-poppins-semibold text-body-md text-ink">Hello!</Text>
          </View>

          {/* ¡Hola! bubble — upper right */}
          <View style={[styles.bubble, styles.bubbleHola]}>
            <Text className="font-poppins-semibold text-body-md text-lingua-purple">
              ¡Hola!
            </Text>
          </View>

          {/* 你好! bubble — right */}
          <View style={[styles.bubble, styles.bubbleChinese]}>
            <Text className="font-poppins-semibold text-body-md" style={styles.chineseText}>
              你好!
            </Text>
          </View>
        </View>

        {/* Get Started button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Navigate to auth when implemented
          }}
          activeOpacity={0.85}
        >
          <Text className="font-poppins-semibold text-body-lg text-white">Get Started</Text>
          <Text style={styles.buttonArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  logoImage: {
    width: 36,
    height: 36,
  },
  headline: {
    lineHeight: 42,
  },
  mascotContainer: {
    position: "relative",
  },
  mascotImage: {
    width: "100%",
    height: "85%",
  },
  bubble: {
    position: "absolute",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bubbleHello: {
    backgroundColor: "#F0EFF5",
    left: 8,
    top: "28%",
  },
  bubbleHola: {
    backgroundColor: "#EEEEFF",
    right: 8,
    top: "8%",
  },
  bubbleChinese: {
    backgroundColor: "#FFF0F0",
    right: 16,
    top: "52%",
  },
  chineseText: {
    color: "#E03030",
  },
  button: {
    backgroundColor: "#6C4EF5",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  buttonArrow: {
    color: "#ffffff",
    fontSize: 22,
    lineHeight: 22,
    fontFamily: "Poppins_700Bold",
  },
});
