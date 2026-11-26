# Handover — mdwarish.com, version 2

Prepared on 24 November 2026. Read with `README.md` (setup and deployment) and `docs/PORTFOLIO_RESEARCH.md` (design research and the V2 notes).

Version 2 keeps v1's architecture, routes, contact backend, SEO, theme and motion logic, and tests. What changed is the visual design, the copy, how the Limra project is presented, and a fix for the navbar animation bug.

## 1. Status at a glance

| Area | Status | Evidence |
|---|---|---|
| Pages, case studies, content | Complete | 16 routes rendered and checked in a browser |
| Theme toggle, animation switch | Complete | Browser tests: both directions, persistence across reload, OS preference, explicit choice overriding the OS |
| Navbar animation bug | **Fixed at the root cause** | 3 regression tests: repeated nav clicks, theme toggles, mobile menu, back/forward |
| Responsive layout | Complete | No overflow and no text under 11.5 px at 1440/1280/1024/768/390/360 px on every route |
| Contact form (UI and API logic) | Unchanged from v1, complete | Unit tests plus 5 browser form tests with the API intercepted |
| MongoDB, Google Sheets, Gmail adapters | Implemented, **not production-verified** | Tested with a mocked `fetch` and a fake mail transport; no live credentials used |
| `npm install`, `next build`, ESLint, lockfile | **Not run** | No npm registry access in the build environment (see section 11) |

## 2. V2 changes

1. **New palette, "Ink & Signal".** Near-black ink on off-white paper, with one vermilion accent. The old cream, bronze and gold palette is gone. Details in section 4.
2. **Grid backgrounds removed everywhere.** The page-wide graph paper and the dotted grid inside the hero diagram are both gone. They're replaced by one quiet line drawing per page (`src/components/svg/PageMark.tsx`):

   | Page | Line drawing |
   |---|---|
   | Home | A long request-path curve |
   | Work and case studies | Contour rings |
   | Services | A stepped, circuit-style line |
   | About | One oversized arc |
   | Contact | Lines converging on a single point |
   | Experience, Resume | None — clean space |

   Each draws once. The vermilion node in the drawing is the only colour.
3. **SVG system kept and improved.**
   - **Hero diagram:** smoother easing, numbered step labels, the main path in ink with a vermilion signal along it, and a dedicated phone layout instead of hiding nodes.
   - **New process visual** (`ProcessSteps`): steps light up in sequence as they scroll in, and the latest step is highlighted. On desktop, hovering moves the highlight. The connector grows using `transform` only, so nothing shifts on the page (a test confirms no layout shift).
4. **More editorial layout.**
   - Outlined oversized section numbers, an asymmetric hero and section heads.
   - Projects shown in three different ways: one large featured block (Limra CRM), alternating image/text rows, and an index with thumbnails. No grid of identical cards.
   - Services shown as a numbered two-column list on the homepage, and as rows on /services.
5. **Navbar bug fixed.** See section 6.
6. **Copy rewritten.**
   - Short first-person sentences throughout, with less text on every page.
   - The homepage is cut to the essentials: who I am, what I build, four projects, services, how I work, contact.
   - A test fails the build if buzzwords appear (passionate, seamless, robust, leveraging, cutting-edge, crafting, world-class…).
7. **Limra presented as a full CRM.**
   - Now titled "Limra CRM" at `/projects/limra-crm`. The old slugs redirect there.
   - The case study has an 18-module breakdown verified against the code (section 7).
   - "Limra Hearing Clinic CRM" no longer appears anywhere in the source (a test checks this).
8. **Typography pass.**
   - Body text is 16–17 px with 1.7 line height, max 66 characters per line.
   - Headings use balanced wrapping with tighter tracking at display sizes.
   - One spacing scale (`--s-1` … `--s-7`, `--section`), one container width, one button size system.

## 3. Page structure

