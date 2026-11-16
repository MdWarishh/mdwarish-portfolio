import { ServiceItem } from "@/types";

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "fullstack-web-development",
    number: "01",
    title: "Full-Stack Web Development",
    description:
      "End-to-end engineering of custom web applications with responsive frontend interfaces, structured backend APIs, and reliable database architectures.",
    deliverables: [
      "Next.js / React or Angular frontend architecture",
      "Node.js / Express or Java / Spring Boot backend services",
      "PostgreSQL or MongoDB schema design with Prisma ORM",
      "Production deployment and environment configuration",
    ],
  },
  {
    id: "business-website-development",
    number: "02",
    title: "Business Website Development",
    description:
      "Multi-page corporate, exhibition, and B2B websites designed for clear brand positioning, fast load times, and strong search visibility.",
    deliverables: [
      "Custom editorial layout and responsive UI design",
      "Technical SEO, Open Graph metadata, and XML sitemaps",
      "Lead capture forms for inquiries and registrations",
      "Clean, maintainable codebase ready for future expansion",
    ],
  },
  {
    id: "crm-dashboard-development",
    number: "03",
    title: "CRM & Dashboard Development",
    description:
      "Internal business tools, customer management portals, and operational dashboards tailored to your team's real daily workflows.",
    deliverables: [
      "Role-based views and secure authentication flows",
      "Customer, lead, and record management modules",
      "Searchable data tables, filters, and status tracking",
      "VPS or cloud deployment with database backups",
    ],
  },
  {
    id: "ecommerce-development",
    number: "04",
    title: "E-commerce Development",
    description:
      "Custom online storefronts and catalog systems engineered for smooth product discovery, structured inventory management, and mobile usability.",
    deliverables: [
      "Product catalog, category filtering, and detail pages",
      "Cart state management and checkout workflow integration",
      "Backend inventory and order management endpoints",
      "Responsive layout across mobile and desktop devices",
    ],
  },
  {
    id: "api-development-integration",
    number: "05",
    title: "API Development & Integration",
    description:
      "Designing clean RESTful APIs and connecting your web platform with external databases, email systems, spreadsheets, and third-party services.",
    deliverables: [
      "Structured REST endpoints with input validation",
      "Database ORM integration and query optimization",
      "Google Sheets, SMTP email, and webhook connections",
      "Error handling, rate limiting, and security best practices",
    ],
  },
  {
    id: "business-workflow-automation",
    number: "06",
    title: "Business Workflow Automation",
    description:
      "Replacing manual data entry and disconnected spreadsheets with automated lead routing, notifications, and synchronized records.",
    deliverables: [
      "Automated lead capture to MongoDB and Google Sheets",
      "Instant transactional and alert emails via SMTP",
      "Custom form pipelines for registrations and bookings",
      "Reliable server-side execution with failure logging",
    ],
  },
  {
    id: "website-maintenance-improvements",
    number: "07",
    title: "Website Maintenance & Improvements",
    description:
      "Ongoing technical refinements, UI modernizations, bug fixes, and performance upgrades for existing web applications and business sites.",
    deliverables: [
      "Frontend layout fixes and responsive improvements",
      "Core Web Vitals and page speed optimization",
      "New page additions, content updates, and SEO fixes",
      "Server upkeep, dependency updates, and bug resolution",
    ],
  },
];
