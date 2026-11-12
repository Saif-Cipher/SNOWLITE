# SNOWLITE — Agent Build Documentation

**Purpose:** everything a coding agent needs to rebuild the Snowlite winter-collection
website exactly as designed — brand, logo, colours, fonts, layout, animations,
commerce behaviour and acceptance tests. Read this whole file before writing code.
All image assets referenced here are in the `assets/` folder next to this document,
and all product data is in `products.json`.

**Brand:** Snowlite — a winter-clothing label. First collection: **Winter '26, Drop 01**.
**Tagline:** "Light as snow, warm as home." · Hero line: "The heavyweight hoodie,
rethought — *Light.*"
**Voice:** plain, confident, short sentences. No hype words, no emoji in UI copy.

---

## 1. Logo & brand identity

### 1.1 The logo (final, do not redesign)
- **Name of the mark:** the **Hexagon SL**.
- **Form:** a hexagon/shield outline split into two letterforms — a bold **S** forming
  the left half and an **L** forming the right half, their strokes closing the hexagon.
- **Reference:** `assets/logo/logo-hexagon-sl-reference.png` (the approved concept).
  Recreate it as a **clean inline SVG** from that reference — never ship the raster
  crop as the logo. Also see `assets/logo/logo-concepts-sheet.webp` for the exploration
  sheet (context only) and `assets/logo/logo-sl-tile-draft.svg` (early draft, do not use
  as final geometry).
- **Colourways of the mark:**
  - Primary (on dark / as app tile): hexagon filled **Deep Aubergine `#3A1F2B`**,
    **S in white `#FFFFFF`**, **L in Cloudy Blue `#DFEDFF`**.
  - On light backgrounds: no tile fill; **S in Deep Aubergine**, **L in `#5F5F5F`**.
  - Mono: all-white on aubergine, all-aubergine on cloudy.
- **Placements:** preloader centre, header left, footer, favicon (tile version),
  and — as product branding — a **small embroidered SL monogram on the LEFT chest**
  of every hoodie (already present in all product photography; never add a second logo
  graphic on top of product images).
- **Wordmark lockup:** hexagon + `SNOWLITE` in the display font (see §3), uppercase,
  letter-spacing ≈ 0.14em, with a small folio line under it: `WINTER '26`.

### 1.2 Brand rules
- Colour lives in the garments and the three theme colours (§2). No other brand colours.
- Photography style: faceless-mannequin or ghost-mannequin catalogue shots, pale
  cloudy-blue studio background, same framing across all products (see `assets/designs/`).
- The hexagon is the only logo. Do not invent secondary marks.

---

## 2. Colour system (the user's chosen triple palette — exact)

| Token | Hex | Role |
|---|---|---|
| `--aubergine` Deep Aubergine | `#3A1F2B` | Primary ink: headings, giant word, primary buttons, preloader, footer, logo tile |
| `--cloudy` Cloudy Blue | `#DFEDFF` | Light colour: page/hero background tint, chips, text & accents on aubergine, logo L on dark |
| `--cement` Wet Cement | `#8E8E8E` | Neutral: borders, dividers, secondary surfaces, swatch greys |
| `--cement-deep` (derived) | `#5F5F5F` | Small grey text on light backgrounds (Wet Cement alone fails AA at small sizes) |
| `--paper` (derived) | `#FBFCFE` | Card surfaces on cloudy backgrounds |

Rules:
- UI chrome uses ONLY these colours (+ white/black tints of them). Product photos keep
  their own garment colours — that is the only place other colours may appear.
- **Backgrounds are gradients, never flat:** base wash Cloudy → Paper, with aubergine
  and cement tint glows bleeding between sections, and deep aubergine gradient panels
  (never flat aubergine) behind the drop CTA and footer. Keep body-text contrast
  ≥ 4.5:1 everywhere, including over gradients.
- Buttons: primary = aubergine fill, white/cloudy text. On dark panels: cloudy fill,
  aubergine text.