| Route | Contents |
|---|---|
| `/` | Hero + architecture diagram → Limra CRM feature + 3 project rows → services list → process steps → CTA |
| `/about` | Short intro + portrait → four habits → "for teams / for clients" → tools |
| `/projects` | Limra CRM feature → filterable index with thumbnails |
| `/projects/[slug]` | 8 case studies: brief → (modules) → what I built → architecture → stack → screens → problems solved → evidence |
| `/services` | 8 service rows (includes / good fit if / you get) → process steps |
| `/experience` | Roles → Limra CRM + education → skills |
| `/contact` | Intent-based form + direct links |
| `/resume` | Printable resume |
| 404 | |

The API routes, sitemap, robots, icons and Open Graph images are unchanged from v1.

## 4. Palette (hex values and usage)

| Token | Light | Dark | Used for | Contrast |
|---|---|---|---|---|
| `--paper` | `#F4F3EF` | `#0F0F0E` | Page background | — |
| `--surface` | `#FBFAF7` | `#171716` | Diagram nodes, form panel, tiles | — |
| `--raised` | `#FFFFFF` | `#1E1E1D` | Inputs, dark-mode CTA band | — |
| `--ink` | `#131313` | `#F1EFEA` | Headings, body emphasis, primary buttons | 16.7:1 / 16.7:1 |
| `--ink-2` | `#4E4C48` | `#B4B0A8` | Body copy | 7.7:1 / 8.9:1 |
| `--ink-3` | `#6E6B66` | `#8F8B84` | Labels, metadata | 4.8:1 / 5.7:1 |
| `--accent` (vermilion) | `#C9361A` | `#FF6B4A` | Links, key CTAs, current nav dot, SVG highlights | 4.7:1 / 6.8:1 |
| `--on-accent` | `#FFFFFF` | `#0F0F0E` | Text on accent buttons | 5.2:1 / 6.8:1 |
| `--field-border` | `#8A877F` | `#6E6B65` | Form control borders (≥3:1 for UI) | 3.6:1 / 3.1:1 |
| `--error` | `#B02A14` | `#FF8A70` | Form errors | 6.3:1 / 7.8:1 |
| `--line`, `--line-strong`, `--deco` | ink at 12% / 24% / 18% | paper-ink at 10% / 22% / 13% | Rules, outlines, background linework | Decorative |

**Why vermilion.** It's warm, rare among developer portfolios, and far from the blue default. Used on a single element at a time, it reads as a signal (where to click, what matters) rather than decoration. The accent in the light theme was darkened from `#D23A1A` (4.3:1) to `#C9361A` to pass AA for text.

**Dark mode is its own design.** Warm graphite rather than pure black, softer ink, and a brighter vermilion. The CTA band changes from an ink block to a raised panel with a vermilion top rule. It is not the light theme inverted.

Brand icons keep their real colours. Four pale ones (React, JavaScript, Tailwind, Spring Boot) sit on a small dark chip in light mode so they stay above 3:1 contrast.

## 5. Theme and motion system

- An inline script in `<head>` (`src/lib/preferences.ts`) sets `data-theme` and `data-motion` before first paint. It uses the visitor's saved choice first, then the OS setting.
- **Theme:** button in the header.
- **Animations:** labelled switch in the footer ("Animations on/off", `aria-pressed`).
- `MotionRuntime` (always mounted) follows live OS changes to `prefers-reduced-motion`, but only when the visitor hasn't made an explicit choice.
- Decorative CSS animation only runs under `html[data-motion="full"]`. Under `reduce`, every animation and transition is cut to about 0 ms.

## 6. The navbar animation bug — root cause and fix

**Symptom.** Clicking "something in the navbar" turned animations on, and clicking it again turned them off.

**Root cause.**
- The only code that ever changes the motion preference is the motion toggle's click handler (`applyMotion`). A grep of the code base confirms nothing else writes it: not navigation, not routing, not remounts.
- In v1 that toggle sat **in the navbar**, as an unlabelled icon button between the nav links and the theme button.
- Its icon was three horizontal strokes, which looks like a menu button.
- So each click on it flipped `data-motion` between `full` and `reduce`, and saved the choice to `localStorage`. That's why the effect persisted across pages.

