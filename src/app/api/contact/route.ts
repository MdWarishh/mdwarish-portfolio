import { after } from "next/server";
import { PERSON, SITE_URL } from "@/config/site";
import { getLeadDeps } from "@/lib/contact/deps";
import { createContactHandler } from "@/lib/contact/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createContactHandler({
  getDeps: getLeadDeps,
  // Sheets + email run after the response is sent, so the visitor is not kept waiting on SMTP.
  defer: (task) => after(task),
  allowedHosts: [new URL(SITE_URL).host, `www.${new URL(SITE_URL).host}`],
  fallbackEmail: PERSON.email,
});
