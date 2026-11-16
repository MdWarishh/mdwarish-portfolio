import { SkillGroup } from "@/types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    number: "01",
    category: "Frontend Architecture",
    description:
      "Building responsive, accessible, and fast user interfaces with modern component architectures, strict typing, and clean styling systems.",
    skills: [
      {
        name: "Next.js",
        role: "App Router, Server Components, SSR/SSG, Metadata API & routing architecture",
      },
      {
        name: "React",
        role: "Component composition, custom hooks, state management & interactive UIs",
      },
      {
        name: "TypeScript",
        role: "End-to-end static typing, strict interfaces & predictable codebases",
      },
      {
        name: "Angular",
        role: "Structured SPA architecture, modular services & enterprise frontend workflows",
      },
      {
        name: "Tailwind CSS",
        role: "Design tokens, responsive grids, dark/light theming & maintainable styling",
      },
    ],
  },
  {
    id: "backend",
    number: "02",
    category: "Backend & API Systems",
    description:
      "Designing reliable server-side logic, RESTful APIs, authentication layers, and automated business workflows.",
    skills: [
      {
        name: "Node.js",
        role: "Asynchronous server runtime, third-party API integrations & background tasks",
      },
      {
        name: "Express.js",
        role: "REST API routing, middleware pipelines, validation & request handling",
      },
      {
        name: "Java",
        role: "Object-oriented backend engineering & strongly-typed business logic",
      },
      {
        name: "Spring Boot",
        role: "Production web services, structured controllers & enterprise API layers",
      },
    ],
  },
  {
    id: "database",
    number: "03",
    category: "Database & ORM",
    description:
      "Modeling relational and document schemas, optimizing queries, and maintaining data integrity across business applications.",
    skills: [
      {
        name: "MongoDB",
        role: "Document data modeling, Atlas cloud clusters & aggregation pipelines",
      },
      {
        name: "PostgreSQL",
        role: "Relational schema design, structured queries & transactional consistency",
      },
      {
        name: "Prisma",
        role: "Type-safe database client, declarative schema migrations & query building",
      },
    ],
  },
  {
    id: "infrastructure",
    number: "04",
    category: "Tools & Infrastructure",
    description:
      "Managing version control, Linux VPS environments, domain configurations, and production web deployments.",
    skills: [
      {
        name: "Git",
        role: "Branching workflows, clean commit history & collaborative version control",
      },
      {
        name: "GitHub",
        role: "Repository management, code reviews & project organization",
      },
      {
        name: "VPS Hosting",
        role: "Linux server setup, reverse proxies, SSL configuration & process management",
      },
      {
        name: "Deployment",
        role: "Production builds, environment security & zero-downtime release workflows",
      },
    ],
  },
];

export const TECH_MARQUEE_ITEMS: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Angular",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "Java",
  "Spring Boot",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Git",
  "GitHub",
  "VPS Hosting",
  "Deployment",
];
