import type { Project, ProjectCategory, Shot } from "@/types/content";

/**
 * Every fact here was checked on 24 Nov 2026 against:
 *  - the InventoryPro-Frontend / InventoryPro-Backend source code (Limra CRM),
 *  - the live websites (rendered in a browser; screenshots captured at 1280×800).
 * See HANDOVER.md → "Content sources".
 */

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "business-app": "Business software",
  corporate: "Company websites",
  exhibition: "Exhibition websites",
};

const shot = (file: string, alt: string, caption: string, width = 800, height = 500): Shot => ({
  src: `/images/projects/${file}.webp`,
  alt,
  caption,
  width,
  height,
});

const EXPO_ARCHITECTURE =
  "A Next.js app with statically optimised pages, next/image for photos and per-page metadata, so each page loads fast and can be found and shared on its own.";

export const PROJECTS: Project[] = [
  {
    slug: "limra-crm",
    title: "Limra CRM",
    client: "Limra — hearing-care business with multiple branches",
    category: "business-app",
    sector: "Business CRM · Sales, stock, billing, team",
    summary:
      "A full business CRM I built end to end: sales, billing, dealers, inventory, reports, staff and roles across branches.",
    role: "Sole developer — architecture, frontend, API, database, deployment",
    year: "2026",
    stack: ["nextjs", "typescript", "react", "tailwindcss", "tanstack", "nodejs", "express", "prisma", "postgresql", "zod"],
    stackExtra: ["Server-Sent Events", "JWT access + refresh tokens", "Cloudinary", "Resend", "node-cron", "Excel import/export", "VPS"],
    links: [
      { label: "Live app", href: "https://crm.limrahearingcare.com/dashboard", note: "Staff login required" },
      { label: "Frontend code", href: "https://github.com/MdWarishh/InventoryPro-Frontend" },
      { label: "Backend code", href: "https://github.com/MdWarishh/InventoryPro-Backend" },
    ],
    featured: true,
    cover: { motif: "schema", label: "18 modules" },
    gallery: [
      shot(
        "limra-crm-login",
        "Login screen of the Limra CRM, with the company logo on a teal panel and the sign-in form",
        "The login screen. Everything behind it needs a staff account with the right role.",
      ),
    ],
    overview:
      "Limra sells and services hearing devices from more than one branch. I built the system the business runs on: a Next.js dashboard, an Express API and a PostgreSQL database. It covers the whole day — selling, billing, stock, dealers, staff and reporting.",
    problem:
      "Every device has a serial number. The business needs to know where each one is, who supplied it, whether it has been billed, and how each branch is doing — without spreadsheets.",
    objective:
      "One system for every branch. Staff see their own branch; the owner sees everything. Invoices and reports come from the same data.",
    contribution: [
      "Designed the database: 30 Prisma models on PostgreSQL.",
      "Built the API: 19 route groups with JWT auth, role checks, rate limiting and Helmet.",
      "Built the dashboard in Next.js and TypeScript with TanStack Query and Zustand.",
      "Added real-time alerts, scheduled reminders, Excel import/export and PDF invoices.",
      "Deployed it and maintain it in production.",
    ],
    modules: [
      { name: "Dashboard", does: "Revenue this month, profit (today, this month, all time), stock value, low-stock alerts and active dealers at a glance." },
      { name: "Sales", does: "Record a sale against a product and serial number, with customer details. Sales can be edited or deleted." },
      { name: "Invoices & billing", does: "Create, edit and print GST invoices. Numbers come from a per-branch counter with a set prefix. Invoices can carry colour labels." },
      { name: "Products & categories", does: "SKU, HSN code, GST rate, MRP, purchase and selling price, minimum stock level and product images." },
      { name: "Inventory & stock", does: "Stock in (purchase, dealer supply or sales return), stock out, current stock and history, with monthly and yearly analytics." },
      { name: "Serial numbers", does: "Every device is tracked by serial number, from the moment it arrives to the invoice it ends on." },
      { name: "Stock transfers", does: "Move stock between branches, item by item, with a status for each transfer." },
      { name: "Dealers", does: "Dealer profiles with GST and bank details, stock given, unbilled stock, returns, older stock records and their invoices." },
      { name: "Reports", does: "Sales, purchase, stock valuation, GST, low stock and an all-branches view. Each one downloads as an Excel file." },
      { name: "Expenses", does: "Branch expenses by category and payment method (cash, bank, UPI, card). They feed the profit figures." },
      { name: "Branches", does: "Set up branches and a main branch. Every record belongs to one." },
      { name: "Users, roles & permissions", does: "Super Admin, Branch Admin and Staff roles, plus view/create/edit/delete rights per module for each user." },
      { name: "Attendance", does: "Check-in and check-out with shifts, automatic late marking, half days and leave, and an admin view by month." },
      { name: "Tasks", does: "Assigned and personal tasks with priority, status, comments and an activity trail." },
      { name: "Meetings", does: "Meetings with participants and automatic reminders by email. WhatsApp reminders are built in and can be switched on." },
      { name: "Notifications", does: "Live alerts over Server-Sent Events for low stock, transfers, bulk uploads and meetings." },
      { name: "Bulk upload", does: "Import products, stock, dealers and serial numbers from Excel. Every import is logged." },
      { name: "Settings & account", does: "Invoice settings, appearance (light/dark), password change, and login with access and refresh tokens." },
    ],
    architecture: {
      heading: "Architecture",
      body: [
        "Next.js dashboard → Express REST API → Prisma → PostgreSQL. Frontend and backend are separate repos and deploy separately, on a VPS.",
        "Each request is checked three times: is the user logged in, what is their role, and do they have rights for this module. Branch filtering happens on the server, so staff can't see another branch's data by editing a request.",
      ],
    },
    implementation: [],
    challenges: [
      {
        challenge: "Live updates without adding WebSocket infrastructure.",
        solution:
          "A small SSE manager keeps open connections per user. EventSource can't send headers, so the token goes in the query string and is checked before the stream opens.",
      },
      {
        challenge: "Two people billing at the same moment.",
        solution: "Invoice numbers come from a counter row that the database increments in one atomic upsert, per branch and month.",
      },
      {
        challenge: "Getting existing records into the system.",
        solution: "An Excel import for products, stock, dealers and serials, with a log entry for every run.",
      },
    ],
    evidence: [
      "Live login at crm.limrahearingcare.com.",
      "Public code: InventoryPro-Frontend and InventoryPro-Backend on GitHub (the repo name is older than the product name).",
      "Model, route and module counts are taken from prisma/schema.prisma, src/app.js and the dashboard routes.",
    ],
  },
  {
    slug: "futurex-group-corporate-website",
    title: "Futurex Group website",
    client: "Futurex Trade Fair & Events Pvt. Ltd.",
    category: "corporate",
    sector: "B2B exhibitions",
    summary: "The main website for an organiser of trade shows in India, Nepal, Bangladesh, Sri Lanka and East Africa.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "futurextrade.com", href: "https://futurextrade.com/" }],
    featured: true,
    cover: { motif: "network", label: "15 upcoming shows" },
    gallery: [
      shot(
        "futurex-trade-1",
        "Futurex Group homepage: dark exhibition-hall photo behind the company name and two buttons",
        "Who Futurex is, where it works, and the two actions that matter.",
      ),
      shot(
        "futurex-trade-2",
        "Futurex trade calendar with cards for upcoming exhibitions in Nepal and Odisha",
        "The trade calendar. Each card links to that show's own site.",
      ),
    ],
    overview:
      "Futurex runs sector trade shows — construction, wood, power, mining, EV — across five countries. Every show has its own site. This one ties them together.",
    problem: "Exhibitors and partners need one place to see the organiser, every upcoming show, and who to contact.",
    objective: "A fast company site with a live calendar of shows that links out to each event site.",
    contribution: [
      "Built the site as part of my work at Futurex.",
      "Trade calendar with dates and venues, linking to each show's site.",
      "Industry, presence, services and division pages.",
      "Enquiry links per show: pre-filled email, WhatsApp and click-to-call.",
      "Metadata, social cards and indexing setup.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "Fifteen shows, five countries, one page.",
        solution: "Every calendar card shows the same four facts in the same order — edition, name, date, venue — so visitors can compare at a glance.",
      },
    ],
    evidence: ["Live at futurextrade.com (a Next.js app, checked from its assets)."],
  },
  {
    slug: "odisha-mining-expo",
    title: "Odisha Mining & Infrastructure Expo",
    client: "Futurex Trade Fair & Events Pvt. Ltd.",
    category: "exhibition",
    sector: "Mining · Heavy machinery",
    summary: "The site for the 5th Odisha Mining & Infrastructure Expo in Bhubaneswar — stall booking, visitor registration and downloads.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "odishaminingexpo.com", href: "https://odishaminingexpo.com/" }],
    featured: true,
    cover: { motif: "contour", label: "7–10 Jan 2027" },
    gallery: [
      shot(
        "odisha-mining-1",
        "Odisha Mining Expo homepage in black and yellow, with dates, booking buttons and a countdown",
        "Dates, venue, free entry and a countdown — the first things visitors look for.",
      ),
      shot(
        "odisha-mining-2",
        "About section of the Odisha Mining Expo site with a machinery photo",
        "The about section, written for machinery makers, investors and government visitors.",
      ),
    ],
    overview: "The 5th edition runs 7–10 January 2027 at Baramunda Exhibition Ground, Bhubaneswar. The website is the show's main sales and registration channel.",
    problem: "Exhibitors need to understand the market and book space. Visitors need dates, venue and a quick free sign-up — mostly on their phones.",
    objective: "Turn visits into stall enquiries and visitor sign-ups.",
    contribution: [
      "Built the pages: About, Why Odisha, Exhibit, Visit, Venue, Gallery, Brochure, Contact.",
      "Stall booking and free visitor registration.",
      "Countdown, add-to-calendar, brochure and post-show report downloads.",
      "Cookie consent with a one-click reject.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "A lot of event detail on a small screen.",
        solution: "Dates, venue and entry terms sit in one short row under the headline. The countdown and ticker stay compact.",
      },
    ],
    evidence: ["Live at odishaminingexpo.com (a Next.js app, checked from its assets)."],
  },
  {
    slug: "nepal-wood-international-expo",
    title: "Nepal Wood International Expo",
    client: "Futurex Trade Fair & Events with Media Space Solutions",
    category: "exhibition",
    sector: "Wood · Furniture technology",
    summary: "The site for the 12th Nepal Wood International Expo in Kathmandu — plywood, laminates, machinery and furniture tech.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "nepalwood.com.np", href: "https://nepalwood.com.np/" }],
    featured: true,
    cover: { motif: "grain", label: "28–31 Jan 2027" },
    gallery: [
      shot(
        "nepal-wood-1",
        "Nepal Wood Expo homepage: warm brown hero over a hall photo, headline 'Where Nepal's wood industry does business'",
        "Warm wood tones, with dates, venue and both sign-up paths above the fold.",
      ),
      shot(
        "nepal-wood-2",
        "Countdown block on the Nepal Wood Expo site with a Book a stand button",
        "A countdown with a direct booking button.",
      ),
      shot(
        "nepal-wood-mobile",
        "Nepal Wood Expo homepage on a phone, with stacked headline, dates and full-width buttons",
        "On a phone: full-width buttons and the key numbers in two columns.",
        676,
        1463,
      ),
    ],
    overview: "The 12th edition runs 28–31 January 2027 at Bhrikuti Mandap, Kathmandu — its first four-day edition, with Hometex Nepal alongside.",
    problem: "The site sells to two groups at once: companies deciding on a stand, and buyers deciding whether to come.",
    objective: "Make booking a stand or registering to visit a one-step decision from any page.",
    contribution: [
      "Built the About, Exhibit, Visit, Conference, Media and Resources sections.",
      "Stand booking, sponsorship and free visitor registration.",
      "Brochure and post-show report downloads, exhibitor list and FAQ.",
      "A mobile layout built for phone visitors.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "Too many buttons competing.",
        solution: "Booking a stand is always the filled button and registering is always the outlined one. Visitors learn the pattern once.",
      },
    ],
    evidence: ["Live at nepalwood.com.np (a Next.js app, checked from its assets)."],
  },
  {
    slug: "nepal-electric-power-lights-expo",
    title: "Nepal Electric, Power & Lights Expo",
    client: "Futurex Trade Fair & Events with ETS India and Media Space Solutions",
    category: "exhibition",
    sector: "Power · Electrical · Lighting",
    summary: "The site for the 5th Nepal Electric, Power and Lights Expo, with sector pages, FAQs and an enquiry form sorted by purpose.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "nepalpowerelec.com", href: "https://nepalpowerelec.com/" }],
    featured: false,
    cover: { motif: "waveform", label: "18–20 Dec 2026" },
    gallery: [
      shot(
        "nepal-power-1",
        "Nepal Electric, Power and Lights Expo homepage with green hero, dates and buttons",
        "Dates, venue and three actions: book, register, brochure.",
      ),
      shot(
        "nepal-power-2",
        "Five sector panels: cables, power, transmission, renewables and lighting",
        "Five sector panels so exhibitors find their category fast.",
      ),
    ],
    overview: "The 5th edition runs 18–20 December 2026 at Bhrikuti Mandap, Kathmandu, covering cables, power, transmission, renewables and lighting.",
    problem: "Very different visitors — cable makers, solar installers, engineers — and their questions need to reach the right person.",
    objective: "Explain the sectors clearly and collect enquiries already sorted by purpose.",
    contribution: [
      "Built the About, Exhibit, Visit, Past Editions, Media and Downloads sections.",
      "Five-sector showcase and separate exhibitor and visitor FAQs.",
      "Enquiry form with country and area of interest, plus newsletter sign-up.",
      "Cookie consent with essential-only, reject and manage options.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "Five sectors without a wall of cards.",
        solution: "One sector panel is open with its photo; the rest stay narrow, labelled columns until picked.",
      },
    ],
    evidence: ["Live at nepalpowerelec.com (a Next.js app, checked from its assets)."],
  },
  {
    slug: "propack-odisha-expo",
    title: "PROPACK Odisha Expo",
    client: "Odisha Assembly of Small and Medium Enterprises (OASME)",
    category: "exhibition",
    sector: "Packaging · Printing · Plastics",
    summary: "The site for the 4th PROPACK Odisha expo in Bhubaneswar — six sectors, from plastics to green energy.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "propackodisha.com", href: "https://propackodisha.com/" }],
    featured: false,
    cover: { motif: "fold", label: "25–28 Feb 2027" },
    gallery: [
      shot(
        "propack-odisha-1",
        "PROPACK Odisha 2027 homepage with a large navy wordmark, orange accents and booking buttons",
        "A bold type-led hero, with the supporting government bodies right under it.",
      ),
      shot(
        "propack-odisha-2",
        "About PROPACK Odisha section with a short description and key figures card",
        "The about section: who OASME is and how the four days work.",
      ),
    ],
    overview: "PROPACK Odisha 2027 is OASME's packaging, printing and plastics show, 25–28 February 2027 in Bhubaneswar, with a conference, buyer-seller meets and a women-entrepreneurs day.",
    problem: "An MSME association's flagship event has to look official to government backers and still sell stalls to manufacturers.",
    objective: "Show who backs the show, explain six sectors, keep booking one click away.",
    contribution: [
      "Built the About, Exhibit, Visit, Sectors & Market, Media, Downloads and Contact sections.",
      "Six-sector presentation and a supporters strip.",
      "Exhibitor and visitor registration, brochure and participant pages.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "Six sectors, one message.",
        solution: "A ribbon names all six at a glance. The detail lives on its own Sectors & Market page.",
      },
    ],
    evidence: ["Live at propackodisha.com (a Next.js app, checked from its assets)."],
  },
  {
    slug: "nepal-buildcon-expo",
    title: "Nepal Buildcon International Expo",
    client: "Futurex Trade Fair & Events with Media Space Solutions",
    category: "exhibition",
    sector: "Building · Construction",
    summary: "The site for the 12th Nepal Buildcon Expo — building materials, machinery and infrastructure in Kathmandu.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "nepalbuildcon.com.np", href: "https://www.nepalbuildcon.com.np/" }],
    featured: false,
    cover: { motif: "grid", label: "25–28 Feb 2027" },
    gallery: [
      shot(
        "nepal-buildcon-1",
        "Nepal Buildcon homepage with event crowd photo, 12th edition label, dates and booking buttons",
        "Photos from past editions do the selling; dates and actions sit on a clean panel.",
      ),
      shot(
        "nepal-buildcon-2",
        "Supporter strip and a dark 'Why Nepal' market section",
        "A 'Why Nepal' section makes the case to foreign exhibitors.",
      ),
    ],
    overview: "The 12th edition runs 25–28 February 2027 at Bhrikuti Mandap, Kathmandu.",
    problem: "Foreign suppliers need a reason to exhibit in Nepal. Local contractors need an easy way to register.",
    objective: "Pair event logistics with a short market case, and keep sign-up simple.",
    contribution: [
      "Built the Event, Exhibit, Visit and Media & Resources sections.",
      "Stand booking, visitor registration, downloads and the post-show report.",
      "Cookie consent with essential-only and reject options.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "Busy photos behind text.",
        solution: "A soft gradient sits under the headline so the text stays readable and the crowd still shows.",
      },
    ],
    evidence: ["Live at nepalbuildcon.com.np (a Next.js app, checked from its assets)."],
  },
  {
    slug: "futurex-studio",
    title: "Futurex Studio",
    client: "Futurex Studio (Futurex Group)",
    category: "corporate",
    sector: "Exhibition stand design & build",
    summary: "The site for Futurex Group's stand-building studio — design, 3D, fabrication and installation as one service.",
    role: "Developer",
    year: "2026",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    links: [{ label: "futurexstudio.com", href: "https://futurexstudio.com/" }],
    featured: false,
    cover: { motif: "frame", label: "Design · Build · Install" },
    gallery: [
      shot(
        "futurex-studio-1",
        "Futurex Studio homepage: dark background with an orange wireframe surface and the headline 'Spatial precision. Built to scale.'",
        "A wireframe hero for a studio that sells built spaces.",
      ),
      shot(
        "futurex-studio-2",
        "Futurex Studio section with a photo of a finished exhibition stand",
        "Real stand photos lead into the portfolio.",
      ),
    ],
    overview: "Futurex Studio designs and builds exhibition stands, from the brief and 3D renders to fabrication and on-site handover.",
    problem: "A fabrication studio is judged by what it has built. The site had to feel precise and get clients to a brief quickly.",
    objective: "Show the six-step process and past stands, and route visitors to a proposal request.",
    contribution: [
      "Built the Home, About, Services, Portfolio and Contact pages.",
      "Six-step process section and turnkey service breakdown.",
      "Portfolio of around twenty stands linking to the archive.",
      "Proposal buttons with direct phone, WhatsApp and email.",
    ],
    architecture: { heading: "Architecture", body: [EXPO_ARCHITECTURE] },
    implementation: [],
    challenges: [
      {
        challenge: "Selling a physical craft on a screen.",
        solution: "An architectural hero for the design thinking, then real photos of finished stands for proof.",
      },
    ],
    evidence: ["Live at futurexstudio.com (a Next.js app, checked from its runtime)."],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getRelatedProjects(slug: string, count = 2): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const sameCategory = PROJECTS.filter((p) => p.slug !== slug && p.category === current.category);
  const others = PROJECTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}
