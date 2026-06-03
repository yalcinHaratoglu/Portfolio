import { NextResponse } from "next/server"
import { z } from "zod"
import { isMailConfigured, sendContactEmail } from "@/lib/mail"

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

    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          error:
            "E-posta servisi yapılandırılmamış. .env.local dosyasına SMTP_USER ve SMTP_PASS ekleyin.",
        },
        { status: 503 },
      )
    }

    await sendContactEmail({ name, email, subject, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
