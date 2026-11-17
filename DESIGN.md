---
name: RichRank
description: Your salary becomes a collectible card with a rarity, not a figure in a form.
colors:
  electric-violet: "#6C3BFF"
  violet-glow: "#9A7BFF"
  bubblegum-pink: "#FF5FA2"
  sunflower: "#FFD23F"
  deep-ink: "#1B1B3A"
  lavender-paper: "#F7F4FF"
  card-stock: "#FFFFFF"
  ink-soft: "rgba(27, 27, 58, 0.68)"
  ink-hairline: "rgba(27, 27, 58, 0.12)"
  violet-wash: "rgba(108, 59, 255, 0.10)"
  violet-shade: "#4B2BB8"
  night-ground: "#12112A"
  night-stock: "#1F1D44"
  night-card: "#0B0A1F"
  foil-common: "#D9D4F2"
  foil-common-deep: "#A69FD1"
  foil-uncommon: "#7CF0BF"
  foil-uncommon-deep: "#1FB57A"
  foil-rare: "#7DB6FF"
  foil-rare-deep: "#2B6BFF"
  foil-epic: "#B9A2FF"
  foil-legendary: "#FFE989"
  foil-legendary-deep: "#FFB800"
  foil-mythic: "#FF9CC8"
  foil-mythic-deep: "#FF3D8B"
  foil-mint: "#3DDC97"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    letterSpacing: "-1px"
    fontFeature: "tnum"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    letterSpacing: "-0.6px"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: "24px"
    fontFeature: "tnum"
  body-strong:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  body:
    fontFamily: "system-ui, -apple-system, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "21px"
  label:
    fontFamily: "system-ui, -apple-system, Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
  badge:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 800
rounded:
  mini: "6px"
  segment: "10px"
  pill-box: "12px"
  track: "14px"
  panel: "16px"
  card-face: "15px"
  card: "20px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  xxxl: "48px"
components:
  panel:
    backgroundColor: "{colors.card-stock}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.panel}"
    padding: "16px"
  segmented-track:
    backgroundColor: "{colors.violet-wash}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.track}"
    padding: "3px"
  segmented-option-selected:
    backgroundColor: "{colors.electric-violet}"
    textColor: "{colors.card-stock}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.segment}"
    height: "44px"
  rank-card:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.card-stock}"
    rounded: "{rounded.card}"
    padding: "5px"
  rank-card-face:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.card-stock}"
    rounded: "{rounded.card-face}"
    padding: "24px"
  rarity-badge:
    backgroundColor: "{colors.foil-uncommon}"
    textColor: "{colors.deep-ink}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  stat-pill:
    textColor: "{colors.foil-uncommon}"
    typography: "{typography.title}"
    rounded: "{rounded.pill-box}"
    padding: "12px"
  share-button:
    textColor: "{colors.card-stock}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.pill-box}"
    height: "44px"
  collection-mini:
    backgroundColor: "{colors.deep-ink}"
    rounded: "{rounded.mini}"
    padding: "3px"
---

# Design System: RichRank

## Overview

**Creative North Star: "The Pocket Binder"**

RichRank is a trading-card binder that happens to do arithmetic. The salary you type is not shown as a result row; it is dealt to you as a collectible card with a rarity, a name, a quip and three stats, and the rest of the screen is the binder page around it: a lavender ground, chunky white panels with thick ink outlines, and a row of mini cards waiting to be collected. The register is a toy, bright and friendly, never a finance dashboard.

The density is low and the hierarchy is blunt. One big tabular number at the top (the amount you type), one dark card in the middle that carries every result, one collection strip below. Everything outside the card is flat, white and outlined in ink; the card alone is dark, foiled and glowing, so the eye always lands on it. Colour is spent on rarity: the controls get one tint (electric violet), and every other hue on the screen belongs to a tier foil.

Motion is a single event, not a texture. Numbers update live while you type; the card only flips (one Y rotation) and a single sheen sweeps across it when the settled tier changes. Within a tier nothing moves but the digits. Reduce Motion swaps the flip for a crossfade and drops the sheen. Light is the default scene (daytime phone use); dark mirrors it for night.

**Key Characteristics:**
- Lavender-paper ground, white card-stock panels, deep-ink 2px outlines.
- One control tint: electric violet (violet glow in dark mode).
- The rank card is the only dark, foiled, glowing object on the screen.
- One display face with character (Bricolage Grotesque, 800 and 600) for numbers, names and controls; the system font for small reading text.
- Tabular figures on every number.
- The flip and the sheen fire only on a tier change.

## Colors

A candy palette held in check by one deep ink: violet runs the controls, the tier foils run the rewards, and ink draws every outline.

### Primary
- **Electric Violet** (electric-violet): the one tint for interactive state. Selected segment fill, text-input caret, the keyboard "OK" action. In dark mode it is replaced by **Violet Glow** (violet-glow) with deep-ink text on top. Also the deep stop of the Epic foil.

