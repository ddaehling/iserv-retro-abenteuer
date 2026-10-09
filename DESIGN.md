---
name: Text Adventure · Die Spielesammlung
description: A navy and amber VGA adventure library for seven student stories.
colors:
  background: "#10121c"
  panel: "#1c2440"
  raised: "#283c64"
  border: "#3e5b85"
  muted: "#a3b8c6"
  ink: "#f4e3b2"
  amber: "#e8b65a"
  success: "#b8d193"
  failure: "#efa379"
typography:
  display:
    fontFamily: "VT323, monospace"
    fontSize: "clamp(48px, 5.5vw, 78px)"
    fontWeight: 400
    lineHeight: 1.02
  game-heading:
    fontFamily: "VT323, monospace"
    fontSize: "clamp(36px, 4vw, 56px)"
    fontWeight: 400
    lineHeight: 1.02
  scene-title:
    fontFamily: "VT323, monospace"
    fontSize: "37px"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  author:
    fontFamily: "VT323, monospace"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.1
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  key:
    fontFamily: "VT323, monospace"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1
spacing:
  compact: "8px"
  choice-gap: "12px"
  text-gap: "16px"
  scene-gap: "18px"
  group: "20px"
  section: "24px"
  tablet: "28px"
  small-page: "32px"
  stage: "40px"
  library: "48px"
components:
  choice:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "15px 18px"
    width: "100%"
  choice-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
  choice-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.background}"
    typography: "{typography.body}"
    padding: "15px 18px"
    width: "100%"
  choice-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
  author-row:
    textColor: "{colors.amber}"
    typography: "{typography.author}"
    padding: "15px 12px 15px 0"
  name-input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "12px 16px"
    width: "100%"
  code-input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    padding: "12px 16px"
    width: "130px"
  quiet-action:
    textColor: "{colors.muted}"
    padding: "8px 0"
  scene-frame:
    backgroundColor: "{colors.panel}"
    width: "100%"
  stats:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "14px 0"
---

# Design System: Text Adventure · Die Spielesammlung

## Overview

**Creative North Star: "Die VGA-Abenteuerbibliothek"**

A quiet navy adventure library with warm amber commands and illustrated worlds. The early 1990s influence comes from pixel lettering, a restrained palette, angular controls and scene artwork. Story text remains spacious and uses the device's familiar sans serif so reading and deciding are comfortable during a school session.

The world is code-led: these rules capture the implemented website, not an unbuilt mockup. Its identity is shared across all seven stories while each scene retains its own fictional setting. First names lead the library, pictures establish place, and the next choice stays visually clear.

**Key Characteristics:**

- Deep navy surfaces with warm amber actions and cream reading text.
- Pixel display lettering paired with readable system body type.
- Flat, square-edged structures and thin blue dividers.
- Large 4:3 scenes and full-width, numbered choices.
- Responsive reading order, visible focus and restrained motion.

## Colors

Warm text and command colors sit over cool, layered navy surfaces. The frontmatter values are normative; the role names below describe their application.

### Primary

- **Amber:** author names, choice numbers, bylines, key statistics, focus outlines, the brand icon and prominent start/replay/submit actions.
- **Warm Ink:** body text, headings and the primary button's hover surface.

### Secondary

- **Sage Success:** successful ending text, paired with the explicit “Geschafft!” state.
- **Peach Failure:** failed ending text, paired with the explicit “Game over” state.

### Neutral

- **Night Navy:** page background and the dark text on filled amber actions.
- **Panel Navy:** choices, inputs, artwork frames, status messages and hovered library rows.
- **Raised Navy:** a choice's hover fill.
- **Divider Blue:** borders, separators and image frames.
- **Mist Blue:** descriptive copy, secondary navigation, labels, hints and inventory text.

**The Amber Command Rule.** Use amber to identify authors, actions and important values; ordinary narrative text uses Warm Ink.

The CSS also declares unused green and red primitives. They are not established interface roles and are intentionally excluded from the normative tokens. The image prompt's broader art palette is separate from this interface palette.

## Typography

**Display Font:** locally hosted VT323, with monospace fallback.

**Body Font:** the system sans-serif stack in the frontmatter. Body text does not inherit the pixel display face.

VT323 supplies the adventure-era character without imposing pixel lettering on long passages. There is no letter-spacing scale, synthetic all-caps treatment or font-weight hierarchy; the brand's uppercase lettering is literal text. The local font uses `font-display: swap`.

- **Display:** library headline; balanced line wrapping and a 20px lower margin. At the mobile breakpoint its size is fixed at 48px.
- **Game heading:** the adventure title; paired with a 26px/1.2 pixel byline, reduced to 23px on mobile.
- **Scene title:** each story state's heading; reduced to 34px on mobile, with an 18px lower margin.
- **Body:** story paragraphs have a 16px lower margin and a maximum width of 68ch. Introductory copy is limited to 65ch.
- **Author:** the primary library label; reduced to 30px on mobile. The story name underneath uses the label role and a 5px upper margin.
- **Labels:** normal secondary text uses the label role; image captions, hints and footer metadata use 13px, with image labels reduced to 12px on mobile.
- **Choice keys:** the pixel key role precedes each numbered choice. Code entry uses VT323 at 32px/1.

**The Reading Voice Rule.** Reserve VT323 for short headings, names, key numbers and brief status labels; use the system face for narrative and decision sentences.

## Layout

The page uses a centered shell capped at 1440px. Desktop width is the viewport minus 96px; at 1600px and above, it is the viewport minus 120px within the same cap. At widths of 960px and below the shell has 24px side gutters; at 650px and below it has 16px side gutters.

