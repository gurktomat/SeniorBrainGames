# Design System: SeniorBrainGames Dashboard
**Project ID:** Unavailable from local workspace (Stitch MCP/project metadata not exposed in this session)
**Source Screen:** Main Board match inferred as the home dashboard at `src/app/DashboardClient.tsx`

## 1. Visual Theme & Atmosphere

This interface is a **warm, encouraging brain-training dashboard** built to feel cheerful without becoming childish. The overall mood is **playful, optimistic, and highly approachable**, using soft cream backgrounds, candy-bright gradients, and rounded surfaces to reduce intimidation and make repeat visits feel welcoming.

The visual philosophy is **gamified wellness** rather than hard-edged productivity. The board is information-rich, but it does not feel dense because the layout relies on broad gutters, short content blocks, gentle elevation, and clear headline hierarchy. The emotional tone should stay **reassuring, energizing, and lightly celebratory**.

Key characteristics:
- Soft, sunlit backgrounds with pastel-lilac warmth rather than stark white
- Bright purple-led actions supported by teal, coral, and gold accents
- Editorial serif headings paired with clean, accessible sans-serif body copy
- Friendly, touchable shapes with subtly to generously rounded corners
- Whisper-soft purple-tinted elevation rather than harsh, gray enterprise shadows
- Light gamification cues such as streak flames, XP bars, rating stars, and category color coding

## 2. Color Palette & Roles

### Primary action colors
- **Playful Electric Violet** (`#7C5CFC`) - Primary action color used for main buttons, active navigation, progress fills, and the most important emphasis moments.
- **Soft Lilac Glow** (`#A78BFA`) - Used in gradients, hover states, and lighter branded emphasis areas to keep purple feeling airy rather than heavy.
- **Deep Royal Violet** (`#5B3FD9`) - Reserved for pressed states, stronger emphasis, and moments where the primary purple needs more visual weight.

### Positive and reward accents
- **Fresh Mint Teal** (`#2DD4BF`) - Used for positive momentum, supportive highlights, streak-adjacent energy, and part of the hero gradient blend.
- **Warm Coral Spark** (`#FF7A6E`) - Used for streak badges, lively alerts, and energetic secondary emphasis that feels human and upbeat.
- **Golden Achievement Amber** (`#FBBF24`) - Used for ratings, rewards, celebratory markers, and achievement language.

### Foundations and surfaces
- **Soft Paper Cream** (`#FAFAF8`) - The default page background. It keeps the board bright and readable while feeling softer and more comforting than pure white.
- **Clean Card White** (`#FFFFFF`) - Primary card and surface background for content containers that need crisp clarity.
- **Lavender Mist Surface** (`#F3F0FF`) - Secondary section wash used for warm gradient transitions and supporting surfaces that need subtle separation.

### Text hierarchy
- **Ink Plum Charcoal** (`#1E1B2E`) - Primary text color for headings and high-priority labels. It is darker than the palette around it, but still softer than true black.
- **Quiet Slate Gray** (`#4B5563`) - Supporting text for descriptions, metadata, and lower-contrast helper copy.
- **Recessive Fog Gray** (`#9CA3AF`) - Tertiary text and low-priority informational content.

### Structural and state colors
- **Soft Divider Gray** (`#E5E7EB`) - Default borders and separators that preserve structure without making the UI feel boxed in.
- **Barely-There Border Mist** (`#F3F4F6`) - Ultra-light edge treatment for subtle divisions.
- **Clear Success Emerald** (`#10B981`) - Positive confirmations and memory-category coding.
- **Alert Coral Red** (`#EF4444`) - Errors and critical negative feedback.
- **Signal Sky Blue** (`#0EA5E9`) - Informational highlights and general-knowledge category coding.

### Category coding
- **Nostalgia Indigo** (`#6366F1`) - Nostalgia Trivia
- **Curious Sky Blue** (`#0EA5E9`) - General Knowledge
- **Wordplay Amber** (`#F59E0B`) - Word Games
- **Recall Emerald** (`#10B981`) - Memory Games

### Gradients
- **Primary Brand Sweep** (`#7C5CFC` to `#A78BFA`) - Used on key buttons and progress fills to make primary actions feel animated and rewarding.
- **Hero Energy Gradient** (`#7C5CFC` to `#A78BFA` to `#2DD4BF`) - Used sparingly for high-visibility branded moments.
- **Warm Section Fade** (`#FAFAF8` to `#F3F0FF`) - Used to create gentle transitions between dashboard zones.
- **Card Glow Fade** (`#FFFFFF` to `#FAFAF8`) - Gives cards a barely perceptible soft-lit body.

## 3. Typography Rules

**Primary heading family:** Merriweather  
**Body family:** Inter

The typography system intentionally mixes **editorial warmth** with **digital clarity**. Headlines use a serif with literary character so the experience feels trustworthy and humane, while all supporting UI copy stays in a clean sans-serif for easy scanning and high legibility.

Hierarchy and behavior:
- **Hero and section headings:** Bold Merriweather with slightly tightened tracking (`-0.01em`). These should feel welcoming, substantial, and a bit classic.
- **Body copy:** Inter at a large accessibility-forward base size (`18px`) with relaxed `1.6` line-height. The system assumes older users and prioritizes readability over compactness.
- **Support labels and navigation:** Inter in semi-bold to bold weights, often with small size increases and occasional uppercase treatment for status labels.
- **Microcopy:** Quiet, supportive, never overly technical. The language should feel encouraging and low-friction.

Typography principles:
- Headings should feel warm and confident, not sleek or futuristic
- Body copy should stay generous, readable, and calm
- Labels may use stronger weight to create clarity without requiring tiny text
- Avoid compressed text blocks; preserve breathing room around copy

## 4. Component Stylings