---

## 3. Typography (locked — do not substitute silently)

| Role | Font stack | Used for |
|---|---|---|
| Display (Font 1) | `"Days One", "Archivo Black", sans-serif` | ONLY: the SNOWLITE wordmark, the giant hero word, highlight CTA buttons (Shop the Drop / Add to Bag / Get Early Access / Shop the Collection). Nothing else. |
| Sans (Font 2a, "Creative Display" role) | `"Archivo", "Inter Tight", sans-serif` | Section headings, body, nav, product names/prices, FAQ, forms, footer |
| Serif italic (Font 2b, "PP Editorial New" role) | `"PP Editorial New", "Playfair Display", serif` — italic | Exactly ONE accent word per heading, set large and italic, overlapping the sans line slightly (e.g. "THE ONES GOING *fast*", "QUESTIONS, *answered*") |

- PP Editorial New is a commercial font; **Playfair Display Italic is the approved
  standing fallback** — load PP Editorial New first if licensed, else the fallback.
- Heading pattern: sans in bold uppercase + one italic serif word. Never set a whole
  heading in the display font or in the serif.

---

## 4. Assets inventory (all in `assets/`)

| File | Use |
|---|---|
| `logo/logo-hexagon-sl-reference.png` | Logo geometry reference (recreate as SVG) |
| `logo/logo-concepts-sheet.webp` | Logo exploration context |
| `hero/hero-aubergine-cutout.png` | **THE hero product** — transparent cut-out of Aubergine Prime (RGBA). Hero + About/story product |
| `hero/hero-aubergine-depth-map.png` | Depth map matching the cut-out, for WebGL displacement / 2.5D parallax |
| `hero/hero-aubergine-prime-snow.webp` | Aubergine Prime photo (falling snow) — cards/press |
| `hero/hero-aubergine-prime-card.webp` | Aubergine Prime mannequin shot — Shop card |
| `hero/hero-glacier-one.webp` | Glacier One (snow white) hero photo — Shop colourway |
| `designs/design-01…12-*.webp` | The 12 designed hoodies (see §5 / `products.json`) |
| `colourways/product-*.png` | The 8 plain colourway crops + glacier cream (Shop) |
| `lookbook/lookbook-mountains.webp` | Looks view — model, ice-blue hoodie, snowy peaks, golden hour |
| `lookbook/lookbook-city-dusk.webp` | Looks view — navy hoodie, snowy city street at dusk |
| `lookbook/fabric-macro-fleece.webp` | Bento "Built for −10°" fabric macro tile |
| `source/colourway-grid-a.webp`, `source/colourway-grid-b.webp` | Original 2×2 generation grids the colourway crops were cut from (provenance) |

The 12 designs and 9 colourways are **variants of one hoodie model** — the quick-view
treats them as a colour/design variant family (§6.4).

---

## 5. Products (data: `products.json` — use it verbatim)

Shared spec for every hoodie: **480 GSM brushed fleece, relaxed cut, kangaroo pocket,
ribbed cuffs/hem, SL embroidered left chest. Sizes S / M / L / XL.**

The 12 designed products (name · price · badge):
1. Aubergine Geoband · $149 · LIMITED — geometric cloudy/cement chest band (signature)
2. Glacier Snowflake · $139 — giant tonal snowflake, snow white
3. Midnight Slash · $134 · BESTSELLER — diagonal navy/ice/grey colour-block
4. Pine Peaks · $129 — white mountain line-art on pine green
5. Charcoal Circuit · $124 — racing stripes down both sleeves
6. Blush Fade · $129 — rose-to-white ombré
7. Ember Sleeves · $144 · LIMITED — black, ember flame sleeves, orange-lined hood
8. Aurora Speckle · $134 · NEW — all-over snow speckle on ice blue
9. Cream Retro Peaks · $127 — vintage sunset-peaks graphic on cream
10. Frost Camo · $132 · NEW — ice-crystal camouflage on heather grey
11. Cloudy Swirl · $126 — blue/white cloud-swirl dye (every piece unique)
12. Cement Patchwork · $138 — sewn grey patchwork, one aubergine block

