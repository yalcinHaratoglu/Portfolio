import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
    }

    const { name, email, subject, message, website } = parsed.data

    if (website) {
      return NextResponse.json({ ok: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL ?? "myalcinharatoglu@gmail.com"
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev"

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured. Add RESEND_API_KEY to .env.local" },
        { status: 503 },
      )
    }

    const resend = new Resend(apiKey)
    const emailSubject = subject?.trim()
      ? `[Portfolio] ${subject.trim()}`
      : `[Portfolio] ${name} — Contact form`

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: emailSubject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        subject?.trim() ? `Subject: ${subject.trim()}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
