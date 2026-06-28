import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { languages } from "@/data/languages";
import { images } from "@/constants/images";
import { Language } from "@/types/learning";

export default function LanguageSelectScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { setSelectedLanguage } = useLanguageStore();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#0D132B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose a language</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
        </View>

        {/* Popular label */}
        <Text style={styles.sectionLabel}>Popular</Text>

        {/* Language list */}
        <View style={styles.listContainer}>
          {filtered.map((language, index) => (
            <LanguageRow
              key={language.code}
              language={language}
              selected={selected === language.code}
              showDivider={index < filtered.length - 1}
              onPress={() => setSelected(language.code)}
            />
          ))}
          {filtered.length === 0 && (
            <Text style={styles.emptyText}>No languages found</Text>
          )}
        </View>

        {/* Earth illustration — hidden while searching */}
        {!query && (
          <Image
            source={images.earth}
            style={styles.earthImage}
            resizeMode="cover"
          />
        )}
      </ScrollView>

      {/* Confirm button (replaces "See all languages") */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, !selected && styles.confirmBtnDisabled]}
          disabled={!selected}
          onPress={() => {
            if (selected) setSelectedLanguage(selected);
            router.replace("/");
          }}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.confirmBtnText,
              !selected && styles.confirmBtnTextDisabled,
            ]}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function LanguageRow({
  language,
  selected,
  showDivider,
  onPress,
}: {
  language: Language;
  selected: boolean;
  showDivider: boolean;
  onPress: () => void;
}) {
  const flagUri = language.flag.replace("/16x12/", "/w80/");

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.row, selected && styles.rowSelected]}
      >
        {/* Circular flag */}
        <View style={styles.flagCircle}>
          <Image
            source={{ uri: flagUri }}
            style={styles.flagImage}
            resizeMode="cover"
          />
        </View>

        {/* Name + description */}
        <View style={styles.langInfo}>
          <Text style={styles.langName}>{language.name}</Text>
          <Text style={styles.langDesc} numberOfLines={1}>
            {language.description}
          </Text>
        </View>

        {/* Right indicator */}
        {selected ? (
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color="#ffffff" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        )}
      </TouchableOpacity>

      {showDivider && !selected && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: "#0D132B",
  },
  scrollContent: {
    paddingBottom: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#F6F7FB",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#0D132B",
    padding: 0,
  },
  sectionLabel: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#0D132B",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  listContainer: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  rowSelected: {
    backgroundColor: "#F0EDFF",
    borderWidth: 1.5,
    borderColor: "#6C4EF5",
    marginVertical: 2,
  },
  flagCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#F6F7FB",
  },
  flagImage: {
    width: "100%",
    height: "100%",
  },
  langInfo: {
    flex: 1,
    marginLeft: 14,
  },
  langName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#0D132B",
  },
  langDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 1,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 76,
  },
  emptyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingVertical: 24,
  },
  earthImage: {
    width: Dimensions.get("window").width,
    height: 220,
    marginTop: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  confirmBtn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnDisabled: {
    backgroundColor: "#F6F7FB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  confirmBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#ffffff",
  },
  confirmBtnTextDisabled: {
    color: "#9CA3AF",
  },
});
