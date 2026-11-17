import React from "react";
import { View } from "react-native";
import { decorative } from "../a11y";
import Svg, { G, Rect, Path } from "react-native-svg";

// The RichRank mark: two stacked collectible cards, the front one carrying an R and a rarity star.
// Same geometry as assets/brand/richrank-symbole.svg.
export default function Logo({ size = 40 }) {
  return (
    <View {...decorative}>
    <Svg width={size} height={(size * 824) / 724} viewBox="150 100 724 824">
      <Rect
        x="252" y="162" width="520" height="700" rx="64"
        fill="#FF5FA2" stroke="#1B1B3A" strokeWidth="24"
        transform="rotate(9 512 512) translate(34 0)"
      />
      <G transform="rotate(-6 512 512)">
        <Rect x="252" y="162" width="520" height="700" rx="64" fill="#1B1B3A" />
        <Rect x="290" y="200" width="444" height="624" rx="36" fill="none" stroke="#FFD23F" strokeWidth="12" />
        <Path
          fill="#FFD23F" fillRule="evenodd"
          transform="translate(289.4 320) scale(4.2)"
          d="M30 22H56C68 22 76 30 76 41C76 50 70 56 62 58L76 78H60L48 60H44V78H30ZM44 34V48H55C59 48 62 45 62 41C62 37 59 34 55 34Z"
        />
        <Path fill="#FF5FA2" d="M672 236 683 262 711 264 690 282 697 309 672 294 647 309 654 282 633 264 661 262Z" />
      </G>
    </Svg>
    </View>
  );
}