Plus the hero product **Aubergine Prime ($149, LIMITED)** and the 9 plain colourways
in `products.json`. Full descriptions live in `products.json` — do not rewrite them.

---

## 6. Site architecture

### 6.1 Form
A single-page application with **7 client-side views** (no page reloads):
**HOME · SHOP · LOOKS · ABOUT · BAG · CHECKOUT · CONFIRMATION**.
Header nav (desktop) + floating bottom dock (mobile) switch views. Each view switch:
short crossfade/slide transition, scroll to top ONCE (only here — see §7.3), active
state on nav + dock. All state lives in **one central store object** (products, bag,
filters, search, checkout draft) so a real backend can replace the data layer later
without restructuring the UI.

### 6.2 HOME (in order)
1. Announcement marquee (top): "FREE SHIPPING OVER $75 • MEMBERS SHOP 24H EARLY • …"
2. Sticky header: hexagon + wordmark left; nav centre; search + bag (with count badge)
   right. Header becomes a floating pill on scroll.
3. **Hero** (§7.1) — the HUEBLEU formula: giant SNOWLITE word, cinematic hoodie, snowfall.
4. Benefits marquee: "480 GSM • BRUSHED FLEECE • FREE RETURNS • …"
5. Collection preview: **Display Cards fan** (top 4, fanned stack spreading on
   hover/tap) + "Shop all" CTA → **Bestsellers rail** "THE ONES GOING *fast*" (§7.4).
   NO full grid on Home.
6. Bento "BUILT FOR −10°": fabric macro tile + spec tiles (480 GSM, brushed fleece,
   double-lined hood, hand-finished).
7. Drop CTA: "JOIN SNOWLITE — 10% off your first order", email field with validation
   states (error message / "You're on the list" success).
8. Motion footer: nav, small print, giant SNOWLITE wordmark that fills with colour
   as it scrolls into view.

### 6.3 SHOP
Full catalogue (designs + colourways + hero product). Filter chips:
**All / New / Limited / Bestsellers**. Product cards: image, badge, name, colourway
line, price, swatch dots, quick-add. Search field at top (same engine as §6.6).

### 6.4 Product card + quick-view behaviour
- Card hover (desktop): spotlight glow following the cursor + lift (see §7.5).
- Swatch dots on a card swap that card's garment image (crossfade, no layout shift).
- Tapping a card opens **quick-view**: big image, full variant row — switching variant
  crossfades image and updates name + price live — size selector (S/M/L/XL), quantity,
  Add to Bag. The chosen variant + size + qty is what enters the Bag; the bag line
  shows the variant name and size.
- Quick-add overlay on cards: resting state FULLY closed (translated down, opacity 0,
  `pointer-events:none`); opens on hover/focus/tap and always completes its transition.

### 6.5 LOOKS / ABOUT / BAG / CHECKOUT / CONFIRMATION
- **LOOKS:** interactive image accordion (one panel per colourway; hover expands on
  desktop, tap on mobile) + zoom-parallax gallery using the lookbook images.
- **ABOUT:** brand story statement (giant centred text, words light up on scroll, the
  Aubergine Prime cut-out product beside/over it) → **Reviews** (testimonial marquee,
  one quiet row) → **Good to know**: FAQ accordion + care strip (wash cold, dry flat…).
- **BAG:** line items (image, name, variant, size, qty +/− steppers ≥44px, remove),
  subtotal, **free-shipping progress bar (free ≥ $75)**, Checkout button. Empty state:
  message + "Shop the drop" CTA.
- **CHECKOUT (front-end demo — backend comes later):** contact + shipping form with
  inline validation; delivery radio — **Standard $6.95, free when subtotal ≥ $75
  (3–5 days) / Express $14.95 (1–2 days)**; payment card fields with formatting +
  validation, visibly a demo (never transmit card data); live order summary
  (items, subtotal, shipping, total) updating with delivery choice; **Place Order**.
  Empty bag → redirect to Bag empty state.