**Fix (not a patch).**
- The control was removed from the header entirely.
- It now lives in the footer as a labelled switch reading "Animations on/off", with a switch-style track.
- The OS-preference listener moved out of the toggle into `MotionRuntime`, so preference logic no longer depends on where a button is rendered.
- The navbar now only navigates.

**Regression tests** (`tests/e2e/site.e2e.ts` → "navbar never changes the animation setting"):
1. No motion control inside `<header>`; exactly one, labelled, inside `<footer>`.
2. Three rounds of clicking every nav link, toggling the theme twice and returning home. After every click `data-motion` stays `full`, and back on the homepage the hero `rise` and SVG `draw` animations are running. Then back/forward, and nothing was written to storage.
3. Opening and closing the mobile menu 6 times, then navigating through it, never changes the setting.

## 7. Limra CRM — verified modules (18)

Checked against `InventoryPro-Backend/src/modules/*`, `prisma/schema.prisma`, `src/app.js` and `InventoryPro-Frontend/src/app/dashboard/*`:

| # | Module | Evidence in code |
|---|---|---|
| 1 | Dashboard | Dashboard page KPIs: products, low stock, monthly revenue, active dealers, profit, stock value |
| 2 | Sales | `/dashboard/sales`, RecordSale / DeleteSale |
| 3 | Invoices & billing | `invoices` module, GST per item, customer GSTIN, `InvoiceCounter` upsert, labels on invoices |
| 4 | Products & categories | `products` (SKU, HSN, GST rate, MRP, images via upload middleware), `categories` |
| 5 | Inventory & stock | `stock` routes: in / out / current / history / transfer / analytics (monthly, yearly) |
| 6 | Serial numbers | `serial-numbers` module, `SerialNumber` model |
| 7 | Stock transfers | `StockTransfer` + items, `/dashboard/stock-transfer` |
| 8 | Dealers | `dealers`: stock summary, serials, unbilled stock, returns, historical stock, invoices |
| 9 | Reports | `reports`: dashboard, sales, purchase, stock valuation, all branches, GST, low stock, `.xlsx` download |
| 10 | Expenses | `expenses` (category, payment method), feeds profit |
| 11 | Branches | `branches`, `isMainBranch` |
| 12 | Users, roles & permissions | `Role` enum (3 roles), `Permission` (view/create/edit/delete × 16 modules) |
| 13 | Attendance | `attendance`, shifts, `isLate`, PRESENT / HALF_DAY / ABSENT / LEAVE, admin page |
| 14 | Tasks | `tasks`, TODO / IN_PROGRESS / DONE, priorities, comments, activity |
| 15 | Meetings | `meetings`, participants, reminder cron, Resend email, WhatsApp (feature flag) |
| 16 | Notifications | `notifications` + SSE manager |
| 17 | Bulk upload | `bulk-upload`: PRODUCTS / STOCK_IN / DEALERS / SERIAL_NUMBERS, `BulkUploadLog` |
| 18 | Settings & account | `settings` (invoice, appearance, security), `auth` (login, refresh, logout, change password) |

There is no separate "customers" module in the code: customer details are stored on sales and invoices. So none is listed, and a unit test enforces that.

## 8. Projects shown

1. Limra CRM
2. Futurex Group website
3. Odisha Mining & Infrastructure Expo
4. Nepal Wood International Expo
5. Nepal Electric, Power & Lights Expo
6. PROPACK Odisha Expo
7. Nepal Buildcon International Expo
8. Futurex Studio

Projects 1–4 appear on the homepage. Kenya Buildcon and India Solar Show are still excluded because their live pages showed errors on 24 Nov 2026 (placeholder "0+" counters and a mislabelled report on Kenya Buildcon; conflicting edition numbers and dates on India Solar Show), and Fusion POS stays removed.

## 9. Content sources