The library uses two columns in a 1.05:1 ratio with a 48px gap. Its author list uses 76 × 57px thumbnails, a 22px column gap and a narrow arrow column. The feature illustration is sticky at a 28px top offset. At 960px the library ratio becomes 1.1:1 and its gap becomes 28px. At 650px it becomes a vertical stack with a 24px gap; the list comes first, the illustration loses sticky positioning, thumbnails become 64 × 48px and row gaps become 16px.

The play screen uses a 1.14:1 image/text split, a 40px gap and a 510px minimum stage height. At 960px it becomes one column, clears the minimum height and caps the illustration and story column at 720px. At 650px its gap becomes 24px and the game title/byline stack vertically. Image frames remain 4:3; artwork uses `object-fit: cover` and `image-rendering: pixelated`.

The masthead has a 104px minimum height, reduced to 78px on mobile. Desktop intro spacing is 52px above and 32px below; it becomes 32px/24px on mobile. Choices use a 12px vertical gap and begin 26px below the narrative. Reuse the observed spacing roles instead of introducing a second density system.

## Elevation & Depth

The implementation uses no box shadows, gradients, blur or floating card elevation. Depth comes from the Night/Panel/Raised Navy surface sequence and blue borders. Hover feedback changes fill and border color without moving the control. Illustrations are framed as part of the page, without simulated monitor housings or CRT overlays.

**The Flat Stage Rule.** Use tonal layers and visible edges to separate content; keep controls and scene frames anchored in place.

## Shapes

The visual language is rectangular. The source declares no border-radius scale. Preserve the square-edged control and frame treatment rather than introducing pill buttons or rounded cards. Library rows are separated by 1px rules; choices, inputs and messages use 1px borders; scene and feature frames use 2px borders. The brand's floppy-disk icon and play arrow use crisp SVG geometry.

## Components

### Choice and primary buttons

Choices are full-width, left-aligned panel surfaces with a 1px blue border, a 58px minimum height and a 16px gap between the amber key and sentence. Their padding is specified in the frontmatter; mobile horizontal padding becomes 14px. Hover uses Raised Navy with an amber border. Primary start, replay and code-submit actions use amber with dark text and change to Warm Ink on hover.

Choice background and border transitions last 160ms with `ease-out`. Disabled buttons keep their position with 0.5 opacity and a not-allowed cursor. The shared focus-visible treatment is a 3px amber outline, offset by 5px. Number shortcuts target enabled, numbered choices only while focus is inside the story panel, and do not run while typing in a field.

### Author rows

An entire row is a link with an image, first name, subordinate title and amber play arrow. A 180ms `ease-out` background transition leads to Panel Navy on hover or focus. The first name remains the strongest item; the title provides context. Thumbnail images are decorative within the labeled link.

### Inputs

The character-name input is a full-width panel field capped at 360px, with a visible label above it. The numeric code field has a fixed width and larger pixel text; it sits beside the flexible “Box öffnen” action with a 12px gap. Both use a blue border, Warm Ink text, an amber caret and the common focus outline. The code field requests a numeric keyboard and native required/pattern validation; no custom error component is implemented.

### Navigation

The brand returns to the library. In the game toolbar, “Alle Abenteuer” sits opposite the undo and restart actions. Secondary actions use muted, underlined text with a 5px underline offset; the toolbar has no filled navigation pills. On mobile the toolbar tightens spacing, the edition label disappears, and the footer stacks. Undo is disabled when the history is empty.

### Scene frame and story panel

A 4:3 image with a blue frame anchors each scene. The compact caption contains the scene title or “Letzter Schauplatz” and the disclosure “KI-Pixelbild”. The text section places its title, ending/status values, paragraphs and choices in reading order. Scene changes use a 200ms `ease-out` brightness appearance from 0.8 to 1; there is no typewriter delay. Reduced-motion preferences disable all animations and transitions.

The image prompt targets a shared early 1990s pixel language, a logical 320 × 240 grid and a fixed art palette. Generated assets are not certified to meet that grid or palette exactly. Keep the global prompt, neutral scene fields and shared visual reference; check actual images instead of presenting the request as a measured output property. Ending scenes may reuse their last location. Image-loading failure replaces the artwork with readable text and leaves play available.

### Statistics and messages

Dungeon statistics and Escape points use horizontal ruled strips with wrapping items, tabular numerals and 20px amber values. Inventory is muted text. Runtime messages use a bordered Panel Navy surface with 13px/17px padding and a status role. Success and failure labels pair color with explicit text; color never carries the outcome alone.

### Focus and keyboard entry

The skip link becomes visible when focused. Main and scene-title targets support programmatic focus; opening a game, choosing and undoing focus the scene title, which scrolls into view only when needed. Keep native buttons, links and associated labels, including the visible numeric-code label. German and English regions carry explicit language attributes. Do not replace the visible focus treatment with color-only feedback.

## Do's and Don'ts

### Do:

- **Do** use amber for authors, actions, choice numbers and important values.
- **Do** keep narrative and choice sentences in the system body face.
- **Do** preserve the 4:3 scene frame and the clear image-to-story reading order.
- **Do** keep full-width choices, native keyboard behavior and the visible amber focus outline.
- **Do** reuse the global art prompt and inspect illustrations for continuity and spoilers.
- **Do** respect reduced-motion preferences and keep scene transitions brief.

### Don't:

- **Don't** turn controls into rounded pills or add shadow-based floating cards.
- **Don't** place interface text, choice numbers or future outcomes inside scene artwork.
- **Don't** claim generated art uses an exact 24-color palette or 320 × 240 logical grid without measuring it.
- **Don't** use pixel display lettering for long story passages.
- **Don't** replace outcome labels or focus outlines with color alone.
- **Don't** make reading wait for typewriter animation or decorative effects.