- **CONFIRMATION:** generated order number **`SL-2026-XXXX`**, delivery estimate,
  "Continue shopping"; the bag is cleared after ordering.

### 6.6 SEARCH
Header search button (+ Shop search field) opens a full overlay: live results as you
type across name + colourway + tags (New/Limited/Bestseller); result cards with image,
name, price, quick-add; tapping a result opens its quick-view; empty state suggests
bestsellers. Esc/close dismisses. Fully usable on mobile.

---

## 7. Motion & animation system (the soul of this site — implement faithfully)

Stack: **Lenis** smooth scroll + **GSAP ScrollTrigger** for scroll choreography +
**Three.js/WebGL** for the hero product + vanilla CSS/canvas for the cinematic stack.
One scroll system, one card-hover language, transform/opacity ONLY (no animating
layout properties). Target: steady 60fps.

### 7.1 Hero (desktop)
- Layer order: gradient sky → **giant SNOWLITE word** (display font, aubergine,
  oversized, cropped by the viewport edges) → **WebGL hoodie** (cut-out texture +
  depth map, displacement parallax) pinned centre → folio captions in the corners.
- The hoodie **travels on scroll**: hero → featured/Display-Card area → About story
  slot, on a pinned ScrollTrigger timeline with **smoothed scrub (≈1s catch-up)**.
- Mouse: gentle tilt (lerped, max ≈6°) + depth shift against the back layer.
- Idle: very slow, small sway — cinematic, never bouncy.

### 7.2 Cinematic stack (Magic UI techniques, vanilla re-implementation)
Applied to the hero only, all in-palette:
- **Light Rays:** ~7 soft gradient beams fanning from top-centre behind the product,
  cloudy tint, slow drift (~17s alternate).
- **Backlight:** radial halo (cloudy → aubergine) directly behind the product slot,
  breathing scale/opacity ~6.5s.
- **Particles:** canvas snow in **3 depth layers** (far: many, tiny, crisp, slow;
  near: few, large, soft-blurred, faster). Pointer creates a gentle lerped "wind".
  Counts scale down on mobile (≈ desktop 54/34/18, mobile 26/15/8 per layer).
  Pause when off-screen, on another view, or tab hidden.
- **Glare Hover:** a soft light patch following the pointer across the garment,
  **masked by the cut-out's alpha** so it hugs the hoodie; driven from the same lerped
  pointer loop as the tilt.
- **Blur Fade entrance:** after the preloader, hero elements reveal staggered
  (~120ms steps): eyebrow → word → product (scale .96→1, blur 12px→0) → subline → CTAs.
- **Text Animate:** the giant word's 8 letters rise + un-blur per letter (~55ms stagger).
- **Border Beam:** ONE element only — the hero primary CTA gets a thin light travelling
  its border (conic-gradient ring, ~5s loop).

### 7.3 Scroll rules (hard-won — do not regress)
- **Clicks never move the page.** A scroll guard snapshots `scrollY` on click and
  restores it after any state re-render; native hash jumps are `preventDefault`ed;
  `history.scrollRestoration = 'manual'`. ONLY nav/dock view switches and deliberate
  in-page anchor CTAs may scroll (to top, once).
- Lenis lerp ≈ 0.09. Cache element rects on resize; never measure layout inside
  scroll handlers. `will-change` on the travelling product only.

### 7.4 Bestsellers rail
Snap carousel that **auto-plays**: glides to the end, ping-pongs back. Any interaction
(swipe, mouse drag with pointer capture, arrows, wheel, hover) pauses it; resumes
≈3s after release. Pauses off-screen / on other views / hidden tab. A drag must
suppress the click that follows it.

