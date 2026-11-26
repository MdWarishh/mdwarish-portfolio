# Portfolio Research — mdwarish.com

Research carried out on 24 November 2026, before any design or code was written.

## How the research was done (read this first)

| Method | Used for | Limits |
|---|---|---|
| Live page fetches of each reference URL (markup + text extraction) | Structure, navigation, section order, copy tone, CTAs, metadata | Text and markup only |
| **Rendered inspection in a real browser** (Claude desktop app's built-in browser) | Screenshots, computed fonts and colours, loaded libraries, running animations, page weight | Screenshots are 800 px wide (pane limit) |
| Awwwards galleries (Portfolio Honors, Developer Award, transitions, parallax, TypeScript filters) | What currently wins in the portfolio category, and which fonts/colours award sites use | Gallery pages list winners; individual sites were not opened one by one |
| Working knowledge of the reference sites | Context for interpreting what was observed | Used only to frame the findings; every concrete value below was observed on 24 Nov 2026 |
| Inspection of Md Warish's own code and live projects | Project facts, stack, integrations (see `HANDOVER.md` → "Content sources") | Real screenshots of each live project were captured in the same browser (1280×800 viewport) and are used on the site |

**Screenshots:** stored in `docs/research-screenshots/`. Values in the "Measured" lines below were read from the live pages with `getComputedStyle`, `document.getAnimations()` and the Performance API on 24 Nov 2026. Emil Kowalski's and Adham Dannaway's screenshots failed to save, so only their measured values are recorded.

## 1. References inspected

All eight URLs from the brief resolved and were inspected. No substitutes were needed.

| # | Site | URL | Status |
|---|---|---|---|
| 1 | Brittany Chiang | https://brittanychiang.com/ | Live — fetched |
| 2 | Josh W. Comeau | https://www.joshwcomeau.com/ | Live — fetched |
| 3 | Dennis Snellenberg | https://www.dennissnellenberg.com/ | Live — fetched |
| 4 | Bruno Simon | https://bruno-simon.com/ | Live — fetched |
| 5 | Rauno Freiberg | https://rauno.me/ | Live — fetched |
| 6 | Olivier Larose | https://www.olivierlarose.com/ | Live — fetched |
| 7 | Emil Kowalski | https://emilkowal.ski/ | Live — fetched |
| 8 | Adham Dannaway | https://www.adhamdannaway.com/ | Live — fetched |

Award galleries reviewed: Awwwards "Portfolio" winners category, Developer Award / Site of the Day listings filtered by transitions, parallax and TypeScript (2025–2026 entries such as MERSI, Adcker, Elliott Mangham, Olha Lazarieva, Pacôme Pertant, and Bruno Simon's 2026 Site of the Month). CSS Design Awards search returned no usable listing pages in this session, so it is not cited.

## 2. Observations per reference

### Brittany Chiang — the recruiter-friendly benchmark
- **Verified today:** one long page, ordered About → Experience → Projects → Writing. Experience is a numbered list: date range, linked "title · company" heading, one paragraph, then technology tags. Projects pair a screenshot with a short description and tags; a link leads to a full archive. A "View Full Résumé" link is the only CTA. Footer credits name Inter as the single typeface, and Next.js + Tailwind. Theme colour `#0f172a` (slate). Skip-to-content link present.
- **Seen in the browser** (`01-brittanychiang.jpg`): two-column layout — name, tagline and a section nav with growing hairline indicators fixed on the left; About/Experience scroll on the right.
- **Measured:** Inter via `next/font`; H1 48 px / 700 / −1.2 px tracking, body 16/26 px; background `rgb(15,23,42)`, body text `rgb(148,163,184)`; 29 inline SVGs (icons only); stylesheet contains a `prefers-reduced-motion` rule.
- **Lesson:** recruiters scan dates, company, title and stack in that order. A dense but calm experience list beats a decorative timeline.

### Josh W. Comeau — personality inside a strict system
- **Verified today:** clear category navigation, article cards with title/subtitle/blurb, a newsletter block, a footer grouped by purpose. A dark-mode control and a "Disable sounds" control are first-class UI. Separate light/dark portrait assets ("josh-happy-dark" / "josh-happy-light") show both themes were art-directed, not inverted.
- **Seen in the browser** (`02-joshwcomeau.jpg`): dark navy with a playful 3D mascot and rainbow arc; header icons for search, sound, theme and RSS.
- **Measured:** custom face Wotfard for body and headings; 54 inline SVGs; 5 running animations on load; `prefers-reduced-motion` rules present.
- **Lesson:** give visitors explicit control over sensory features (sound/motion), and design each theme on purpose.

### Dennis Snellenberg — the conversion-oriented creative developer
- **Verified today:** four-item navigation (Home, Work, About, Contact); hero is the name plus a one-line value proposition ("Helping brands to stand out in the digital era"); work is a list of names with a discipline label ("Design & Development"); a "Let's work together" block with "Get in touch" closes every page; location note in the footer.
- **Seen in the browser** (`03-dennissnellenberg-loader.jpg`): a full-screen loader cycling greetings ("Hello", "Hallo"…) that lifts away with a curved edge to reveal a portrait hero.
- **Measured:** custom "Dennis Sans" (H1 ≈154 px / 450 weight); background `rgb(28,29,32)`; scripts loaded: jQuery 3.5.1, GSAP + ScrollTrigger, Barba core 2.10.3, Locomotive Scroll (`has-scroll-smooth` on `<html>`).
- **Lesson:** the *structure* (short nav, single CTA repeated, work list with discipline labels) does the converting. The heavy motion layer is optional — and it is what makes such sites slow on mid-range phones.

### Bruno Simon — the outlier
- **Verified today:** a Three.js + Rapier physics driving world, WebGL/WebGPU via TSL, with a Quality toggle and a Renderer choice; no accessibility statement and no reduced-motion setting were visible. Won Awwwards Site of the Month (Jan 2026).
- **Measured:** one `<canvas>`, 114 network resources and ≈7.1 MB transferred; the browser's screenshot timed out because the page had not finished rendering within 5 s.
- **Lesson:** memorable, but it is a product in itself. For a freelancer whose buyers are business owners and hiring managers, this is exactly what the brief says to avoid. What *is* worth taking: user-facing performance controls (his Quality toggle) — mirrored here as the Motion toggle.

### Rauno Freiberg — restraint as craft
- **Verified today:** a large name heading, a single row of text links (Craft, Projects, Field Notes…), a short manifesto, an email that copies on click ("Copied" feedback).
- **Seen in the browser** (`05-rauno.jpg`): a framed card on light grey, a staggered multi-line statement set in a grotesk, with a large saturated yellow circle and a small crosshair mark as the only decoration.
- **Measured:** custom face "X" at H1 32 px / 500; background `rgb(237,237,237)`, text black; 3 SVGs.
- **Lesson:** small, perfectly-tuned details (copy-to-clipboard feedback, tight spacing rhythm) signal seniority more than effects do.

### Olivier Larose — the index layout
- **Seen in the browser** (`06-olivierlarose.jpg`): a centred, all-caps serif title block on near-black with ornamental glyphs; small labels in the margins.
- **Measured:** headings in **PP Editorial New** (serif), body in **Neue Montreal** (grotesk); Lenis smooth-scroll active; 0 SVGs; 0 running animations at rest.
- **Verified today:** H1 name, tagline with decorative glyphs ("Independent Design ☼ Engineer"), small editorial labels ("Folio©2026", "Edition026"), then a "Selected projects" **index** with Project / Category / Client / Year columns, each entry with a short prose description. Theme colour `#121212`.
- **Lesson:** an index table is an honest, scannable way to present client work when screenshots are not the selling point. Editorial micro-labels add a print-magazine character for almost no weight.

### Emil Kowalski — writing and components as proof
- **Verified today:** name + "Design Engineer", a short "Today" status block, Projects and Writing as lists of linked titles with one-line descriptions; very few words.
- **Measured:** a single custom sans ("Sans") at 16/24 px on `rgb(253,253,252)` with black text; one SVG on the page. Visible motion is limited to his components (Sonner, Vaul) rather than the page itself.
- **Lesson:** motion should explain, not decorate. Durations under ~300 ms for UI feedback; longer only for one-time entrances.

### Adham Dannaway — split identity hero
- **Verified today:** hero splits into two role panels, "designer" and "<coder>" (code-style brackets as a typographic cue), with a photographic portrait between them; "Some of my latest work" list typed by category; no testimonial wall.
- **Measured:** Proxima Nova (light for body, bold for headings at 72 px), text `rgb(51,51,51)`; no inline SVG.
- **Lesson:** a hero can state *two audiences* at once. Here: clients (build my product) and employers (hire me full-time).

## 3. Cross-cutting findings

### Design
- Winning portfolios have **one strong idea** each (index table, split hero, sticky sidebar) rather than many sections of cards.
- Navigation is short: 4–6 items. Contact is always one click away.
- Work presentation that converts: name → what it is → role/discipline → year/stack → link. Screenshots help, but well-written context matters more for B2B buyers.

### Typography
- Confirmed in the browser: Olivier Larose pairs PP Editorial New (serif) with Neue Montreal (grotesk). Award winners in 2025–2026 likewise pair a **high-contrast serif display** (Awwwards filters frequently surface Financier Display, Fraunces, Frank Ruhl Libre) with a **neutral grotesk** for UI.
- Developer portfolios default to Inter-only; the result is competent but generic. A serif display is the single biggest differentiator available for zero performance cost if self-hosted and subset.

### Colour
- The reference set is overwhelmingly slate/near-black (`#0f172a`, `#121212`) with one bright accent — the "blue developer portfolio" look the brief rules out.
- Warm-neutral palettes (paper, ink, one metal accent) read as editorial and trustworthy, and are rare among developer sites — a genuine way to stand out.

### Animation
- Valuable: one entrance sequence for the hero; reveal-on-scroll for section content (opacity + small translate); hover feedback on links and work rows; page-level fade on route change.
- Measured cost: the motion-heavy references load GSAP, ScrollTrigger, Barba, Locomotive Scroll or Lenis, and Bruno Simon's site transfers ≈7.1 MB. The fast references (Chiang, Kowalski, Rauno) load none of these.
- Costly and avoidable: smooth-scroll hijacking, full-screen curtain transitions, cursor followers, WebGL scenes, continuous parallax. These add JavaScript, break native scrolling, and fail on low-end Android phones — the device most Indian visitors use.
- Sound/motion toggles (Comeau, Bruno Simon's quality switch) are a sign of care and accessibility.

### SVG
- Premium: hairline strokes (1–1.25 px), single colour, few nodes, one purposeful motif repeated across the site; line-draw entrance (stroke-dashoffset) once, not looping.
- Noise: random blobs, glowing gradients, multiple unrelated illustration styles, constantly moving decoration.
- Best fit for an engineer: **technical diagrams that carry information** — e.g. a system diagram showing client → API → database → integrations, which literally explains "full-stack".

### Technology presentation
- Strong sites show real brand marks grouped by layer (frontend/backend/data/infrastructure), never percentage bars. Brand colours aid recognition but should sit on neutral tiles so the page palette survives.

### Performance
- The text-first references (Chiang, Kowalski, Rauno, Larose) are the fast ones; motion-heavy references rely on GSAP/WebGL bundles. A portfolio that must convert on mobile should ship almost no animation JavaScript: CSS transitions + one IntersectionObserver are enough.

## 4. What this portfolio adapts

| Pattern | Source of inspiration | How it is used (original execution) |
|---|---|---|
| Two-audience hero | Adham Dannaway | Hero states the client offer and the full-time availability side by side |
| Annotated system diagram | Engineering-portfolio convention | Custom hero SVG: browser → API → PostgreSQL/MongoDB → integrations, drawn once with hairlines |
| Work index with metadata columns | Olivier Larose | `/projects` index: project · sector · role · stack · year |
| Dense experience list | Brittany Chiang | `/experience` rows: company, role, scope, stack tags |
| One repeated CTA | Dennis Snellenberg | "Discuss a project" closes every page |
| Explicit user controls | Josh Comeau, Bruno Simon | Theme toggle + Motion toggle in the header |
| Motion that explains | Emil Kowalski | Short UI transitions; one hero entrance; no looping decoration on mobile |
| Editorial micro-labels | Olivier Larose | Section numerals (§ 01) and small caps labels |

## 5. What must NOT be copied

- No sticky two-column layout cloned from Chiang; no slate + mint palette.
- No multilingual greeting loader, magnetic buttons or curtain transitions (Snellenberg).
- No 3D world, no WebGL (Bruno Simon).
- No "designer / <coder>" split wording (Dannaway).
- No copying of any site's copy, icons, illustrations, or layout grid.

## 6. Resulting direction for mdwarish.com

**"Drafting table" — editorial paper and engineering line-work.**
Warm ivory paper and espresso ink in light mode; a deep espresso-black with antique-gold line-work in dark mode. Instrument Serif for headlines (with italic used sparingly for emphasis), Manrope for everything a visitor reads or clicks. A single SVG language — hairline system diagrams, registration marks and contour lines — appears where it carries meaning: the hero architecture diagram, the CRM case-study schema, and quiet project cover plates. Motion is CSS-only, transform/opacity based, runs once, pauses offscreen, and can be switched off.

Full design system: see `HANDOVER.md` → "Design system".

---

## V2 changes (24 November 2026)

After reviewing version 1, the owner asked for a bolder, more personal direction. The research above still applies; these are the decisions that changed.

**Palette: "Ink & Signal".**
- Near-black ink `#131313` on off-white `#F4F3EF`, with one vermilion accent: `#C9361A` in light mode, `#FF6B4A` in dark.
- This follows the strongest pattern in the reference set: restrained, near-monochrome palettes (Rauno, Larose, Kowalski), but with a single warm signal colour where they use none.
- Vermilion marks the things worth clicking and the active part of a diagram. It's never used as a background wash.
- Every text pairing passes WCAG AA (full table in `HANDOVER.md` §4).

**Backgrounds.**
- The graph-paper grid and the dotted diagram grid were removed. The research had already flagged grids as one of the most common developer-portfolio clichés.
- In their place is one hairline line drawing per page, tied to the subject: a request path (home), contour rings (work), a stepped circuit (services), a single arc (about), converging lines (contact).
- Most areas are now simply empty space.

**Layout.**
- Borrowed from the editorial references: oversized outlined section numbers, asymmetric heads, a featured project with a module list, alternating image/text rows, and an index with thumbnails (the Olivier Larose pattern).
- The aim is to avoid repeating one card component everywhere.

**Motion.**
- The hero diagram and a new scroll-sequenced process visual follow the Emil Kowalski principle: motion explains the order of things, runs once, and never blocks reading.
- Still CSS only. Library weight measured on the references (GSAP, Barba, Locomotive, Lenis) stays out.

**Navbar fix.**
- The motion control was a navbar icon that looked like a menu button. Rauno's and Josh Comeau's sites both label their sensory controls clearly.
- It's now a labelled "Animations" switch in the footer, and the navbar only navigates.

**Copy.**
- The tone moved from descriptive to first person and short, closer to how Kowalski and Rauno write about their own work.
