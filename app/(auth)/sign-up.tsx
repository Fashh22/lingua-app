import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useSignUp, useSSO } from "@clerk/expo";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSignUp() {
    if (!email.trim() || !password) {
      Alert.alert("Complete your info", "Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Weak password", "Password must be at least 8 characters.");
      return;
    }

    const { error } = await signUp.password({ emailAddress: email, password });

    if (error) {
      Alert.alert("Unable to sign up", error.message || "Something went wrong. Please try again.");
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();

    if (sendError) {
      Alert.alert("Error", sendError.message || "Could not send verification email.");
      return;
    }

    setShowModal(true);
  }

  async function handleVerify(code: string) {
    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      Alert.alert("Invalid code", error.message || "The code you entered is incorrect. Please try again.");
      throw error;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session }) => {
          if (session?.currentTask) return;
          router.replace("/");
        },
      });
    } else {
      Alert.alert("Verification failed", "Please try again.");
      throw new Error("Sign-up not complete");
    }
  }

  async function handleSocialSignUp(strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("oauth-callback"),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch {
      Alert.alert("Sign up failed", "Could not complete social sign-up. Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <AntDesign name="left" size={20} color="#0D132B" />
        </TouchableOpacity>

        {/* Heading */}
        <Text className="font-poppins-bold text-h1 text-ink mt-4">
          Create your account
        </Text>
        <Text className="font-poppins text-body-md text-muted mt-1">
          Start your language journey today ✨
        </Text>

        {/* Mascot */}
        <View style={styles.mascotContainer}>
          <Image
            source={images.mascotWelcome}
            style={styles.mascot}
            resizeMode="contain"
          />
          <Text style={[styles.sparkle, styles.sparkleTopLeft]}>✦</Text>
          <Text style={[styles.sparkle, styles.sparkleTopRight]}>✦</Text>
          <Text style={[styles.sparkle, styles.sparkleBottomRight]}>✦</Text>
        </View>

        {/* Email input */}
        <View style={styles.inputCard}>
          <Text className="font-poppins text-body-sm text-muted">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.textInput}
          />
        </View>

        {/* Password input */}
        <View style={[styles.inputCard, styles.inputCardRow]}>
          <View style={{ flex: 1 }}>
            <Text className="font-poppins text-body-sm text-muted">
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        {/* Sign Up button */}
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.primaryBtn}
          activeOpacity={0.85}
          disabled={fetchStatus === "fetching"}
        >
          <Text className="font-poppins-semibold text-body-lg text-white">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text className="font-poppins text-body-sm text-muted mx-3">
            or continue with
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <TouchableOpacity
          onPress={() => handleSocialSignUp("oauth_google")}
          style={styles.socialBtn}
          activeOpacity={0.8}
        >
          <AntDesign name="google" size={20} color="#EA4335" />
          <Text
            className="font-poppins-medium text-body-md text-ink"
            style={styles.socialText}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocialSignUp("oauth_facebook")}
          style={styles.socialBtn}
          activeOpacity={0.8}
        >
          <FontAwesome name="facebook-square" size={22} color="#1877F2" />
          <Text
            className="font-poppins-medium text-body-md text-ink"
            style={styles.socialText}
          >
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocialSignUp("oauth_apple")}
          style={styles.socialBtn}
          activeOpacity={0.8}
        >
          <AntDesign name="apple1" size={22} color="#000000" />
          <Text
            className="font-poppins-medium text-body-md text-ink"
            style={styles.socialText}
          >
            Continue with Apple
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text className="font-poppins text-body-md text-muted">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
            <Text className="font-poppins-semibold text-body-md text-lingua-purple">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
        onComplete={handleVerify}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  back: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  mascotContainer: {
    alignItems: "center",
    marginVertical: 16,
    position: "relative",
  },
  mascot: {
    width: 160,
    height: 160,
  },
  sparkle: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
  },
  sparkleTopLeft: {
    color: "#FFC800",
    top: 8,
    left: 48,
  },
  sparkleTopRight: {
    color: "#4D8BFF",
    top: 0,
    right: 48,
  },
  sparkleBottomRight: {
    color: "#FFC800",
    bottom: 8,
    right: 44,
  },
  inputCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    marginBottom: 12,
  },
  inputCardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#0D132B",
    paddingTop: 4,
    paddingBottom: 0,
  },
  eyeBtn: {
    padding: 4,
    marginLeft: 8,
  },
  primaryBtn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    marginBottom: 12,
  },
  socialText: {
    marginLeft: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 16,
  },
});
