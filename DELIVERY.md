# SNOWLITE — Complete Delivery & Launch Assessment
**Winter '26 — Drop 01 | Production Fashion-Commerce Platform for Bangladesh**

---

## 1. Executive Summary

SNOWLITE has been engineered as a high-fidelity, 3D-interactive, fully responsive winterwear commerce platform specifically localized for the Bangladesh market. It implements the complete customer purchasing loop—from collection discovery and interactive 3D WebGL garment inspection, to guest checkout with nationwide district shipping calculations and Cash on Delivery (COD) order management with secure tracking tokens.

---

## 2. Implemented Routes & Capabilities

| Route | View Name | Key Features & Integrated References |
| :--- | :--- | :--- |
| `/` | **Home** | Artefakt 3-layer snow particle canvas, Night Gallery 002 WebGL 3D hoodie scene, Border Beam primary CTA, Features Card bento (480 GSM fleece specs), Winter Edit snap rail, and Beam Wordmark Footer |
| `/shop` | **Shop / Catalog** | Category tabs with Slide Tabs styling, instant search query, size/color filters, price range slider, in-stock toggle, sorting, and Quick-View modal |
| `/product/:slug` | **Product Details** | High-res ghost mannequin studio view vs. interactive 3D WebGL model switcher, size selector, quantity stepper, expandable Size & Fit / Delivery / Care accordions, and related recommendations |
| `/looks` | **Lookbook** | Gallery Animation editorial cards showcasing Winter '26 garments in lifestyle and mountain settings, directly linked to catalog items |
| `/about` | **Brand Story** | Narrative intro ("Light as snow, warm as home"), fabric sculpture visual, and collection identity |
| `/contact` | **Contact & Support** | Neural Access Login styled support form storing inquiries directly into SQLite |
| `/bag` | **Shopping Bag** | Persisted cart in `localStorage`, quantity increment/decrement, item removal, and live BDT subtotal |
| `/checkout` | **Guest Checkout** | Division & all 64 districts dropdowns, mobile regex validation (`01XXXXXXXXX`), shipping rate engine (Dhaka ৳80 / Outside Dhaka ৳150), and idempotent COD submission |
| `/order-confirmation/:ref` | **Order Confirmation** | Invoice breakdown, demo order status, unpaid COD status, and private tracking link |
| `/track-order` | **Order Tracking** | Secure order lookup using reference + 64-char private access token (timing-safe hash verification) |
| `/account`, `/sign-in`, `/sign-up`| **Account Access** | Sign In 3 styled authentication placeholder preserving guest checkout priority |
| `/policies/:policy` | **Customer Policies** | Transparent policies for Shipping, Returns & Exchanges, Privacy, and Terms |

---

## 3. Architecture & Operational Blueprint

### Client-Side Architecture
- **React 19 + React Router 7 + TypeScript:** Componentized, type-safe single-page application.
- **Three.js (v0.180):** Procedural 3D hoodie model (torso, sleeves, ribbed cuffs/hem, hood, kangaroo pocket, drawstrings, hemisphere & directional light setup, pointer drag interaction, and `prefers-reduced-motion` safety).
- **Design Tokens:** Deep Aubergine (`#3A1F2B`), Cloudy Blue (`#DFEDFF`), Wet Cement (`#8E8E8E`), and Dark Neutral (`#5F5F5F`).
- **Typography:** `Days One` (wordmark/display), `Archivo` (headings/UI), and `Playfair Display Italic` (editorial accents).
- **Responsive Navigation:** Floating bottom navigation dock (`.mobile-dock`) with live badge on viewports ≤768px, and desktop top navigation with instant search overlay.

### Server-Side Architecture
- **Express 5 + `node:sqlite` (`DatabaseSync`):** Fast, built-in SQLite in WAL mode.
- **Atomic Transactions:** Order placement executes inside a `BEGIN IMMEDIATE` transaction ensuring atomic stock decrement and rollback on stock exhaustion.
- **Deduplication:** SHA-256 idempotency key prevents duplicate orders on network retries.
- **Timing-Safe Authentication:** Tracking tokens verified with `crypto.timingSafeEqual`.
- **Hybrid Serving:** In production, Express automatically serves static assets from `dist/` with single-page application HTML fallback. In development, Vite proxies `/api` to port 3001.

---

## 4. Local Setup & Execution Guide

### Prerequisites
- Node.js 22.x or higher (required for native `node:sqlite`).

### Installation & Run Commands
```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite (Unit tests + Playwright browser E2E)
npm test

# 3. Build production bundle
npm run build

# 4. Start production server (serves frontend + API on port 3001)
npm run server

# 5. Start development environment (Vite HMR on 5173 + Express API on 3001)
# Terminal 1:
npm run server
# Terminal 2:
npm run dev
```

---

## 5. Launch Dependencies & Production Boundary

The platform is fully engineered and verified in **Demo Mode**. To transition to live commercial operations, the merchant must complete the following configuration checklist:

1. **Merchant Product & Price Sign-Off:**
   - Formalize retail BDT prices and SKU identifiers in `shared/catalog.ts`.
   - Update factory inventory counts for each size (S, M, L, XL).
2. **Payment Gateway Integration:**
   - Connect Bangladesh payment gateways (bKash Checkout API, Nagad Gateway, or SSLCommerz) alongside Cash on Delivery.
3. **Logistics & Courier API Integration:**
   - Hook up automated order consignment creation with local courier APIs (e.g., Steadfast Courier, Pathao Courier, or RedX).
4. **Legal & Policy Finalization:**
   - Publish official company registration details, VAT registration numbers, return window policies, and merchant contact hotlines.
5. **Production Deployment & Security:**
   - Set environment variable `NODE_ENV=production`.
   - Configure a persistent volume mount for `.data/snowlite.sqlite` (or configure PostgreSQL/MySQL).
   - Set up reverse-proxy TLS termination (Nginx, Caddy, or Cloudflare).
