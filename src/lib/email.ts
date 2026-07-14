import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { Submission } from "@/lib/content";

/* Enquiry email notifications.

   Dormant by default: nothing is sent unless EMAIL_NOTIFICATIONS=on AND the
   SMTP_* / ENQUIRY_TO variables are set in .env.local. When disabled or
   misconfigured, sending is skipped and any error is swallowed, so a mail
   problem can NEVER cause a website form submission to fail. */

function isEmailEnabled(): boolean {
  return (
    process.env.EMAIL_NOTIFICATIONS === "on" &&
    !!process.env.SMTP_HOST &&
    !!process.env.ENQUIRY_TO
  );
}

let cached: Transporter | null = null;
function transport(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    // true for port 465 (implicit TLS), false for 587 (STARTTLS).
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });
  return cached;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEnquiryEmail(sub: Submission) {
  const kindLabel = sub.kind === "quote" ? "Quote request" : "Contact message";
  const rows: [string, string][] = [
    ["Type", kindLabel],
    ["Name", sub.name],
    ["Email", sub.email],
    ["Phone", sub.phone || "—"],
    [sub.kind === "quote" ? "Service" : "Subject", sub.subject],
  ];
  if (sub.meta.company) rows.push(["Company", sub.meta.company]);
  if (sub.meta.state) rows.push(["State", sub.meta.state]);
  if (sub.meta.suburb) rows.push(["Suburb", sub.meta.suburb]);

  const text = [
    `New ${kindLabel.toLowerCase()} from the Ecoshine website`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    sub.message || "(none)",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0e1726">
      <h2 style="color:#193cb9;margin:0 0 4px">New ${escapeHtml(kindLabel.toLowerCase())}</h2>
      <p style="color:#5b6b80;margin:0 0 16px">Submitted from the Ecoshine website.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:6px 10px;background:#f3f7fd;font-weight:600;white-space:nowrap">${escapeHtml(k)}</td>
              <td style="padding:6px 10px;border-bottom:1px solid #e3e9f2">${escapeHtml(v)}</td>
            </tr>`
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;font-weight:600">Message</p>
      <p style="margin:0;padding:12px;background:#f3f7fd;border-radius:8px;white-space:pre-wrap">${
        sub.message ? escapeHtml(sub.message) : "<em style='color:#5b6b80'>(none)</em>"
      }</p>
    </div>`;

  return {
    subject: `New ${kindLabel.toLowerCase()} from ${sub.name}`,
    text,
    html,
  };
}

/** Emails the business a notification about a new enquiry. Best-effort: never
    throws, so a failed/disabled send cannot break the submission flow. */
export async function notifyNewEnquiry(sub: Submission): Promise<void> {
  if (!isEmailEnabled()) return;
  try {
    const { subject, text, html } = buildEnquiryEmail(sub);
    await transport().sendMail({
      from: process.env.ENQUIRY_FROM || process.env.SMTP_USER,
      to: process.env.ENQUIRY_TO,
      replyTo: sub.email, // reply goes straight to the enquirer
      subject,
      text,
      html,
    });
  } catch (err) {
    // Log for the server operator; do not surface to the visitor.
    console.error("Enquiry email notification failed:", err);
  }
}
