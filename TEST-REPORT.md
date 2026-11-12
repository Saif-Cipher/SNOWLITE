# SNOWLITE — Test & Quality Assurance Report
**Winter '26 — Drop 01 | Automated Verification Suite**

**Date of Execution:** 2026-11-12  
**Test Framework:** Node.js native test runner (`node:test`, `node:assert/strict`) + Playwright (`@playwright/test` / MS Edge channel)  
**Total Tests:** 3 test suites | 3 passed | 0 failed  
**Execution Duration:** ~9.6s  

---

## 1. Test Suite Results Overview

| Suite | Target | Environment | Status | Duration |
| :--- | :--- | :--- | :--- | :--- |
| **E2E Customer Journey** | Full browser workflow & mobile navigation | Headless Chromium / Edge | **PASS** | 8,478 ms |
| **Commerce & DB Integrity** | SQLite transaction rollback, idempotency, COD totals, and tracking token security | Node.js `:memory:` SQLite | **PASS** | 190 ms |
| **Launch Boundary** | Production checkout fail-closed gate | Node.js `:memory:` SQLite (`demo=false`) | **PASS** | 25 ms |

---

## 2. Test Details & Coverage

### 2.1 E2E Customer Journey (`tests/e2e.test.ts`)
* **Desktop Homepage Validation (1440 × 900):**
  * Verifies page title matches `SNOWLITE`.
  * Verifies `.hero-wordmark` displays the authoritative `Days One` typographic branding.
  * Verifies `.hero-snow-canvas` renders the multi-layer Artefakt snow particle system.
  * Verifies interactive 3D WebGL garment / studio container is rendered without blocking.
* **Catalog Browsing & Search (`/shop`):**
  * Verifies product cards populate with image, BDT pricing, category chips, and variant tags.
* **Product Detail Journey (`/product/aubergine-prime`):**
  * Verifies 3D view toggle and product details layout.
  * Verifies size selection (`aria-pressed="true"` for size `M`).
  * Verifies "Add to Bag" updates bag state and triggers toast notification.
* **Bag Inspection (`/bag`):**
  * Verifies persistent bag line items, quantities, and correct subtotal in BDT.
* **Bangladesh Cash-on-Delivery Checkout (`/checkout`):**
  * Fills customer name, Bangladeshi mobile (`01712345678`), division (`Dhaka`), district (`Dhaka`), thana (`Dhanmondi`), and street address.
  * Verifies shipping zone auto-calculation (Dhaka ৳80).
  * Submits order under idempotency protection.
* **Order Confirmation (`/order-confirmation/SN-...`):**
  * Verifies generated order reference (`SN-XXXXXXXXXXXX`).
  * Verifies payment status is correctly labeled `Unpaid — cash on delivery`.
  * Verifies customer delivery address and purchased line items.
  * Verifies shopping bag is automatically cleared in storage post-checkout.
* **Mobile Viewport Usability (390 × 844):**
  * Verifies mobile navigation dock (`.mobile-dock`) is fixed and visible.
  * Verifies direct thumb navigation to `/shop`.

### 2.2 Server Commerce & Database Integrity (`tests/server.test.ts`)
* **Bangladesh Administrative Geography:**
  * Asserts all 64 districts across 8 divisions are present in `districtsByDivision`.
* **Atomic Transactions & Replay Protection:**
  * Asserts repeated submission with identical idempotency key returns cached order without double-booking stock or creating duplicate records.
  * Asserts altering payload items with a reused idempotency key returns `409 Conflict`.
* **Stock Decrement & Rollback:**
  * Asserts successful order decrements variant inventory atomically.
  * Asserts over-ordering beyond remaining stock triggers transaction `ROLLBACK` and returns `409 Conflict`.
* **Timing-Safe Order Lookup:**
  * Asserts invalid tracking token returns `404 Not Found`.
  * Asserts valid 64-character token matches via `crypto.timingSafeEqual`.
* **Origin & CORS Defense:**
  * Blocks malformed or unauthorized origins with `403 Forbidden`.
  * Allows authorized local dev origins (`http://127.0.0.1:5173`).

### 2.3 Launch Boundary Failsafe
* Evaluates backend behavior when `NODE_ENV=production` (`demo=false`).
* Asserts `/api/orders` fails closed with `503 Service Unavailable`, preventing unauthorized or accidental live order submissions prior to final merchant sign-off.

---

## 3. TypeScript & Static Bundle Quality
* **Typecheck (`tsc --noEmit`):** 0 errors.
* **Vite Production Bundle (`vite build`):**
  * `dist/index.html`: 0.86 kB
  * `dist/assets/index.css`: 26.66 kB (clean scoped styles)
  * `dist/assets/index.js`: 303.95 kB (React 19 + router runtime)
  * `dist/assets/Garment.js`: 478.70 kB (code-split lazy loaded Three.js bundle)
