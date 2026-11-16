import nodemailer from "nodemailer";

export interface MailNotificationPayload {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLeadNotificationEmail(
  payload: MailNotificationPayload
): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Gmail SMTP environment variables are not configured.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br/>");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #F8FAFC; color: #0F172A;">
      <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 28px;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #2563EB; font-weight: 600; margin: 0 0 8px 0;">
          New Portfolio Inquiry
        </p>
        <h1 style="font-size: 20px; font-weight: 700; margin: 0 0 20px 0; color: #0F172A;">
          Message from ${safeName}
        </h1>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; width: 110px;">Name</td>
            <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B;">Email</td>
            <td style="padding: 8px 0; color: #2563EB;">
              <a href="mailto:${safeEmail}" style="color: #2563EB; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B;">Received At</td>
            <td style="padding: 8px 0; color: #0F172A;">${escapeHtml(payload.createdAt)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B;">Lead ID</td>
            <td style="padding: 8px 0; color: #64748B; font-family: monospace; font-size: 12px;">${escapeHtml(payload.id)}</td>
          </tr>
        </table>
        <div style="border-top: 1px solid #E2E8F0; padding-top: 18px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748B; margin: 0 0 8px 0;">
            Message
          </p>
          <div style="font-size: 15px; line-height: 1.6; color: #111827; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0;">
            ${safeMessage}
          </div>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Md Warish Portfolio" <${user}>`,
    to: "warishmohd987@gmail.com",
    replyTo: payload.email,
    subject: `[Portfolio Inquiry] ${payload.name}`,
    html,
  });

  return true;
}
