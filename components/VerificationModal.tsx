import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onComplete?: (code: string) => Promise<void> | void;
};

export default function VerificationModal({
  visible,
  email,
  onClose,
  onComplete,
}: Props) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  async function handleCodeChange(value: string) {
    if (isLoading) return;
    const digits = value.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digits);

    if (digits.length === 6 && onComplete) {
      setIsLoading(true);
      try {
        await onComplete(digits);
      } catch {
        setCode("");
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleClose() {
    setCode("");
    setIsLoading(false);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        <View style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handle} />

          <Text className="font-poppins-bold text-h3 text-ink mt-2 mb-1">
            Check your email
          </Text>
          <Text className="font-poppins text-body-md text-muted mb-6 text-center">
            We sent a 6-digit code to{"\n"}
            <Text className="font-poppins-semibold text-ink">
              {email || "your email"}
            </Text>
          </Text>

          {/* OTP boxes — tap to focus the hidden input */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.boxesRow}
          >
            {Array.from({ length: 6 }).map((_, i) => {
              const isFilled = i < code.length;
              const isActive = i === code.length;
              return (
                <View
                  key={i}
                  style={[
                    styles.box,
                    isFilled && styles.boxFilled,
                    isActive && styles.boxActive,
                  ]}
                >
                  <Text style={styles.boxDigit}>{code[i] ?? ""}</Text>
                </View>
              );
            })}
          </TouchableOpacity>

          {/* Hidden input that captures the keyboard */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            editable={!isLoading}
            style={styles.hiddenInput}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginBottom: 20,
  },
  boxesRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  box: {
    width: 46,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  boxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#EEEEFF",
  },
  boxActive: {
    borderColor: "#6C4EF5",
    backgroundColor: "#ffffff",
  },
  boxDigit: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#0D132B",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
});
