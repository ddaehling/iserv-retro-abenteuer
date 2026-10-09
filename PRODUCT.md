# Text Adventure · Die Spielesammlung

## Product purpose

A browser anthology of seven student text adventures. It makes the submitted programs directly playable through clear choices while preserving their stories, distinct authorship and original outcomes. Students choose an adventure by the author's first name, read each scene, and decide what happens next.

The audience is a school community using desktop computers, tablets and phones. The collection should be approachable without installation, accounts or command-line input. Its visual identity recalls illustrated PC and Amiga adventures of the early 1990s; the interaction remains readable and usable with a keyboard or touch.

## Content and authorship

| Author shown in the collection | Adventure | Runtime |
| --- | --- | --- |
| Mirac | Das verlassene Schloss | Branching story |
| Philip | Verloren im dunklen Wald | Branching story |
| Neha | Die unbekannte Insel | Branching story |
| Sophie | Das verlassene Haus | Branching story |
| Lilly-Rose | Mystery Escape | Branching story, numeric code and points |
| Franz Xaver | Der Todesmarsch | Branching story |
| Tamilo | The Mysterious Dungeon | Stateful combat, inventory, shop and save/load |

The surrounding interface and six branching stories are German. The Dungeon story retains English. Author credits use first names only. Original submissions, iServ contact data and internal school administration information are not part of the published website. Do not infer students' appearances from their names or use student portraits in the generated illustrations.

## Core experience

1. Open the collection and choose an author's first name from a list of seven adventures. A small scene thumbnail and subordinate story title support that choice.
2. Read the current scene beside its illustration on larger screens, or below the illustration on smaller screens.
3. Choose through a full-width button or its number key. Number shortcuts run only while focus is inside the story panel and are disabled while a text field is active. The scene title receives focus when opening a game and after a decision.
4. Use “Ein Schritt zurück” to undo a decision, “Neu beginnen” to restart, or “Alle Abenteuer” to return to the collection. Endings offer replay and another adventure.
5. For Mystery Escape, enter the numeric box code and see the current points. For the Dungeon, name the character, fight or flee, visit the trader and fight the dragon. The Dungeon shows health, gold, level and inventory.

Undo history and ordinary story progress exist only for the current session in memory. Changing to a game route starts that game again. Dungeon saving is an explicit action in the rest scene; it writes a validated state to local storage on the same browser and device. A valid save adds “Load saved game” to the Dungeon entry screen. There is no cloud account or cross-device synchronization.

## Story fidelity and adaptation policy

The source programs are the narrative authority. Preserve their plots and branching identities; repair broken control flow, input handling and incomplete mechanics so the stories can be played in a browser. Keep any substantive adjustment explicit in the project README rather than silently representing it as original student code.

The current README records these adaptations:

- General formatting and input errors were corrected, with light language smoothing.
- Mirac's window choice is reachable; the source's open key ending remains open.
- Neha's ethnicized opponent description became “Unbekannte”.
- Mystery Escape retains code `472` and its points logic.
- Der Todesmarsch presents danger without graphic detail.
- The Dungeon retains its enemy types, 15–25 gold reward, trader, character values, inventory and dragon encounter. Dragon fire deals 15 instead of 25 damage to make the browser adaptation winnable. The purchased sword deals 35 damage, the fire potion reduces three attacks to 5 damage each, and health potions restore up to 40 HP without exceeding 100. Save/load includes phase and inventory; invalid or unavailable item actions do not consume a combat turn.

These are documented implementation changes, not a claim of byte-for-byte or rules-for-rules equivalence to the submissions.

## Illustration contract

Every decision scene has a scene illustration in the same 1990s adventure style. Current decision scenes use individual generated assets; ordinary end nodes reuse the last relevant location. Dungeon combat states use the appropriate enemy illustration and reuse their location artwork across turns.

`bildstil.txt` is the global prompt authority, and the scene files in `prompts/` supply scene-specific facts. `castle-start` is the common visual reference. Illustrations show the present choice without revealing a future outcome, and the website labels them “KI-Pixelbild”. Images must remain school-appropriate and contain no interface, text or author identity.

The prompt requests a 4:3 composition, a logical 320 × 240 pixel appearance and a shared 24-color palette. These are generation targets, not verified numeric properties of the outputs. A common prompt and reference do not guarantee a strict raster or exact palette. The website preserves the visible pixel style with `image-rendering: pixelated`; this CSS does not quantize or repair the files. Assess consistency visually and verify numerical properties separately before making stronger claims.

## Platform and operational constraints

The delivery target is a static GitHub Pages site with relative asset URLs and hash-based routes. The implementation uses HTML, CSS and browser JavaScript modules, six JSON story files and a JavaScript Dungeon state machine. It needs no build process, server-side application or external runtime service. Fonts and images are served with the site; no tracking is implemented.

Serve the folder through HTTP for local use so browser modules and JSON fetching work. JavaScript is required to play; a noscript message explains that requirement. If stories fail to load, show a retry action. If an illustration fails, keep the story playable and replace the image with an explanatory message. A local-storage failure must likewise leave the Dungeon playable.

## Quality bar

- All seven author entries open the intended adventure; story choices, replay and undo remain reachable.
- Every decision state has the correct spoiler-free scene asset; illustrations do not carry required instructions that are absent from the text.
- The library and play screen remain readable and operable on desktop and mobile school devices.
- Native links, buttons, labels and fields support keyboard use, visible focus and touch. A skip link reaches the game, scene changes move focus deliberately, mixed-language content has explicit language attributes, and reduced-motion preferences are respected.
- Published credits remain limited to the intended first names, generated art remains labeled, and documented source adaptations remain reviewable.

## Documentation authority

This file records product intent and implemented behavior. `DESIGN.md` records the current visual system; `.impeccable/design.json` extends it with preview snippets and behavior tokens. The website's `styles.css`, `app.js`, `dungeon.js`, story JSON, `bildstil.txt` and README are the implementation evidence for this documentation snapshot.
