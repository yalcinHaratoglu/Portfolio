import nodemailer from "nodemailer"

export type ContactEmailPayload = {
  name: string
  email: string
  subject?: string
  message: string
}

function getMailConfig() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com"
  const port = Number(process.env.SMTP_PORT ?? "587")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_TO_EMAIL ?? "myalcinharatoglu@gmail.com"
  const from = process.env.CONTACT_FROM_EMAIL ?? user ?? to

  return { host, port, user, pass, to, from }
}

export function isMailConfigured(): boolean {
  const { user, pass } = getMailConfig()
  return Boolean(user && pass)
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { host, port, user, pass, to, from } = getMailConfig()

  if (!user || !pass) {
    throw new Error("SMTP is not configured")
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const subjectLine = payload.subject?.trim()
    ? `[Portfolio] ${payload.subject.trim()}`
    : `[Portfolio] ${payload.name} — İletişim formu`

  const text = [
    `Ad: ${payload.name}`,
    `E-posta: ${payload.email}`,
    payload.subject?.trim() ? `Konu: ${payload.subject.trim()}` : "",
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n")

  const html = `
    <h2 style="font-family:sans-serif;margin:0 0 16px;">Portfolio — Yeni mesaj</h2>
    <p style="font-family:sans-serif;margin:0 0 8px;"><strong>Ad:</strong> ${escapeHtml(payload.name)}</p>
    <p style="font-family:sans-serif;margin:0 0 8px;"><strong>E-posta:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
    ${payload.subject?.trim() ? `<p style="font-family:sans-serif;margin:0 0 8px;"><strong>Konu:</strong> ${escapeHtml(payload.subject.trim())}</p>` : ""}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
    <p style="font-family:sans-serif;white-space:pre-wrap;margin:0;">${escapeHtml(payload.message)}</p>
  `

  await transporter.sendMail({
    from: `"Portfolio" <${from}>`,
    to,
    replyTo: payload.email,
    subject: subjectLine,
    text,
    html,
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
