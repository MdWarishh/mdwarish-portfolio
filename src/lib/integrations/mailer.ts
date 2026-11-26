import type { Lead, Mailer } from "@/lib/contact/service";
import { INTENT_LABELS, PROJECT_TYPES } from "@/lib/contact/validation";

/** Minimal shape of a nodemailer transporter, so tests can pass a fake. */
export type MailTransport = {
  sendMail(message: {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
  }): Promise<unknown>;
};

export function formatLeadEmail(lead: Lead) {
  const intent = INTENT_LABELS[lead.intent];
  const projectType = PROJECT_TYPES.find((p) => p.value === lead.projectType)?.label;
  // Strip newlines from anything that goes into a header.
  const safeName = lead.name.replace(/[\r\n]+/g, " ");
  const subject = `New enquiry (${intent}) — ${safeName}`;
  const lines = [
    `Intent:   ${intent}`,
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    lead.company ? `Company:  ${lead.company}` : null,
    projectType ? `Project:  ${projectType}` : null,
    `Received: ${lead.createdAt.toISOString()}`,
    `Lead ID:  ${lead.id}`,
    "",
    lead.message,
    "",
    "— Sent from the contact form on mdwarish.com. Reply to this email to answer the sender directly.",
  ].filter((l): l is string => l !== null);
  return { subject, text: lines.join("\n") };
}

export function createMailer({
  transport,
  from,
  to,
}: {
  transport: MailTransport;
  from: string;
  to: string;
}): Mailer {
  return {
    async sendLeadNotification(lead) {
      const { subject, text } = formatLeadEmail(lead);
      await transport.sendMail({ from: `mdwarish.com <${from}>`, to, replyTo: lead.email, subject, text });
    },
  };
}

/** Gmail SMTP with an App Password. nodemailer is imported lazily so it only loads on the server when used. */
export async function createGmailTransport(user: string, appPassword: string): Promise<MailTransport> {
  const nodemailer = await import("nodemailer");
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: appPassword },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}
