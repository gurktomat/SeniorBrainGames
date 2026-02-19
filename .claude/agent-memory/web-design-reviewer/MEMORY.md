# SeniorBrainGames Design Review Memory

## Tech Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 (uses @theme inline block)
- Fonts: Merriweather (headings), Source Sans 3 (body)
- Deployed on Vercel, uses bun

## Current Color Palette (globals.css :root)
- primary: #2B7A78 (teal)
- primary-dark: #1F5E5C, primary-light: #3D9B99
- secondary: #F4A261 (orange)
- background: #FEFAF6 (warm off-white)
- surface: #FFFFFF
- text: #2D3436, text-muted: #636E72
- success: #52B788, error/accent: #E07A5F
- border: #DFE6E9
- Base font-size: 18px, line-height: 1.6

## Key Contrast Issues
- text-muted (#636E72) on background (#FEFAF6): ~4.18:1 - borderline, fails AA for normal text
- text-muted (#636E72) on white (#FFFFFF): ~4.52:1 - just passes AA
- secondary (#F4A261) on white: ~1.92:1 - FAILS badly as text color

## Layout
- max-w-5xl (64rem/1024px) container
- 2-column grid on sm breakpoint for cards
- No max-w-7xl option currently
- Cards use border-2, rounded-2xl, shadow-sm

## Architecture Notes
- Headings use inline fontFamily style (not Tailwind class)
- Navigation: sticky, border-b, 6 nav links, mobile hamburger at lg breakpoint
- Category pages share identical card patterns
- Game engines: 10+ specialized components
- All accessibility basics present: skip-to-content, aria labels, focus-visible, reduced-motion

## Design System Gaps
- No gradient usage anywhere
- No illustration/imagery - text and emoji only
- No badge/chip component (ad hoc rounded-full spans)
- Card hover states identical everywhere
- No section dividers or decorative elements
- Hero is text-only, no visual interest
