export interface HomeStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HomeProject {
  id: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  href: string;
  /** Optional public-local screenshot path, e.g. /images/projects/fusionpos.webp */
  image?: string;
}

export interface HomeService {
  icon: "layers" | "server" | "palette" | "plug";
  title: string;
  description: string;
}

export interface HomeStep {
  title: string;
  description: string;
}

export const HERO = {
  eyebrow: "Full Stack Developer · Delhi NCR",
  description:
    "I'm Md Warish, a full stack developer in Delhi NCR building fast, secure and beautifully crafted products with Next.js, Angular, Node.js and PostgreSQL.",
};

export const HOME_STATS: HomeStat[] = [
  { value: 3, suffix: "", label: "Live production products" },
  { value: 8, suffix: "+", label: "Months shipping live SaaS" },
  { value: 2, suffix: "", label: "Frameworks in production: Next.js & Angular" },
];

export const TECH_STACK: string[] = [
  "Next.js",
  "Angular",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Socket.io",
  "Tailwind CSS",
  "LLM APIs",
];

export const HOME_PROJECTS: HomeProject[] = [
  {
    id: "01",
    title: "FusionPOS",
    role: "Full Stack · Product",
    description:
      "A multi-tenant point-of-sale platform built for hotels and restaurants.",
    tags: ["Next.js", "Multi-tenant", "POS"],
    href: "https://fusionpos.in",
    // image: "/images/projects/fusionpos.webp",
  },
  {
    id: "02",
    title: "Khilat",
    role: "Full Stack · E-commerce",
    description:
      "An e-commerce storefront with secure Razorpay checkout and a clean shopping flow.",
    tags: ["Next.js", "Razorpay", "E-commerce"],
    href: "https://khilat-frontend.vercel.app",
    // image: "/images/projects/khilat.webp",
  },
  {
    id: "03",
    title: "Travel CRM",
    role: "Full Stack · SaaS",
    description:
      "A CRM for travel businesses with real-time messaging and permission-based access control.",
    tags: ["Socket.io", "RBAC", "TypeScript"],
    href: "https://crm.webcreativeagency.com",
    // image: "/images/projects/travel-crm.webp",
  },
];

export const HOME_SERVICES: HomeService[] = [
  {
    icon: "layers",
    title: "Full Stack Web Apps",
    description:
      "End-to-end products with Next.js, Angular, Node.js and PostgreSQL, from schema to deployment.",
  },
  {
    icon: "server",
    title: "SaaS & Dashboards",
    description:
      "Multi-tenant systems, role-based access and analytics that stay fast as your data grows.",
  },
  {
    icon: "palette",
    title: "UI Engineering",
    description:
      "Pixel-accurate, accessible interfaces with considered motion that feel premium on every screen.",
  },
  {
    icon: "plug",
    title: "Integrations",
    description:
      "Payments, real-time messaging and LLM APIs wired in cleanly and securely.",
  },
];

export const HOME_PROCESS: HomeStep[] = [
  {
    title: "Discover",
    description:
      "We align on goals, users and scope before a single line of code is written.",
  },
  {
    title: "Design",
    description:
      "Structure, visuals and motion are agreed up front so the build stays predictable.",
  },
  {
    title: "Build",
    description:
      "Clean, typed code shipped in small, reviewable milestones you can see and test.",
  },
  {
    title: "Launch",
    description:
      "Deployment, monitoring and support so the product keeps performing after go-live.",
  },
];