### Secondary
- **Bubblegum Pink** (bubblegum-pink): the brand's second card. The back card in the logo, the first stop of the mystery-card foil and of the Unique foil.
- **Sunflower** (sunflower): the inner frame and the R on the logo's front card, and a stop of the mystery and Unique foils.

### Tertiary: tier foils
Each rank tier owns a light/deep foil pair, used for the card frame gradient, the rarity badge (light stop), the stat values (light stop), the emblem art, the card glow (deep stop) and the owned mini cards in the collection.
- **Pewter Lilac** (foil-common / foil-common-deep): Commune tiers.
- **Mint Ticket** (foil-uncommon / foil-uncommon-deep): Peu commune.
- **Pool Blue** (foil-rare / foil-rare-deep): Rare.
- **Amethyst** (foil-epic, deep stop electric-violet): Épique.
- **Gold Leaf** (foil-legendary / foil-legendary-deep): Légendaire.
- **Hot Flamingo** (foil-mythic / foil-mythic-deep): Mythique.
- **Prism** (bubblegum-pink, electric-violet, sunflower, foil-mint): Unique, the only four-stop foil.

The two-stop foils are rendered iridescent: deep, light, a white sheen stop, the neighbouring tier's light stop, light, deep, on a 45° diagonal.

### Neutral
- **Deep Ink** (deep-ink): all text in light mode, every 2px outline, the rank-card face, the face of each owned mini card.
- **Lavender Paper** (lavender-paper): the screen ground in light mode; the text colour in dark mode.
- **Card Stock** (card-stock): panel and collection surfaces in light mode; all text on the dark card.
- **Ink Soft** (ink-soft): labels, hints, the disclaimer, placeholders and the collection count. 68% ink, never lower.
- **Ink Hairline** (ink-hairline): the hairline above the iOS keyboard bar.
- **Violet Wash** (violet-wash): the segmented-control track.
- **Violet Shade** (violet-shade): the shadow colour under the selected segment and the mystery card in light mode.
- **Night Ground / Night Stock / Night Card** (night-ground, night-stock, night-card): the dark-mode ground, panels and card face.

### Named Rules
**The One Tint Rule.** Electric violet is the only colour that means "you can act on this". Pink, sunflower and every foil hue belong to cards and rarity; they never mark a control.

**The Foil Owns the Hue Rule.** On the rank card, every accent (badge, stat values, art wash, glow) comes from the current tier's foil. Changing tier changes all of them at once; no accent on the card is fixed.

## Typography

**Display Font:** Bricolage Grotesque, ExtraBold 800 and SemiBold 600 (loaded via @expo-google-fonts; system fallback)
**Body Font:** the platform system font (San Francisco on iOS, Roboto on Android)

**Character:** Bricolage's wide, slightly quirky grotesque gives the numbers and rank names the chunky, printed feel of a game card; the system font keeps small explanatory text quiet and native.

### Hierarchy
- **Display** (800, 40px, -1px tracking, tabular): the typed amount only. Drops to 34px past nine characters so long amounts still fit.
- **Headline** (800, 28px, -0.6px tracking): the wordmark beside the logo, the rank name on the card, the mystery-card title.
- **Title** (800, 20px, 24px line height, tabular): stat values, the annual figure, the "Ta collection" heading, the compact currency segments (€ / $).
- **Body Strong** (600, 15px): field label, frequency segments, share button text, the collection count.
- **Body** (400, 15px, 21px line height): the tier quip, the next-card line, the mystery-card prompt.
- **Label** (400, 13px, 18px line height): stat labels, the frequency hint, the disclaimer. The card number (N°3/8) uses 600 at 13px.
- **Badge** (800, 13px): the rarity pill text, ink on foil.

### Named Rules
**The Five Sizes Rule.** The scale is 40 / 28 / 20 / 15 / 13 and nothing else. A new element takes one of those five sizes.

**The Tabular Money Rule.** Every number that can change (amount, annual, years, counts, card number) uses tabular figures so digits do not jitter while typing.

## Layout

A single scrolling column, 16px side gutters, capped at 520px wide and centred (so the web preview and tablets do not stretch the cards). Top inset plus 16px above, bottom inset plus 32px below.

Order is fixed: header (36px logo + wordmark, 24px below), the input panel, 32px, the rank card with the disclaimer 12px under it, 32px, the collection panel. Inside panels the rhythm is the 4-based scale (4 / 8 / 12 / 16 / 24 / 32 / 48); panels pad 16px with 12px between rows, the card face pads 24px.

The currency control sits on the label row, right-aligned; the frequency control spans the full panel width. When the keyboard opens, the view scrolls so the amount field sits at the top and the card's name and stats stay visible above the keyboard. Touch targets are at least 44px tall.

## Elevation & Depth

The screen is flat and drawn, not lifted: panels, segmented tracks and mini cards separate from the ground with 2px ink outlines, not shadows. Depth is reserved for the one object that matters. The rank card floats on a soft glow tinted with its tier's deep foil stop; the selected segment sits on a small violet lift so it reads as pressed-in-hand.

