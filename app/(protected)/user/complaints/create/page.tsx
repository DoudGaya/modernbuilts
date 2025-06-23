"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"
import { createComplaint } from "@/actions/complaint"

const complaintSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

export default function CreateComplaintPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const router = useRouter()

  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof complaintSchema>) {
    setError("")
    setSuccess("")
    
    startTransition(() => {
      createComplaint(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          } else if (data.success) {
            setSuccess(data.success)
            form.reset()
            setTimeout(() => {
              router.push("/user/complaints")
            }, 2000)
          }
        })
        .catch(() => {
          setError("Something went wrong!")
        })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/user/complaints">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Submit New Complaint</h1>
          <p className="text-gray-600">Describe your issue and we'll help resolve it</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help us understand and resolve your issue quickly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Brief description of your complaint"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please provide detailed information about your complaint..."
                        rows={6}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="flex gap-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  {isPending ? "Submitting..." : "Submit Complaint"}
                </Button>
                <Link href="/user/complaints">
                  <Button type="button" variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
