# SNOWLITE — Reference Audit & Component Mapping
**Winter '26 — Drop 01 | Reference Study & Architectural Evidence**

This document records the visual, behavioral, and responsive audit of the 14 design references specified in the master orchestration brief. All references were inspected using automated browser capture and local evaluation (recorded in `research/reference-results.json` and associated desktop/mobile captures).

---

## 1. Reference Summary Matrix

| ID | Reference Name | Source URL | SNOWLITE Assignment | Implementation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Artefakt** | getlayers.ai/templates?layer=artefakt | Background & atmospheric lighting | Interactive radial gradients (`#DFEDFF` to `#FBFCFE` with `#3A1F2B` glows) + 3-layer canvas snow particle system |
| **02** | **Night Gallery 002** | getlayers.ai/3d-scenes?layer=night-gallery-002 | Homepage 3D hero scene | Pinned WebGL scene, three-point studio lighting (key, hemisphere, rim), pointer-driven garment tilt and inspection controls |
| **03** | **Product Rail Gallery** | 21st.dev/@dhxwhy/components/product-rail-gallery | Discovery collection rail | Auto-sliding horizontal rail with snap scroll, drag capture, card lift, and instant quick-look navigation |
| **04** | **Border Beam** | 21st.dev/@hyperiux/components/border-beam | Highlighted primary CTAs | Animated conic-gradient travelling border beam along the perimeter of primary buttons and badges |
| **05** | **Features Card** | 21st.dev/@mokshithgujjeti/components/features-card | Product benefits & fabric bento | Bento grid with spotlight cursor hover, macro fabric zoom, and technical winterwear specs (480 GSM, double-lined hood) |
| **06** | **Beam Wordmark Footer** | 21st.dev/@kedhareswer/components/beam-wordmark-footer | Global website footer | Giant `Days One` wordmark with gradient beam shine that fills as the user scrolls into the viewport |
| **07** | **Gallery Animation** | 21st.dev/@n38693842/components/gallery-animation | Looks & Lookbook storytelling | Parallax zoom grid and staggered image cards linking directly to catalogue products |
| **08** | **Perspective Tunnel Hero** | 21st.dev/@daiwiikharihar/components/perspective-tunnel-hero | Editorial scroll-driven spatial depth | Layered concentric orbital rings and depth scale in hero and brand story |
| **09** | **Apple Hello Effect** | 21st.dev/@ncdai/components/apple-hello-effect | Heading entrances | Staggered un-blurring and letter lift for key editorial headlines and section intros |
| **10** | **Eclipse Button** | 21st.dev/@iamsatish4564/components/eclipse-button | Major interactive CTAs | Radial expanding eclipse aura underneath button text with smooth pointer tracking |
| **11** | **Magnetic Cursor** | 21st.dev/@jahed/components/magnetic-cursor | Desktop pointer interaction | Inertial smoothing cursor ring snapping magnetically to buttons and clickable cards; disabled on touch |
| **12** | **Neural Access Login** | 21st.dev/@shivendra9795kumar/components/neural-access-login | Form presentation & feedback | High-contrast floating input styling with clear validation feedback, order tracking form, and contact form |
| **13** | **Sign In 3** | 21st.dev/@diarmuradi/components/sign-in-3 | Authentication views | Clean tabbed layout for login/signup with guest checkout as the primary, unhindered conversion path |
| **14** | **Slide Tabs** | 21st.dev/@minhxthanh/components/slide-tabs | Category & filter navigation | Sliding pill indicator that smoothly tracks the active tab across shop categories and product views |

---

## 2. Detailed Reference Analysis & Observations

### 2.1 Artefakt (Background Atmosphere)
- **Observations:** Atmospheric lighting that shifts subtly under pointer movement without distraction. Depth is achieved through soft radial vignettes and layered particles.
- **SNOWLITE Adaptation:** Custom CSS radial gradients with Deep Aubergine (`#3A1F2B`) and Cloudy Blue (`#DFEDFF`) hues, paired with a lightweight HTML5 canvas rendering falling snow particles in 3 depth planes. Scaled down on mobile and paused on `prefers-reduced-motion`.

