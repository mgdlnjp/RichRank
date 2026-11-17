import { Platform } from "react-native";

// Hides decorative artwork from screen readers on every platform.
export const decorative =
  Platform.OS === "web"
    ? { "aria-hidden": true }
    : { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants" };
