import type { Service } from "@/types/content";

/** Short on purpose: one line on the home page, a compact block on /services. */
export const SERVICES: Service[] = [
  {
    slug: "custom-websites",
    title: "Websites",
    lede: "Fast Next.js sites written for your customers, not adapted from a template.",
    includes: ["Page plan around what visitors need to decide", "Responsive build, tested on phones", "Search metadata, sitemap and social previews", "Forms wired to email, a database or Google Sheets"],
    forWho: "Businesses and event organisers whose website brings in enquiries.",
    problem: "A slow or dated site that loses people before they get in touch.",
    deliverables: ["Live site on your domain", "Source code in your repo", "Notes for future edits"],
  },
  {
    slug: "full-stack-applications",
    title: "Web applications",
    lede: "Real software with a frontend, an API and a database — from data model to deployment.",
    includes: ["Data model in PostgreSQL or MongoDB", "Node.js and Express API with auth and validation", "Next.js or React dashboard with roles", "Deployment to a VPS or managed hosting"],
    forWho: "Teams replacing spreadsheets or manual steps with their own system.",
    problem: "Work that depends on copied data and people remembering steps.",
    deliverables: ["Deployed app", "Database schema and migrations", "API notes and a setup guide"],
  },
  {
    slug: "crm-business-systems",
    title: "CRMs and business systems",
    lede: "A CRM shaped around how you actually work — branches, stock, staff, billing.",
    includes: ["Sales, stock, invoice and customer records", "Branch separation and per-module permissions", "Reports with Excel export, printable invoices", "Email or live in-app alerts"],
    forWho: "Clinics, retailers, distributors and service firms that outgrew off-the-shelf tools.",
    problem: "Software that forces your process to change, or spreadsheets that can't answer simple questions.",
    deliverables: ["CRM built to your workflow", "Staff accounts and roles", "Import from your current spreadsheets"],
  },
  {
    slug: "b2b-portals",
    title: "B2B and event portals",
    lede: "Sites that sell stands, register visitors and sort enquiries. I build these for live trade shows.",
    includes: ["Exhibitor and visitor registration", "Brochure and report downloads", "One structure for many events", "Enquiries sorted by purpose"],
    forWho: "Exhibition organisers, trade bodies and B2B companies.",
    problem: "Sign-ups and enquiries arriving from everywhere with no context.",
    deliverables: ["Event or portal site", "Registration and enquiry handling", "A setup you can reuse next edition"],
  },
  {
    slug: "ecommerce",
    title: "Online stores",
    lede: "A clean buying flow, a payment gateway and an admin you can run yourself.",
    includes: ["Catalogue, cart and checkout", "Payment gateway such as Razorpay", "Orders and order emails", "Fast, indexable product pages"],
    forWho: "Brands selling direct who want more control than a marketplace gives.",
    problem: "Checkouts people abandon and stores that are hard to update.",
    deliverables: ["Store with payments", "Admin for products and orders", "Launch checklist"],
  },
  {
    slug: "api-integrations",
    title: "Integrations",
    lede: "Connect the tools you already use so data stops being copied by hand.",
    includes: ["Google Sheets, email and file storage", "Payment gateways and webhooks", "Scheduled jobs with retries", "Safe handling of keys"],
    forWho: "Businesses whose website, CRM and spreadsheets don't talk to each other.",
    problem: "Leads and orders typed into a second system by hand.",
    deliverables: ["Working integration with error handling", "Config guide"],
  },
  {
    slug: "redesign-modernisation",
    title: "Redesigns",
    lede: "Move an existing site to a modern stack without losing its content or search traffic.",
    includes: ["Audit of structure, speed and content", "Rebuild in Next.js with redirects", "New design and accessibility fixes", "Image, font and script clean-up"],
    forWho: "Organisations with a slow, dated site that still gets traffic.",
    problem: "A site that's embarrassing but too important to switch off.",
    deliverables: ["Redesigned site", "Redirect map", "Before/after speed check"],
  },
  {
    slug: "deployment-maintenance",
    title: "Hosting and upkeep",
    lede: "Servers, domains, SSL and updates — and someone who answers when something breaks.",
    includes: ["VPS with Nginx and a process manager, or managed hosting", "Domain, DNS and SSL", "Dependency and security updates", "Small fixes on an agreed schedule"],
    forWho: "Owners of sites and apps with no developer in-house.",
    problem: "A live system nobody owns until it goes down.",
    deliverables: ["Deployment notes", "Update log", "Agreed support plan"],
  },
];

export const PROCESS = [
  { title: "Understand", body: "I learn how the work happens today and what a good result looks like." },
  { title: "Agree the scope", body: "A short written plan: what's in, what's out, and the order we build it." },
  { title: "Build in steps", body: "You get a working link early and see progress in small pieces." },
  { title: "Launch and hand over", body: "Live on your domain, with the code and notes, so anyone can pick it up." },
] as const;
