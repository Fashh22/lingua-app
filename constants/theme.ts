/* JS-side design tokens for use in StyleSheet / inline styles.
   For NativeWind className usage, rely on global.css @theme tokens instead. */

export const Colors = {
  // Brand
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D8BFF",
  linguaGreen: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  ink: "#0D132B",
  muted: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export const FontFamily = {
  poppins: "Poppins_400Regular",
  poppinsMedium: "Poppins_500Medium",
  poppinsSemibold: "Poppins_600SemiBold",
  poppinsBold: "Poppins_700Bold",
} as const;

export const FontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 13,
  caption: 11,
} as const;

export const LineHeight = {
  h1: 1.2,
  h2: 1.3,
  h3: 1.3,
  h4: 1.4,
  body: 1.6,
  caption: 1.4,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
} as const;
