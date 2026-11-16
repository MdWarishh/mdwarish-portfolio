import { Project, ProjectCategory } from "@/types";

export const PROJECT_CATEGORIES: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Work", value: "all" },
  { label: "CRM & Applications", value: "CRM & Applications" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Exhibition & B2B Websites", value: "Exhibition & B2B Websites" },
];

export const PROJECTS: Project[] = [
  {
    slug: "limra-hearing-care-crm",
    title: "Limra Hearing Care CRM",
    shortDescription:
      "Client CRM platform supporting clinical and business operations, customer records, and daily staff workflows.",
    fullDescription:
      "A custom Customer Relationship Management (CRM) platform built for Limra Hearing Care to centralize patient and customer records, appointment workflows, follow-ups, and operational reporting. Engineered as a full-stack web application with a Next.js and TypeScript frontend paired with a Node.js, Express.js, and Prisma backend deployed on a Linux VPS.",
    category: "CRM & Applications",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Prisma",
      "VPS Hosting",
    ],
    image: "/images/projects/limra-crm.webp",
    hasRealScreenshot: false,
    gallery: [
      "/images/projects/limra-crm-1.webp",
      "/images/projects/limra-crm-2.webp",
    ],
    liveUrl: "https://crm.limrahearingcare.com/dashboard",
    frontendGithub: undefined, // ADD_GITHUB_URL_LATER
    backendGithub: undefined, // ADD_GITHUB_URL_LATER
    contribution:
      "End-to-end development across frontend architecture, backend REST APIs, database schema modeling with Prisma, system integrations, and production VPS deployment.",
    keyFeatures: [
      "Protected operational dashboard with role-aware access control",
      "Customer and patient record management with structured status tracking",
      "RESTful API layer connecting Next.js client views to Prisma ORM",
      "Production deployment and process management on VPS hosting",
    ],
    featured: true,
    loginRequired: true,
    accentColor: "#2563EB",
  },
  {
    slug: "inventorypro",
    title: "InventoryPro",
    shortDescription:
      "Decoupled inventory management system with dedicated frontend and backend repositories for stock and product workflows.",
    fullDescription:
      "InventoryPro is a modular inventory management application architected with a clear separation of concerns between its client interface and server API. Hosted across dedicated Frontend and Backend repositories, the system manages product catalogs, stock levels, supplier records, and inventory movements.",
    category: "CRM & Applications",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Express.js",
      "REST API",
      "Git",
    ],
    image: "/images/projects/inventorypro.webp",
    hasRealScreenshot: false,
    gallery: [
      "/images/projects/inventorypro-1.webp",
      "/images/projects/inventorypro-2.webp",
    ],
    liveUrl: undefined, // ADD_LIVE_URL_LATER
    frontendGithub: "https://github.com/MdWarishh/InventoryPro-Frontend",
    backendGithub: "https://github.com/MdWarishh/InventoryPro-Backend",
    contribution:
      "Designed and developed both the standalone frontend client repository and the backend API repository, structuring data contracts and inventory CRUD workflows.",
    keyFeatures: [
      "Decoupled frontend and backend architecture in separate Git repositories",
      "Structured product, category, and stock level management",
      "Clean REST API endpoints for inventory updates and status tracking",
      "Responsive dashboard layout for desktop and tablet operations",
    ],
    featured: true,
    accentColor: "#0284C7",
  },
  {
    slug: "khilat-ecommerce",
    title: "Khilat E-commerce",
    shortDescription:
      "Full-stack e-commerce web application built with an Angular + SCSS storefront and a Java + Prisma backend.",
    fullDescription:
      "Khilat E-commerce is a custom online retail platform pairing an Angular and SCSS single-page storefront with a strongly-typed Java backend and Prisma database layer. Built to handle structured product catalogs, category browsing, shopping cart state, and order workflows.",
    category: "E-commerce",
    technologies: ["Angular", "Java", "SCSS", "Prisma", "TypeScript"],
    image: "/images/projects/khilat.webp",
    hasRealScreenshot: false,
    gallery: [
      "/images/projects/khilat-1.webp",
      "/images/projects/khilat-2.webp",
    ],
    liveUrl: undefined, // ADD_LIVE_URL_LATER
    frontendGithub: undefined, // ADD_GITHUB_URL_LATER
    backendGithub: undefined, // ADD_GITHUB_URL_LATER
    contribution:
      "Developed the Angular frontend components, custom SCSS styling system, Java backend service integration, and Prisma data schema.",
    keyFeatures: [
      "Component-driven Angular storefront with modular SCSS styling",
      "Java backend service architecture handling catalog and order logic",
      "Type-safe database modeling and query management via Prisma",
      "Responsive product discovery, filtering, and cart workflows",
    ],
    featured: true,
    accentColor: "#4F46E5",
  },
  {
    slug: "futurex-studio",
    title: "Futurex Studio",
    shortDescription:
      "B2B web platform for an exhibition stand design, 3D spatial architecture, and turnkey fabrication studio.",
    fullDescription:
      "Official web platform for Futurex Studio, an exhibition stand design and turnkey fabrication agency operating across Delhi NCR and Mumbai. The site presents their 6-phase engineering lifecycle (from brief and 3D visualization to CAD planning, factory fabrication, and show-floor handover), service capabilities, and spatial archive.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/futurex-studio.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/futurex-studio-1.webp"],
    liveUrl: "https://futurexstudio.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Built the multi-page Next.js and TypeScript platform, architectural grid layouts, interactive service and process sections, project brief inquiry flows, and technical SEO.",
    keyFeatures: [
      "Multi-page architectural layout covering Home, About, Services, Portfolio, and Contact",
      "Structured 6-phase spatial engineering roadmap and turnkey capability breakdown",
      "Project proposal and studio discovery inquiry forms",
      "Semantic HTML hierarchy and metadata optimization",
    ],
    featured: true,
    accentColor: "#0F172A",
  },
  {
    slug: "odisha-mining-expo",
    title: "Odisha Mining & Infrastructure Expo",
    shortDescription:
      "Official B2B trade exhibition portal for the 5th Odisha Mining & Infrastructure International Expo in Bhubaneswar.",
    fullDescription:
      "The digital platform for the 5th Edition of the Odisha Mining & Infrastructure International Expo at Baramunda Exhibition Ground, Bhubaneswar. The website highlights Odisha's mineral resource profile, exhibition focus sectors (mining machinery, mineral processing, heavy engineering, logistics), exhibitor stall booking, and free trade visitor registration.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/odisha-mining-expo.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/odisha-mining-expo-1.webp"],
    liveUrl: "https://odishaminingexpo.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Developed the Next.js multi-page frontend, countdown timer, Odisha mineral resource data sections, exhibitor/visitor registration workflows, sitemap, and structured metadata.",
    keyFeatures: [
      "Dedicated routes for Why Odisha, Exhibit, Visit, Brochure, Post-Show Report, and Gallery",
      "Interactive sector breakdowns and mineral resource profile blocks",
      "Online exhibitor stand inquiry and free trade visitor registration forms",
      "Comprehensive Open Graph, canonical, and JSON-LD search optimization",
    ],
    featured: false,
    accentColor: "#1D4ED8",
  },
  {
    slug: "nepal-wood-expo",
    title: "Nepal Wood International Expo",
    shortDescription:
      "International B2B trade show website for Nepal's wood, plywood, laminates, and woodworking machinery exhibition in Kathmandu.",
    fullDescription:
      "Official portal for the 12th Nepal Wood International Expo held at Bhrikuti Mandap, Kathmandu. Built to connect exhibitors and trade buyers across plywood, laminates, woodworking CNC machinery, furniture technology, and raw materials, featuring stall booking, free visitor badge registration, and conference schedules.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/nepal-wood.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/nepal-wood-1.webp"],
    liveUrl: "https://nepalwood.com.np/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Engineered the responsive Next.js site architecture, exhibition zone showcases, brochure download workflows, visitor/exhibitor registration forms, and production deployment.",
    keyFeatures: [
      "Detailed product zone showcases for wood panels and woodworking machinery",
      "Exhibitor stand enquiry, sponsorship, and free visitor badge registration flows",
      "Conference, seminar, and past-edition post-show report resource pages",
      "Fast-loading responsive design tailored for international trade visitors",
    ],
    featured: false,
    accentColor: "#2563EB",
  },
  {
    slug: "kenya-buildcon",
    title: "Kenya Buildcon International Expo",
    shortDescription:
      "East African building and construction trade exhibition platform for the 4th edition at The Sarit Expo Centre, Nairobi.",
    fullDescription:
      "Official B2B website for the 4th Kenya Buildcon International Expo in Nairobi, Kenya. Designed to connect international building material manufacturers, construction technology providers, and regional East African buyers, featuring Kenya market insights, exhibitor profiles, and visitor registration.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/kenya-buildcon.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/kenya-buildcon-1.webp"],
    liveUrl: "https://kenyabuildcon.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Developed the multi-page Next.js frontend, East African construction market overview sections, stand enquiry and visitor registration forms, and SEO configuration.",
    keyFeatures: [
      "Dedicated sections for Why Kenya, Exhibition Profile, and Visitor Profile",
      "Integrated stand enquiry, brochure download, and visitor registration forms",
      "Clean editorial presentation of East African infrastructure context",
      "Mobile-optimized navigation and fast static/dynamic route rendering",
    ],
    featured: false,
    accentColor: "#0369A1",
  },
  {
    slug: "nepal-buildcon",
    title: "Nepal Buildcon International Expo",
    shortDescription:
      "B2B exhibition platform for the 12th Nepal Buildcon International Expo covering building, construction, and infrastructure in Kathmandu.",
    fullDescription:
      "Web platform for the 12th Edition of the Nepal Buildcon International Expo at Bhrikuti Mandap, Kathmandu. Showcases building materials, construction machinery, and infrastructure solutions while providing streamlined booth reservation, free visitor pass registration, and post-show reports.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/nepal-buildcon.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/nepal-buildcon-1.webp"],
    liveUrl: "https://www.nepalbuildcon.com.np/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Built the frontend page structure, sector directories, document download pipelines, lead capture forms, and search engine optimization.",
    keyFeatures: [
      "Structured navigation across About, Exhibit, Visit, and Media & Resources",
      "Direct PDF download flows for event brochures and post-show reports",
      "Online booth reservation and visitor registration forms",
      "Consistent cross-device typography and layout grid",
    ],
    featured: false,
    accentColor: "#1E40AF",
  },
  {
    slug: "nepal-power-electric",
    title: "Nepal Electric, Power & Lights Expo",
    shortDescription:
      "Trade exhibition portal for the 5th Nepal Electric, Power and Lights International Expo in Kathmandu.",
    fullDescription:
      "Official website for the 5th Nepal Electric, Power and Lights International Expo at Bhrikuti Mandap Exhibition Hall, Kathmandu. Serves manufacturers, engineers, and buyers across wires and cables, power generation, transmission and distribution, renewable energy, and smart LED lighting.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/nepal-power-electric.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/nepal-power-electric-1.webp"],
    liveUrl: "https://nepalpowerelec.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Developed the Next.js and TypeScript multi-page site, numbered industry sector modules, FAQ accordions, document download center, and contact/registration forms.",
    keyFeatures: [
      "Five core industry sector showcases with clear buyer/exhibitor pathways",
      "Dedicated Exhibitor FAQ, Visitor FAQ, and supporting trade association blocks",
      "Event brochure and post-show report download workflows",
      "Responsive layout with accessible navigation and form validation",
    ],
    featured: false,
    accentColor: "#2563EB",
  },
  {
    slug: "india-solar-show",
    title: "India International Solar Show",
    shortDescription:
      "Renewable energy and solar technology B2B exhibition website for the India International Solar Show in Pune.",
    fullDescription:
      "Web platform for the India International Solar Show in Pune, connecting solar PV manufacturers, energy storage providers, inverter specialists, and EPC firms with commercial and industrial buyers across India.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/india-solar-show.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/india-solar-show-1.webp"],
    liveUrl: "https://indiasolarshow.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Engineered the Next.js frontend components, equal-height sector cards, scroll animations, exhibitor/visitor registration workflows, and SEO metadata.",
    keyFeatures: [
      "Focused presentation of solar manufacturing, storage, and EPC sectors",
      "Streamlined exhibitor stall enquiry and visitor registration flows",
      "Lightweight SVG accents and smooth viewport-triggered reveals",
      "Optimized Core Web Vitals and mobile usability",
    ],
    featured: false,
    accentColor: "#0284C7",
  },
  {
    slug: "propack-odisha",
    title: "Propack Odisha International Expo",
    shortDescription:
      "Eastern India B2B exhibition website for packaging, printing, plastics, processing, paper, and green energy in Bhubaneswar.",
    fullDescription:
      "Official portal for the 4th Edition of Propack Odisha International Expo in Bhubaneswar, organised by the Odisha Assembly of Small and Medium Enterprises (OASME). Covers six interconnected industrial sectors from raw materials to finished packaging and processing machinery.",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/propack-odisha.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/propack-odisha-1.webp"],
    liveUrl: "https://propackodisha.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Built the multi-page Next.js website, six-sector industrial showcase, OASME institutional overview sections, and exhibitor/visitor registration pipelines.",
    keyFeatures: [
      "Six-sector industrial matrix (Plastics, Printing, Packaging, Paper, Processing, Green Energy)",
      "Dedicated pages for conference programmes, buyer-seller meets, and brochures",
      "Stall booking and visitor registration pipelines",
      "Clean, high-contrast editorial typography and responsive grid",
    ],
    featured: false,
    accentColor: "#1D4ED8",
  },
  {
    slug: "futurex-trade",
    title: "Futurex Group Corporate Portal",
    shortDescription:
      "Corporate parent portal for Futurex Trade Fair & Events Pvt. Ltd., showcasing international exhibitions, industries, and group divisions.",
    fullDescription:
      "The central corporate website for Futurex Trade Fair & Events Pvt. Ltd. (New Delhi), an international B2B trade exhibition and corporate event organizer. The platform unifies their multi-country exhibition portfolio, industry verticals (Construction, Wood, EV, Power, Mining, Packaging), and specialist divisions (Futurex Studio, Futurex Digital, Futurex Healthcare).",
    category: "Exhibition & B2B Websites",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO"],
    image: "/images/projects/futurex-trade.webp",
    hasRealScreenshot: false,
    gallery: ["/images/projects/futurex-trade-1.webp"],
    liveUrl: "https://futurextrade.com/",
    frontendGithub: undefined,
    backendGithub: undefined,
    contribution:
      "Developed the corporate multi-page platform, exhibition directory, industry vertical showcases, group division architecture, and inquiry routing.",
    keyFeatures: [
      "Centralized directory of upcoming B2B trade shows across South Asia and East Africa",
      "Structured presentation of end-to-end exhibition management lifecycle",
      "Unified showcase of group divisions and regional office presence",
      "Technical SEO, structured data, and fast page transitions",
    ],
    featured: false,
    accentColor: "#0F172A",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getAdjacentProjects(slug: string): {
  prev: Project;
  next: Project;
} {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const prevIndex = (index - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (index + 1) % PROJECTS.length;
  return {
    prev: PROJECTS[prevIndex],
    next: PROJECTS[nextIndex],
  };
}
