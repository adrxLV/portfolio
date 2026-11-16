# Adriano Vilhena Portfolio (`portfolio.adrianolop.dev`)

Personal editorial showcase built around the narrative of **Controlled Chaos** (unifying software engineering, robotics/space cybersecurity, big band jazz piano, fencing, and photography). Built in zero-dependency vanilla HTML/CSS/JS for instant static deployment.

## Core Design Rules (Non-Negotiable)
- **Zero Border-Radius:** Every element uses sharp 90-degree corners (`border-radius: 0 !important`) or clean geometric `clip-path` cuts. Never introduce rounded cards, pills, or frosted-glass (`backdrop-filter`) panels on content blocks.
- **Editorial Minimalism:** No sticky top navbar, no eyebrow labels, no status badges ("Available for work"), and no corporate resume templates.
- **Palette:** Deep obsidian ink (`#09090b`), surface (`#121216`), warm chalk ink (`#f4f4f0`), crimson signal (`#e11d48`), sky signal (`#38bdf8`), and jazz amber (`#f59e0b`).
- **Typography:** `Syne` (800) for `ADRIANO` and display headers, `Playwrite AU SA` for `vilhena` in crimson, `Instrument Serif` italic for editorial accents, `JetBrains Mono` for telemetry/meta labels, and `Inter` for body copy.

## Animation & Performance Rules (FORGe Standard)
- **Single Animation Loop:** Drive cursor interpolation, scroll progress, and audio-reactive pulses from a single coordinated `requestAnimationFrame` manager that sleeps (`idle`) when pointer and scroll are stationary.
- **GPU-Only Scroll Morphing:** In `#photography-morph-section`, never animate `left`, `top`, `width`, or `height` on scroll. Set base dimensions once on resize and interpolate exclusively via `transform: translate3d(x, y, 0) scale(sx, sy)` and `opacity`.
- **Zero DOM Style Polling on Mousemove:** Never call `getComputedStyle()` inside `mousemove`. Use declarative `data-surface` attributes or CSS `mix-blend-mode` for cursor contrast.
- **Photo Deduplication & WebP:** Never show the same photograph in both the Hero Reel and the Photography Morph Stage on the same load. Serve `.webp` assets (`1400px` desktop, `800px` mobile), keeping gallery images eager-loaded rather than lazy-loaded.
- **Quiet Secrets (No Hints):** Never add visible tooltips or "psst... click here" arrows pointing to easter eggs. Hints must be ambient (e.g., a subtle 6-second pulse on `#eq-bars`).
- **Reduced Motion:** Respect `prefers-reduced-motion: reduce` across all decryptions, cursor followers, and scroll morphs.