### Buttons
- **Shape:** Softly rounded rectangles with approachable corners (`8px`), never sharp or pill-heavy by default.
- **Primary buttons:** Filled with the Primary Brand Sweep gradient, white text, bold weight, and a friendly high-contrast glow. They should feel like reward-oriented invitations rather than formal commands.
- **Secondary buttons:** Transparent or lightly tinted surfaces with a strong violet outline, preserving warmth while reducing visual pressure.
- **Hover behavior:** Gentle upward lift with a richer purple shadow. Motion should feel buoyant and confident, not snappy or aggressive.

### Cards and containers
- **Shape:** Subtly rounded corners (`12px`) for most dashboard cards, with larger rounding (`16px`) for feature containers and icon blocks.
- **Surface treatment:** Light card gradient from white into warm cream rather than flat white slabs.
- **Borders:** Thin, soft gray edges that keep the UI organized without feeling rigid.
- **Elevation:** Whisper-soft purple-tinted shadows in light mode; cards lift slightly on hover for an almost tactile response.
- **Mood:** Cards should read as cheerful dashboard tiles, not enterprise panels.

### Stats and progress elements
- **Progress bars:** Rounded full-width capsules with vivid violet-to-lilac fill.
- **Badges and streak indicators:** Often pill-shaped or circular, using coral, amber, or purple accents to communicate momentum and reward.
- **Category markers:** Small high-saturation color chips or icon tiles that help users scan the board quickly.

### Navigation
- **Top navigation:** Sticky, clean, lightly translucent surface with blur. It should feel stable and supportive without overwhelming the content below.
- **Logo treatment:** Serif wordmark paired with a rounded gradient icon tile. This is one of the strongest brand moments in the interface.
- **Active states:** Soft violet background tint with purple text rather than underlines or harsh fills.
- **Mobile navigation:** Fixed bottom tab bar with icon-first communication and compact labels for easy thumb use.

### Inputs and search
- **Form language:** Large touch targets, readable type, and simple contrast.
- **Focus treatment:** Strong violet focus outline with offset, designed to be unmistakable and accessible.
- **General feel:** Inputs should feel easy and forgiving, not clinical.

### Onboarding and recommendation tiles
- **Selection cards:** Reuse the dashboard card language with colored icon blocks and visible ring treatment when selected.
- **Tone:** Encouraging, guided, and lightweight, with motion that feels like progress through a friendly setup rather than a mandatory form.

## 5. Layout Principles

The board uses a **wide, breathable dashboard rhythm** built around centered content containers, short vertical sections, and clear modular grouping. It is designed to feel active and rewarding without becoming visually noisy.

Layout rules:
- **Primary content width:** Large centered container around `max-w-6xl`, giving the board a spacious desktop frame while staying readable.
- **Section spacing:** Repeated vertical zones with generous padding (`py-6` to `py-10`) so each dashboard block feels self-contained.
- **Horizontal framing:** Consistent side padding (`px-6`) that keeps content comfortably inset on both mobile and desktop.
- **Grid behavior:** Simple, adaptable grids that collapse cleanly from four columns to two or one depending on context.
- **Scrolling strategy:** Horizontal scroll is used selectively for recent-game cards, keeping the home board compact while preserving variety.
- **Information density:** Short cards, strong headings, and restrained copy reduce cognitive load.

Whitespace philosophy:
- Prefer open breathing room over maximal information packing
- Use visual grouping to make each section feel like a small win
- Let accent color do the heavy lifting instead of adding more structural chrome

Responsive behavior:
- Mobile keeps the same emotional tone, not a stripped-down variant
- Touch targets remain large and forgiving
- Navigation shifts to bottom tabs for easy reach
- Dashboard modules stack cleanly while preserving category color cues and action emphasis

## 6. Depth, Motion, and Interaction Character

- **Depth:** Soft and optimistic. Shadows are present but diffused, often with a subtle violet cast in light mode.
- **Motion:** Quick but gentle, usually around `0.2s`, with small lift and opacity changes rather than dramatic transforms.
- **Interaction tone:** Every hover, focus, or selected state should feel encouraging and game-like, never bureaucratic.
- **Accessibility posture:** Large type, clear contrast, visible focus rings, and reduced-motion support are part of the visual system, not optional extras.

## 7. Dark Mode Translation

Dark mode keeps the same playful identity but shifts the board into a **deep plum-night** environment:
- **Night Background** (`#0F0D1A`) - Main canvas
- **Deep Card Plum** (`#1A1726`) - Primary surfaces
- **Muted Night Surface** (`#231F33`) - Secondary surfaces
- **Soft Light Text** (`#F1F0F7`) - Primary text

The brand purple remains intact, but the gradients become more luminous against the darker field. Shadows switch from tinted softness to deeper ambient depth.

## 8. Stitch Prompting Notes

When generating new screens to match this system, describe the style in natural language like this:

- "Create a warm, playful brain-training dashboard with soft cream backgrounds, editorial serif headings, and vibrant violet gradient CTAs."
- "Use friendly dashboard cards with subtly rounded corners, thin gray borders, and whisper-soft purple-tinted shadows."
- "Pair Merriweather-style headings with highly readable Inter-style body text at generous sizes for older users."
- "Use optimistic gamification cues like streak flames, XP bars, category color chips, and achievement amber accents."
- "Keep layouts spacious and modular, with generous side padding, short sections, and clear scanning hierarchy."

Avoid describing this system as:
- harsh, corporate, minimal-black, glass-heavy, or austere
- flat monochrome productivity software
- tiny, dense, compact, or data-table-driven

Preferred component phrasing:
- "softly rounded gradient primary button"
- "warm cream-to-lilac section background"
- "friendly dashboard card with gentle lift on hover"
- "editorial serif heading with approachable, accessible body copy"
