import React from "react";
import { View } from "react-native";
import { decorative } from "../a11y";
import Svg, { Circle, Ellipse, Path, Polygon, Rect, G } from "react-native-svg";

// One crisp geometric emblem per rank tier, drawn in the tier's foil colour.
// viewBox 0 0 120 120; `c` is the foil colour, `d` the darker foil stop.
const shapes = {
  dreamer: (c, d) => (
    <G>
      <Path d="M70 22a40 40 0 1 0 28 66A34 34 0 0 1 70 22Z" fill={c} />
      <Polygon points="86,26 89,34 97,35 91,40 93,48 86,44 79,48 81,40 75,35 83,34" fill={d} />
    </G>
  ),
  hustler: (c, d) => (
    <G>
      <Circle cx="60" cy="60" r="40" fill={d} />
      <Circle cx="60" cy="56" r="40" fill={c} />
      <Circle cx="60" cy="56" r="28" fill="none" stroke={d} strokeWidth="6" />
    </G>
  ),
  comfy: (c, d) => (
    <G>
      {[84, 66, 48].map((y) => (
        <G key={y}>
          <Rect x="22" y={y - 2} width="76" height="12" fill={d} />
          <Ellipse cx="60" cy={y + 10} rx="38" ry="10" fill={d} />
          <Ellipse cx="60" cy={y - 2} rx="38" ry="10" fill={c} />
        </G>
      ))}
    </G>
  ),
  bigfish: (c, d) => (
    <G>
      <Polygon points="84,60 108,38 108,82" fill={d} />
      <Ellipse cx="54" cy="60" rx="40" ry="26" fill={c} />
      <Circle cx="36" cy="54" r="5" fill="#1B1B3A" />
    </G>
  ),
  shark: (c, d) => (
    <G>
      <Path d="M30 84C46 60 58 34 82 20C76 42 78 64 92 84Z" fill={c} />
      <Path d="M12 92q12-10 24 0t24 0 24 0 24 0" fill="none" stroke={d} strokeWidth="7" strokeLinecap="round" />
    </G>
  ),
  almost: (c, d) => (
    <G>
      <Polygon points="34,30 86,30 104,52 60,100 16,52" fill={c} />
      <Polygon points="16,52 104,52 60,100" fill={d} />
      <Polygon points="34,30 48,52 60,30 72,52 86,30" fill="#FFFFFF" opacity="0.35" />
    </G>
  ),
  millionaire: (c, d) => (
    <G>
      <Polygon points="68,10 26,66 56,66 46,110 94,48 62,48 76,10" fill={c} />
      <Polygon points="62,48 94,48 46,110 56,66" fill={d} />
    </G>
  ),
  billionaire: (c, d) => (
    <G>
      <Polygon points="16,40 38,62 60,28 82,62 104,40 96,92 24,92" fill={c} />
      <Rect x="24" y="86" width="72" height="12" rx="3" fill={d} />
      <Circle cx="16" cy="38" r="7" fill={d} />
      <Circle cx="60" cy="26" r="7" fill={d} />
      <Circle cx="104" cy="38" r="7" fill={d} />
    </G>
  ),
};

export default function Emblem({ tier, size = 96 }) {
  const [c, d] = tier.foil;
  const draw = shapes[tier.id];
  return (
    <View {...decorative}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {draw(c, d === undefined ? c : d)}
      </Svg>
    </View>
  );
}