### 7.5 Cards everywhere
Hover: lift ≈ −6px, deepening aubergine shadow, image scale ≈ 1.04 inside its frame,
250–350ms ease (+ spotlight on product cards). Touch: same state on tap/focus.
Buttons: instant pressed state (scale ≈ .97), ≥44px touch targets, visible focus
rings, sensible full-width stacking on mobile. **No dead buttons — if it renders,
it works.**

### 7.6 Preloader + marquees + footer
- Preloader: aubergine panels with cloudy hairline columns (staircase), hexagon logo
  centre, staircase-wipe exit, then the Blur Fade hero entrance (§7.2).
- Marquees: CSS-keyframe infinite loops, duplicated content, pause on hover.
- Motion footer: giant wordmark fill sweeps with scroll progress.

### 7.7 Mobile (≤768px) — different hero, same brand
- **Stacked hero:** the giant word sits in its OWN clear band, fitted by JS to ~96% of
  viewport width (measure the rendered text; re-fit on resize and when fonts load) so
  **all 8 letters are always fully visible and never overlapped by the product**;
  the product slot sits BELOW the word; CTA must clear the floating dock (views carry
  bottom safe padding ≈ dock height + 16px).
- **No pin journey on mobile** — the product uses the DOM path (tilt/sway/glare/
  particles) in its slot instead.
- Dock: HOME / SHOP / LOOKS / ABOUT / BAG with icons + labels + bag badge.

### 7.8 Reduced motion
`prefers-reduced-motion`: no pin/scrub/journey, no particles, no autoplay, no sway —
static product in all three journey positions, content fully visible, all controls
working.

---

## 8. Acceptance gate (verify ALL before calling it done)

1. Breakpoints 1440 / 1024 / 768 / 390 (and reason about 360): no horizontal overflow,
   no unreachable controls.
2. **Mobile hero capture:** S-N-O-W-L-I-T-E all visible, unobstructed; product fully
   visible below; CTA above the dock.
3. **Click test:** mid-page, click Add / size chip / filter / swatch / FAQ / qty —
   `scrollY` unchanged after every click.
4. **Card test (mobile):** tap S/M/L/XL, heart, Add — each responds; Add increments
   the badge in header AND dock; quick-add overlay never rests half-open.
5. **Commerce test:** add 2 variants → Bag totals correct → free-shipping bar flips
   at $75 → Checkout totals follow delivery choice → invalid form blocked with
   messages → Place Order → confirmation shows `SL-2026-####` and bag is empty.
6. Search: type a colourway and a tag ("limited") — correct live results; quick-add
   from a result works.
7. Quick-view: switching variants crossfades image and updates name/price; chosen
   variant+size lands in Bag.
8. Rail: auto-plays and ping-pongs untouched; drag/swipe both directions; autoplay
   pauses on interaction and resumes.
9. Contrast ≥ 4.5:1 for body text everywhere incl. gradients; focus states visible;
   touch targets ≥ 44px.
10. Reduced-motion pass: static, complete, usable.
11. Console: zero errors. Images: zero broken. Fonts: display font ONLY on wordmark,
    giant word, highlight CTAs.

---

## 9. Build order for the agent

1. Tokens (colours/fonts) + gradient background system + header/dock shell + router
   with the central store.
2. Static views with real data from `products.json` (Home sections, Shop grid, Looks,
   About, Bag) — everything usable with zero animation.
3. Commerce: bag ops, quick-view, search, checkout + confirmation.
4. Motion layer: preloader, Lenis/GSAP reveals, hero WebGL journey + DOM fallback,
   cinematic stack, rail autoplay, marquees, motion footer.
5. Mobile stacked hero + dock spacing + reduced-motion path.
6. Run the full §8 gate; fix; re-run.

**Stack note:** the reference build is a single static HTML file (CDNs: Three.js,
GSAP + ScrollTrigger, Lenis, Google Fonts). A React/Next port is acceptable ONLY if
every behaviour above is preserved 1:1 — the behaviours, not the file shape, are
the spec.
