"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
  website: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function HireMeModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        toast.error(data.error ?? t("hireMe.errorMessage"))
        return
      }

      toast.success(t("hireMe.successMessage"))
      form.reset()
      onOpenChange(false)
    } catch {
      toast.error(t("hireMe.errorMessage"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">{t("hireMe.title")}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            {t("hireMe.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...form.register("website")}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("hireMe.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("hireMe.namePlaceholder")}
                      className="border-gray-200 dark:border-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("hireMe.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("hireMe.emailPlaceholder")}
                      className="border-gray-200 dark:border-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("hireMe.subject")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("hireMe.subjectPlaceholder")}
                      className="border-gray-200 dark:border-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("hireMe.message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder={t("hireMe.messagePlaceholder")}
                      className="border-gray-200 dark:border-gray-700 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("hireMe.sending")}
                </>
              ) : (
                t("hireMe.send")
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
