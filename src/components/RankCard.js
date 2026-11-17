import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Emblem from "./Emblem";
import Logo from "./Logo";
import { TIERS, foilStops } from "../ranks";
import { font, size, space, palette } from "../theme";
import { decorative } from "../a11y";

const HALF_FLIP = 140;
const SHEEN_MS = 650;

// The rank card. Signature move: when the tier changes the card flips once, comes back
// wearing its new foil, and a single sheen passes over it. Reduce Motion: crossfade, no sheen.
export default function RankCard({ tierIndex, stats, onShare, theme }) {
  const [shown, setShown] = useState(tierIndex);
  const [width, setWidth] = useState(0);
  const turn = useRef(new Animated.Value(0)).current;
  const sheen = useRef(new Animated.Value(0)).current;
  const reduceMotion = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((v) => (reduceMotion.current = !!v)).catch(() => {});
  }, []);

  useEffect(() => {
    if (tierIndex === shown) return;
    Animated.timing(turn, {
      toValue: 1,
      duration: HALF_FLIP,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setShown(tierIndex);
      const back = Animated.timing(turn, {
        toValue: 0,
        duration: HALF_FLIP * 2,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      });
      if (reduceMotion.current || tierIndex === null) {
        back.start();
        return;
      }
      sheen.setValue(0);
      Animated.sequence([
        back,
        Animated.timing(sheen, { toValue: 1, duration: SHEEN_MS, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start();
    });
  }, [tierIndex]);

  const animated = reduceMotion.current
    ? { opacity: turn.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }
    : {
        transform: [
          { perspective: 1200 },
          { rotateY: turn.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "90deg"] }) },
        ],
      };

  if (shown === null) return <MysteryCard theme={theme} />;

  const tier = TIERS[shown];
  const accent = tier.foil[0];

  return (
    <Animated.View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={[styles.shadowWrap, { shadowColor: tier.foil[1] }, animated]}
      accessible
      accessibilityLabel={`Ta carte : ${tier.name}, rareté ${tier.rarity}. ${stats.annualLabel} par an. Un million dans ${stats.millionLabel}. Un milliard dans ${stats.billionLabel}.`}
    >
      <LinearGradient colors={foilStops(shown)} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.foil}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.topRow}>
            <View style={[styles.rarity, { backgroundColor: accent }]}>
              <Text style={styles.rarityText}>{tier.rarity}</Text>
            </View>
            <Text style={styles.number}>
              N°{shown + 1}/{TIERS.length}
            </Text>
          </View>

          <Text style={styles.name} maxFontSizeMultiplier={1.4}>
            {tier.name}
          </Text>

          <View style={[styles.stat, styles.annual]}>
            <Text style={styles.statLabel}>Par an, brut</Text>
            <Text style={styles.annualValue} maxFontSizeMultiplier={1.25}>
              {stats.annualLabel}
            </Text>
          </View>
          <View style={styles.stats}>
            <Stat label="1 million dans" value={stats.millionLabel} color={accent} />
            <Stat label="1 milliard dans" value={stats.billionLabel} color={accent} />
          </View>

          <View style={styles.artRow}>
            <View style={[styles.art, { backgroundColor: `${tier.foil[1]}33` }]}>
              <Emblem tier={tier} size={80} />
            </View>
            <Text style={styles.quip}>{tier.quip}</Text>
          </View>

          <Pressable
            onPress={onShare}
            accessibilityRole="button"
            accessibilityLabel="Partager ma carte"
            style={({ pressed }) => [styles.share, pressed && { opacity: 0.7 }]}
          >
            <Ionicons name="share-outline" size={18} color="#FFFFFF" />
            <Text style={styles.shareText}>Partager ma carte</Text>
          </Pressable>
        </View>
      </LinearGradient>

      {width > 0 && (
        <Animated.View
          {...decorative}
          pointerEvents="none"
          style={[
            styles.sheen,
            {
              width: width * 0.5,
              opacity: sheen.interpolate({ inputRange: [0, 0.1, 0.9, 1], outputRange: [0, 1, 1, 0] }),
              transform: [
                { translateX: sheen.interpolate({ inputRange: [0, 1], outputRange: [-width * 0.6, width * 1.1] }) },
                { skewX: "-18deg" },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.28)", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

function Stat({ label, value, color }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.statValue, { color }]} maxFontSizeMultiplier={1.25}>
        {value}
      </Text>
    </View>
  );
}

// Empty state: the card lies face down until there is a salary to reveal it.
function MysteryCard({ theme }) {
  return (
    <View style={[styles.shadowWrap, { shadowColor: theme.shadow }]}>
      <LinearGradient
        colors={[palette.pink, palette.violet, palette.sunflower]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.foil}
      >
        <View style={[styles.card, styles.mystery, { backgroundColor: theme.card }]}>
          <Logo size={72} />
          <Text style={styles.mysteryTitle}>Carte mystère</Text>
          <Text style={styles.mysteryText}>Entre ton salaire pour révéler ta carte et ton rang.</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const white = (a) => `rgba(255, 255, 255, ${a})`;

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
  foil: { borderRadius: 20, padding: 5 },
  card: { borderRadius: 15, padding: space.xl },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rarity: { borderRadius: 999, paddingHorizontal: space.md, paddingVertical: space.xs },
  rarityText: { fontFamily: font.display, fontSize: size.caption, color: palette.ink },
  number: { fontFamily: font.strong, fontSize: size.caption, color: white(0.62), fontVariant: ["tabular-nums"] },
  name: {
    fontFamily: font.display,
    fontSize: size.title,
    color: "#FFFFFF",
    marginTop: space.md,
    letterSpacing: -0.6,
  },
  annual: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    flexWrap: "wrap",
    columnGap: space.md,
    marginTop: space.lg,
    paddingHorizontal: space.lg,
  },
  annualValue: { fontFamily: font.display, fontSize: size.value, color: "#FFFFFF", fontVariant: ["tabular-nums"] },
  stats: { flexDirection: "row", gap: space.sm, marginTop: space.sm },
  stat: { flex: 1, borderRadius: 12, backgroundColor: white(0.08), padding: space.md, gap: 2 },
  statLabel: { fontSize: size.caption, color: white(0.68) },
  statValue: { fontFamily: font.display, fontSize: size.value, lineHeight: 24, fontVariant: ["tabular-nums"] },
  artRow: { flexDirection: "row", alignItems: "center", gap: space.lg, marginTop: space.lg },
  art: { width: 96, height: 96, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  quip: { flex: 1, fontSize: size.body, lineHeight: 21, color: white(0.82) },
  share: {
    marginTop: space.lg,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: white(0.24),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
  },
  shareText: { fontFamily: font.strong, fontSize: size.body, color: "#FFFFFF" },
  sheen: { position: "absolute", top: 0, bottom: 0, left: 0, borderRadius: 20, overflow: "hidden" },
  mystery: { alignItems: "center", paddingVertical: space.xxxl, gap: space.md },
  mysteryTitle: { fontFamily: font.display, fontSize: size.title, color: "#FFFFFF", marginTop: space.sm },
  mysteryText: { fontSize: size.body, lineHeight: 21, color: white(0.8), textAlign: "center", maxWidth: 240 },
});