### 2.2 Night Gallery 002 (3D Featured Product Scene)
- **Observations:** Dramatic three-point studio lighting against dark and neutral depths, creating high-fashion silhouettes and tactile texture definition.
- **SNOWLITE Adaptation:** Three.js scene featuring the oversized hoodie. Hemisphere ambient light (`#f4f8ff` to `#655661`), a crisp directional key light, and an ice-blue rim light (`#b9d7ff`). Smooth drag-to-rotate interaction, front/back orientation shortcuts, and touch controls.

### 2.3 Product Rail Gallery
- **Observations:** Horizontal scrolling rail with peek effect on adjacent items, smooth snapping, and hover lift.
- **SNOWLITE Adaptation:** CSS snap-scroll rail showing the Winter Edit hoodies. Cards feature hover zoom (`scale(1.045)`), concept badges, price tags in BDT, and instant click-through to detail pages.

### 2.4 Border Beam
- **Observations:** A bright light pulse travels continuously along a component’s border path without breaking layout boundaries.
- **SNOWLITE Adaptation:** Implemented using CSS `@keyframes` with a travelling conic-gradient border ring on `.button.beam` and `.highlight-badge`.

### 2.5 Features Card (Fabric & Performance Bento)
- **Observations:** Structured bento grid with individual cards showcasing macro materials, technical iconography, and concise specs.
- **SNOWLITE Adaptation:** 3-column desktop bento (1-column on mobile) displaying "480 GSM Brushed Fleece", "Room to Move (Relaxed Cut)", and "A Little Closer to Home (Designed for Bangladesh)" with macro fabric texture references.

### 2.6 Beam Wordmark Footer
- **Observations:** Monolithic typography anchored at the bottom edge with a luminous beam gradient sweep across the letterforms.
- **SNOWLITE Adaptation:** Giant `Days One` SNOWLITE wordmark spanning the viewport with an animated light beam background clip. Full links to Shop, Looks, Story, Contact, Track Order, and Customer Policies.

### 2.7 Gallery Animation (Looks & Outfits)
- **Observations:** Asymmetric editorial layout with image cards that scale softly on hover and carry bottom typography overlays.
- **SNOWLITE Adaptation:** 2-column staggered grid on `/looks` displaying Winter '26 campaign imagery with product direct links.

### 2.8 Perspective Tunnel Hero
- **Observations:** Concentric geometric rings creating spatial depth toward a central focal subject.
- **SNOWLITE Adaptation:** Dual elliptical orbit rings surrounding the 3D hoodie in the hero scene, framing the garment without visual clutter.

### 2.9 Apple Hello Effect
- **Observations:** Fluid cursive or sans entrance where letters smoothly reveal from bottom with slight blur dissipation.
- **SNOWLITE Adaptation:** CSS keyframe entrance animation (`helloFade`) applied to hero headers and editorial titles.

### 2.10 Eclipse Button
- **Observations:** Radial light effect expanding from the button’s origin upon hover, giving the appearance of an eclipse corona.
- **SNOWLITE Adaptation:** `.button.eclipse` with a pseudo-element glow that flares on hover and scales down smoothly on `:active`.

### 2.11 Magnetic Cursor
- **Observations:** Custom circular cursor following the pointer with lerp easing, expanding when hovering interactive targets.
- **SNOWLITE Adaptation:** Desktop-only `MagneticCursor` component rendered conditionally when `window.matchMedia('(pointer: fine)')` is true. Never blocks pointer events (`pointer-events: none`).

### 2.12 Neural Access Login & Sign In 3
- **Observations:** Minimal, sharp form inputs with floating labels, clear focus states, and instant validation indicators.
- **SNOWLITE Adaptation:** Integrated into the checkout delivery form, contact page, and `/track-order` lookup. Guest checkout remains first-class.

### 2.13 Slide Tabs
- **Observations:** Pill-shaped background element that smoothly slides to highlight the active tab without full layout reflow.
- **SNOWLITE Adaptation:** Custom interactive category selector on `/shop` and view switcher (`Product view` vs `Explore in 3D`) on product details.

---

## 3. Compliance and Access Verification
- **Audit Source:** Local Playwright crawl results in `research/reference-results.json` and captured assets in `research/`.
- **Licensing & Safety:** No third-party proprietary source code or assets were extracted or downloaded. All UI components are engineered from scratch using clean-room specifications matching observable behaviors.