### Shadow Vocabulary
- **Foil glow** (offset 0 12px, radius 24px, opacity 0.35, colour = tier deep foil; Android elevation 8): the rank card and the mystery card (violet-shade in light, black in dark) only.
- **Segment lift** (offset 0 2px, radius 6px, opacity 0.25, colour violet-shade; Android elevation 2): the selected segment only.

### Named Rules
**The Ink, Not Shadow Rule.** Every container except the rank card is separated by a 2px outline (deep ink in light mode). Do not add drop shadows to panels.

**The Only Foil Rule.** The holographic foil frame belongs to the rank card (and, in miniature, to owned collection cards). No panel, button or header ever wears a gradient frame.

## Shapes

Chunky and rounded, like die-cut card stock. Corners step down with size: the rank card at 20px with a 15px face inside a 5px foil frame, panels at 16px, segmented tracks at 14px with 10px segments inside a 3px inset, stat pills, art tile and share button at 12-14px, mini cards at 6px, the rarity badge fully round. Mini cards keep a trading-card ratio of 0.72. Locked mini cards are drawn with a dashed 2px outline and a small lock; owned ones get a solid ink outline and their foil; the current one gets a 3px outline and rises 4px.

The logo is two stacked cards (pink behind at +9°, ink in front at -6° with a sunflower inner frame, an R and a pink rarity star); it is the brand's only rotated geometry.

## Components

### Segmented control
Toy-like and decisive.
- **Track:** violet-wash fill, 2px ink outline, 14px radius, 3px inner padding, 4px gaps.
- **Option:** 44px minimum height, 10px radius, Body Strong in ink. The compact variant (currency) uses Title-weight € / $ and hugs its content (48px minimum width).
- **Selected:** electric-violet fill, white text, segment lift. Pressed (unselected): 60% opacity. Announced as a radio group.
- **Feedback:** a selection haptic on native.

### Input panel
- **Shape:** 16px radius, 2px ink outline, card-stock fill, 16px padding.
- **Amount field:** borderless Display numeral, violet caret, placeholder "0" in ink-soft. No submit button: results update live.
- **iOS keyboard bar:** card-stock bar with a hairline top and a violet "OK" to dismiss.

### Rank card (signature)
The whole result lives here.
- **Frame:** the tier's iridescent foil gradient as a 5px frame, 20px outer radius, foil glow beneath.
- **Face:** deep-ink (night-card in dark), 24px padding. Top row: rarity badge (foil light stop, ink Badge text, round) and card number N°x/8 in 62% white.
- **Name:** Headline in white.
- **Stats:** the annual figure on a full-width 8% white pill (label left, Title value right in white); below, two equal pills "1 million dans" / "1 milliard dans" with Title values in the foil light stop.
- **Art row:** a 96px tile washed with the deep foil at 20% holding the tier's geometric SVG emblem (80px), beside the quip in 82% white.
- **Share:** full-width, 44px, 12px radius, transparent with a 1px 24% white outline, share icon + Body Strong white. Pressed: 70% opacity.
- **Motion:** on a settled tier change (450ms after typing pauses) the card turns to 90° (140ms ease-in), swaps identity, returns (280ms ease-out exponential), then one white sheen band (skewed -18°, 28% white peak) sweeps across in 650ms. Moving up a tier also fires a success haptic. Reduce Motion: crossfade, no sheen.
- **Empty state (mystery card):** face down, pink / violet / sunflower foil, the logo at 72px, "Carte mystère" and a one-line prompt.

### Collection strip
- **Container:** same as the input panel (16px radius, 2px ink outline, card-stock).
- **Head:** "Ta collection" in Title, count n/8 in Body Strong ink-soft.
- **Row:** eight mini cards, equal width, 6px gaps. Owned: foil frame, 3px padding, ink face with a 20px emblem. Locked: dashed outline, small lock in ink-soft. Current: thicker outline, raised 4px.
- **Footer:** the next card and its threshold in Body ink-soft.

## Do's and Don'ts

### Do:
- **Do** keep electric violet (violet glow in dark mode) as the single control tint: selected segments, caret, keyboard action.
- **Do** separate panels from the ground with a 2px deep-ink outline at 16px radius.
- **Do** take every rank-card accent from the current tier's foil pair.
- **Do** set every changing number in Bricolage Grotesque with tabular figures.
- **Do** fire the flip and the single sheen only when the settled tier changes, and crossfade instead under Reduce Motion.
- **Do** keep the gross-estimate disclaimer directly under the card, in Label size and ink-soft.

### Don't:
- **Don't** give any element other than the rank card (and owned mini cards) a foil gradient frame or a glow.
- **Don't** add drop shadows to panels, the collection or the header; depth outside the card comes from ink outlines.
- **Don't** use pink, sunflower or a foil hue to mark an interactive control.
- **Don't** animate the card while the tier stays the same; within a tier only the digits change.
- **Don't** introduce sizes outside 40 / 28 / 20 / 15 / 13.
- **Don't** set soft text below 68% ink opacity (70% lavender in dark mode).
