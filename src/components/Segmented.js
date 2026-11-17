import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { font, size } from "../theme";

// A segmented control: one choice among a few, announced as a radio group.
export default function Segmented({ options, value, onChange, theme, compact = false, label }) {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={[styles.track, { backgroundColor: theme.tintSoft, borderColor: theme.outline }, compact && styles.compact]}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={opt.a11y || opt.label}
            onPress={() => onChange(opt.value)}
            style={({ pressed }) => [
              styles.segment,
              compact && styles.segmentCompact,
              selected && [styles.selected, { backgroundColor: theme.tint, shadowColor: theme.shadow }],
              pressed && !selected && { opacity: 0.6 },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: selected ? theme.onTint : theme.text },
                compact && styles.textCompact,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: "row", borderRadius: 14, borderWidth: 2, padding: 3, gap: 4 },
  compact: { alignSelf: "center" },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  segmentCompact: { flex: 0, minWidth: 48 },
  selected: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  text: { fontFamily: font.strong, fontSize: size.body },
  textCompact: { fontFamily: font.display, fontSize: size.value },
});
