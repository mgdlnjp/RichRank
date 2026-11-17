import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_800ExtraBold,
} from "@expo-google-fonts/bricolage-grotesque";

import Logo from "./src/components/Logo";
import Segmented from "./src/components/Segmented";
import RankCard from "./src/components/RankCard";
import Collection from "./src/components/Collection";
import { CURRENCIES, FREQUENCIES, TIERS, tierIndexFor } from "./src/ranks";
import { displayAmount, formatDuration, formatMoneyCompact, parseAmount, sanitizeAmount } from "./src/format";
import { font, getTheme, size, space } from "./src/theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

// The card identity waits for a short pause in typing, so it does not flip on every digit.
const SETTLE_MS = 450;
const KEYBOARD_BAR = "amountKeyboardBar";

const haptic = (kind) => {
  if (Platform.OS === "web") return;
  (kind === "up"
    ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    : Haptics.selectionAsync()
  ).catch(() => {});
};

export default function App() {
  const [fontsLoaded] = useFonts({ BricolageGrotesque_600SemiBold, BricolageGrotesque_800ExtraBold });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <RichRank />
    </SafeAreaProvider>
  );
}

function RichRank() {
  const theme = getTheme(useColorScheme());
  const insets = useSafeAreaInsets();

  const [raw, setRaw] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [currency, setCurrency] = useState("EUR");

  const freq = FREQUENCIES.find((f) => f.value === frequency);
  const symbol = CURRENCIES.find((c) => c.value === currency).symbol;
  const amount = parseAmount(raw);
  const annual = amount * freq.factor;
  const liveTier = amount > 0 ? tierIndexFor(annual) : null;

  // Settled tier drives the card flip; numbers update live.
  const [tier, setTier] = useState(null);
  const lastTier = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => setTier(liveTier), SETTLE_MS);
    return () => clearTimeout(t);
  }, [liveTier]);
  useEffect(() => {
    if (tier !== null && lastTier.current !== null && tier > lastTier.current) haptic("up");
    lastTier.current = tier;
  }, [tier]);

  const stats = useMemo(
    () => ({
      annualLabel: formatMoneyCompact(annual, symbol),
      millionLabel: formatDuration(1e6, annual),
      billionLabel: formatDuration(1e9, annual),
    }),
    [annual, symbol]
  );

  const share = () => {
    if (tier === null) return;
    const t = TIERS[tier];
    Share.share({
      message:
        `Sur RichRank je suis « ${t.name} » (carte ${t.rarity.toLowerCase()}). ` +
        (annual >= 1e6
          ? `Je gagne déjà ${stats.annualLabel} par an. Et toi ?`
          : `Au rythme actuel, mon premier million arrive dans ${stats.millionLabel}. Et toi ?`),
    }).catch(() => {});
  };

  const select = (setter) => (value) => {
    haptic("select");
    setter(value);
  };

  // When the keyboard opens, scroll so the amount field sits at the top and the card's
  // name and stats stay visible above the keyboard while the user types.
  const scroller = useRef(null);
  const panelY = useRef(0);
  const inputY = useRef(0);
  useEffect(() => {
    const sub = Keyboard.addListener(Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow", () => {
      scroller.current?.scrollTo({ y: Math.max(0, panelY.current + inputY.current - space.lg), animated: true });
    });
    return () => sub.remove();
  }, []);

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <StatusBar style={theme.statusBar} />
      <ScrollView
        ref={scroller}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + space.lg, paddingBottom: insets.bottom + space.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.header} accessibilityRole="header">
          <Logo size={36} />
          <Text style={[styles.brand, { color: theme.text }]}>RichRank</Text>
        </View>

        <View
          onLayout={(e) => (panelY.current = e.nativeEvent.layout.y)}
          style={[styles.panel, { backgroundColor: theme.surface, borderColor: theme.outline }]}
        >
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: theme.textSoft }]} nativeID="salaryLabel">
              Ton salaire brut
            </Text>
            <Segmented
              compact
              label="Devise"
              options={CURRENCIES.map((c) => ({ ...c, a11y: c.value === "EUR" ? "Euros" : "Dollars" }))}
              value={currency}
              onChange={select(setCurrency)}
              theme={theme}
            />
          </View>
            <TextInput
              onLayout={(e) => (inputY.current = e.nativeEvent.layout.y)}
              value={displayAmount(raw)}
              onChangeText={(t) => setRaw(sanitizeAmount(t))}
              placeholder="0"
              placeholderTextColor={theme.placeholder}
              keyboardType="decimal-pad"
              inputAccessoryViewID={Platform.OS === "ios" ? KEYBOARD_BAR : undefined}
              selectionColor={theme.tint}
              accessibilityLabel={`Ton salaire brut, ${freq.label.toLowerCase()}`}
              accessibilityLabelledBy="salaryLabel"
              maxFontSizeMultiplier={1.3}
              style={[
                styles.amount,
                { color: theme.text },
                raw.length > 9 ? { fontSize: 34 } : null,
              ]}
            />
          <Segmented
            label="Fréquence"
            options={FREQUENCIES}
            value={frequency}
            onChange={select(setFrequency)}
            theme={theme}
          />
          <Text style={[styles.hint, { color: theme.textSoft }]}>{freq.hint}</Text>
        </View>

        <View style={styles.cardSlot}>
          <RankCard tierIndex={tier} stats={stats} onShare={share} theme={theme} />
          <Text style={[styles.disclaimer, { color: theme.textSoft }]}>
            Estimation pour rire : revenu brut, sans impôts, sans dépenses, sans épargne ni placements.
          </Text>
        </View>

        <Collection tierIndex={tier} symbol={symbol} theme={theme} />
      </ScrollView>

      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={KEYBOARD_BAR}>
          <View style={[styles.keyboardBar, { backgroundColor: theme.surface, borderTopColor: theme.line }]}>
            <Pressable
              onPress={Keyboard.dismiss}
              accessibilityRole="button"
              accessibilityLabel="Fermer le clavier"
              style={({ pressed }) => [styles.keyboardDone, pressed && { opacity: 0.6 }]}
            >
              <Text style={[styles.keyboardDoneText, { color: theme.tint }]}>OK</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: space.lg, width: "100%", maxWidth: 520, alignSelf: "center" },
  header: { flexDirection: "row", alignItems: "center", gap: space.sm, marginBottom: space.xl },
  brand: { fontFamily: font.display, fontSize: size.title, letterSpacing: -0.6 },
  panel: {
    borderRadius: 16,
    padding: space.lg,
    gap: space.md,
    borderWidth: 2,
  },
  label: { fontFamily: font.strong, fontSize: size.body },
  labelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md },
  amount: {
    width: "100%",
    fontFamily: font.display,
    fontSize: size.display,
    letterSpacing: -1,
    paddingVertical: space.xs,
    fontVariant: ["tabular-nums"],
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : null),
  },
  hint: { fontSize: size.caption },
  cardSlot: { marginTop: space.xxl, marginBottom: space.xxl },
  keyboardBar: { flexDirection: "row", justifyContent: "flex-end", borderTopWidth: StyleSheet.hairlineWidth, paddingHorizontal: space.sm },
  keyboardDone: { minHeight: 44, minWidth: 64, alignItems: "center", justifyContent: "center" },
  keyboardDoneText: { fontFamily: font.strong, fontSize: 17 },
  disclaimer: { marginTop: space.md, fontSize: size.caption, lineHeight: 18, textAlign: "center" },
});