These are unchanged from v1:
- **The brief:** name, links, roles.
- **The old portfolio repo:** education, portrait.
- **The previous Next.js site:** the MW logo.
- **The CRM source code** (re-read 24 Nov 2026): Limra facts.
- **The live sites** (rendered 24 Nov 2026): project facts and screenshots.

No numbers, testimonials or dates were invented.

## 10. Please confirm or add (owner action)

1. **Employment dates:** add them in `src/content/experience.ts` (both roles). They then appear on `/experience` and `/resume`.
2. **NodalXPoint details:** one line for now.
3. **Your exact scope on each exhibition site:** edit `contribution` in `src/content/projects.ts` if parts were built by others.
4. **Limra client line:** reads "Limra — hearing-care business with multiple branches". Adjust if the client prefers different wording.
5. **WhatsApp reminders:** the CRM copy says they're "built in and can be switched on". If they are switched on in production, say so.
6. **Resume PDF:** add one once dates are in place (`/resume` → "Print or save as PDF").

## 11. Verification

**Performed here:**

| Check | Result |
|---|---|
| Type-check (`tsc --noEmit`, strict, all source and tests) | 0 errors. Next.js, React, MongoDB and Nodemailer types weren't installable, so minimal stand-ins were used; Playwright and Node types are real |
| Unit tests | **53/53** passing (adds the Limra-wording, module-list and expanded buzzword tests) |
| Browser tests | **33/33** passing in Chromium (adds 3 navbar-bug regressions and 2 process-visual tests) |
| Visual and responsive audit | 16 routes × 6 widths: no overflow, no undersized text, no console or hydration errors. Screenshots reviewed in light and dark, desktop and mobile; defects fixed (eyebrow wrap, phone diagram connector, linework overflow, ring placement) |
| Performance (Lighthouse-equivalent lab metrics) | See the table below |

The browser tests ran against a static preview of the real components, server-rendered with React 19 and hydrated in the browser, with small stand-ins for `next/link`, `next/image`, `next/font` and `next/navigation`. In that preview, links do full page loads. The same test file runs unchanged against `next start`, where links navigate client-side; run it there to also cover that path.

Performance was measured with Chromium on mobile emulation: 4× CPU slowdown, ~1.6 Mbps, 150 ms latency. Lighthouse itself was not available.

| Page | FCP | LCP | CLS |
|---|---|---|---|
| Home | 1.13 s | 1.83 s | 0.002 |
| Work | 1.03 s | 1.73 s | 0.004 |
| Limra CRM case study | 0.98 s | 1.68 s | 0 |
| Contact | 1.03 s | 1.72 s | 0.001 |

The preview serves files uncompressed and ships one unsplit ≈400 KB script per page, so a real Next.js build should be lighter.

**Not performed:**
- `npm install` and the lockfile
- `next build`
- ESLint
- Live MongoDB, Sheets or Gmail calls

**First commands after unzipping:**

```bash
npm install && npm run typecheck && npm run lint && npm test && npm run build
npm run start   # then, in a second terminal:
BASE_URL=http://localhost:3000 npm run test:e2e
```

## 12. Database flow, SEO, limitations

All unchanged from v1:
- **Contact pipeline:** MongoDB first, then Sheets and email after the response, with a retry cron.
- **Structured data:** Person, WebSite, ProfilePage, BreadcrumbList, ItemList, CreativeWork, Service.
- **Sitemap:** 15 URLs; the case-study URL is now `/projects/limra-crm`.
- **Known limitations:**
  - The in-memory rate limiter is per server process.
  - There's no Content-Security-Policy header yet; the inline scripts would need nonces.
  - Screenshots are 800 px wide; `npm run screenshots` re-captures them.

**Why there's no Framer Motion.** The brief asked for Motion/Framer for interactions. It couldn't be installed offline, and every interaction on this site — hover, menu, switch, filter, form states — is covered by CSS transitions with no JavaScript cost. If you want Framer Motion later, it's a single `npm install`.
