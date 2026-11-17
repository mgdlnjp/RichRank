import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Emblem from "./Emblem";
import { TIERS, foilStops } from "../ranks";
import { formatMoney } from "../format";
import { font, palette, size, space } from "../theme";

// The whole ladder as a row of mini cards: earned ones show their foil, the rest stay locked.
export default function Collection({ tierIndex, symbol, theme }) {
  const owned = tierIndex === null ? 0 : tierIndex + 1;
  const next = tierIndex === null ? null : TIERS[tierIndex + 1];

  return (
    <View style={[styles.wrap, { backgroundColor: theme.surface, borderColor: theme.outline }]}>
      <View style={styles.head}>
        <Text style={[styles.title, { color: theme.text }]}>Ta collection</Text>
        <Text style={[styles.count, { color: theme.textSoft }]}>
          {owned}/{TIERS.length}
        </Text>
      </View>

      <View style={styles.row} accessibilityLabel={`${owned} cartes sur ${TIERS.length} débloquées`}>
        {TIERS.map((tier, i) =>
          i < owned ? (
            <LinearGradient
              key={tier.id}
              colors={foilStops(i)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.mini,
                styles.owned,
                { borderColor: palette.ink },
                i === tierIndex && [styles.current, { borderColor: theme.text }],
              ]}
            >
              <View style={styles.miniFace}>
                <Emblem tier={tier} size={20} />
              </View>
            </LinearGradient>
          ) : (
            <View key={tier.id} style={[styles.mini, styles.locked, { borderColor: theme.outline }]}>
              <Ionicons name="lock-closed" size={12} color={theme.placeholder} />
            </View>
          )
        )}
      </View>

      <Text style={[styles.next, { color: theme.textSoft }]}>
        {tierIndex === null
          ? "8 cartes à débloquer, du Rêveur au Milliardaire."
          : next
          ? `Prochaine carte : ${next.name}, dès ${formatMoney(next.min, symbol)} par an.`
          : "Collection complète. Respect."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 16,
    padding: space.lg,
    borderWidth: 2,
  },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  title: { fontFamily: font.display, fontSize: size.value },
  count: { fontFamily: font.strong, fontSize: size.body, fontVariant: ["tabular-nums"] },
  row: { flexDirection: "row", gap: 6, marginTop: space.md },
  mini: { flex: 1, aspectRatio: 0.72, borderRadius: 6 },
  owned: { borderWidth: 2, padding: 3 },
  miniFace: { flex: 1, borderRadius: 3, backgroundColor: palette.ink, alignItems: "center", justifyContent: "center" },
  current: { borderWidth: 3, transform: [{ translateY: -4 }] },
  locked: { borderWidth: 2, borderStyle: "dashed", alignItems: "center", justifyContent: "center" },
  next: { marginTop: space.md, fontSize: size.body, lineHeight: 21 },
});
