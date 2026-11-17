// Design tokens for RichRank: the collectible-card world.
// Light is the default scene (casual daytime phone use); dark mirrors it for night use.

export const palette = {
  violet: "#6C3BFF",
  violetLight: "#9A7BFF",
  pink: "#FF5FA2",
  sunflower: "#FFD23F",
  ink: "#1B1B3A",
  lavender: "#F7F4FF",
};

const light = {
  bg: palette.lavender,
  surface: "#FFFFFF",
  text: palette.ink,
  textSoft: "rgba(27, 27, 58, 0.68)",
  line: "rgba(27, 27, 58, 0.12)",
  tint: palette.violet,
  onTint: "#FFFFFF",
  tintSoft: "rgba(108, 59, 255, 0.10)",
  card: palette.ink,
  shadow: "#4B2BB8",
  placeholder: "rgba(27, 27, 58, 0.68)",
  outline: palette.ink,
  statusBar: "dark",
};

const dark = {
  bg: "#12112A",
  surface: "#1F1D44",
  text: palette.lavender,
  textSoft: "rgba(247, 244, 255, 0.70)",
  line: "rgba(247, 244, 255, 0.14)",
  tint: palette.violetLight,
  onTint: palette.ink,
  tintSoft: "rgba(154, 123, 255, 0.16)",
  card: "#0B0A1F",
  shadow: "#000000",
  placeholder: "rgba(247, 244, 255, 0.70)",
  outline: "rgba(247, 244, 255, 0.32)",
  statusBar: "light",
};

export const getTheme = (scheme) => (scheme === "dark" ? dark : light);

export const font = {
  display: "BricolageGrotesque_800ExtraBold",
  strong: "BricolageGrotesque_600SemiBold",
};

// One type scale: display 40, title 28, value 20, body 15, caption 13.
export const size = { display: 40, title: 28, value: 20, body: 15, caption: 13 };

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 };
