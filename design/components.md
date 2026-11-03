# Components, dependencies and licenses [2.2]

The site needs no forms, dialogs or dropdowns, so shadcn/ui, 21st.dev components and Radix are **not used**. Fewer dependencies means less to maintain.

| Package | Used for | License | Notes |
|---|---|---|---|
| next 16.4.4, react 19.3 | framework | MIT | static export (`output: "export"`) |
| tailwindcss 4 | styling | MIT | theme tokens in `globals.css` |
| @fontsource/anton | display font | OFL-1.1 | self-hosted through `next/font/local` |
| @fontsource-variable/work-sans | body font | OFL-1.1 | self-hosted through `next/font/local` |
| lucide-react | icons | ISC | individual icons are tree-shaken |
| sharp (dev) | resizes photos to WebP at build | Apache-2.0 | used by `scripts/fetch-images.mjs` |
| @playwright/test, @axe-core/playwright (dev) | tests | Apache-2.0, MPL-2.0 | not shipped to visitors |

## Design tokens

| Token | Hex | Use | Contrast (computed with the WCAG formula) |
|---|---|---|---|
| ink | #1c1510 | text, dark panels | on cream: 15.9:1 |
| cream | #f7f0e4 | page background | — |
| pepper | #a8231b | primary buttons, accents | white text on pepper: 7.2:1; pepper text on cream: 6.4:1 |
| mustard | #f2b632 | highlights, chips | ink text on mustard: 9.9:1; mustard on ink: 9.9:1 |
| collard | #2f5a3a | small tags | cream text on collard: 7.0:1 |
| smoke | #5b4f45 | secondary text | on cream: 7.0:1 |

## Type

- **Display:** Anton, uppercase, tight leading, in the style of a painted takeout sign.
- **Body:** Work Sans variable, 16–18px, line-height 1.6.

## References and what we borrowed

- Hand-painted Miami takeout signs and menu boards: big condensed caps, mustard and red, a dark "board" panel for the rotating menu.
- Strong local restaurant sites put Call, Order and Directions in the first screen and hours plus a map in one block. We copied that structure, not any visual design.
- Avoided: generic "AI template" gradients, stock photos, fake testimonials.
