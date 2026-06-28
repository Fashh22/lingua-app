const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const nativewindConfig = withNativewind(config, { input: "./global.css" });

// @clerk/expo v3 ships NativeClerkModule.android.js which calls requireNativeModule
// (hard, throws if missing) making it crash in Expo Go. The base NativeClerkModule.js
// uses requireOptionalNativeModule (returns null), and native-module.js already has
// a null-safe fallback. This resolver remaps the android file to the optional version.
const existingResolveRequest = nativewindConfig.resolver.resolveRequest;

nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolution = existingResolveRequest
    ? existingResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);

  if (
    platform === "android" &&
    typeof resolution === "object" &&
    resolution?.filePath?.endsWith?.("NativeClerkModule.android.js")
  ) {
    return {
      ...resolution,
      filePath: resolution.filePath.replace(
        "NativeClerkModule.android.js",
        "NativeClerkModule.js"
      ),
    };
  }

  return resolution;
};

module.exports = nativewindConfig;
