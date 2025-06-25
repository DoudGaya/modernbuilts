"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useTransition } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUserContact } from "@/actions/contact"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-current-user"

const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    required_error: "Please select a priority level",
  }),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const categories = [
  { value: "GENERAL", label: "General Inquiry" },
  { value: "TECHNICAL", label: "Technical Support" },
  { value: "INVESTMENT", label: "Investment Support" },
  { value: "ACCOUNT", label: "Account Issues" },
  { value: "BILLING", label: "Billing & Payments" },
  { value: "OTHER", label: "Other" },
]

const priorities = [
  { value: "LOW", label: "Low - General question", color: "text-green-600" },
  { value: "MEDIUM", label: "Medium - Need assistance", color: "text-yellow-600" },
  { value: "HIGH", label: "High - Urgent issue", color: "text-red-600" },
]

export function UserContactForm() {
  const [isPending, startTransition] = useTransition()
  const user = useCurrentUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      category: "",
      priority: "MEDIUM",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await createUserContact(values)
        
        if (result.success) {
          toast.success(result.success)
          form.reset()
        } else {
          toast.error(result.error || "Failed to send message")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
        console.error("Contact form error:", error)
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Logged in as:</strong> {user?.name} ({user?.email})
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Brief description of your inquiry" 
                    {...field} 
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <span className={priority.color}>{priority.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide detailed information about your inquiry. Include any relevant account details, error messages, or steps you've already taken."
                    className="min-h-[120px] resize-none"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500 mt-1">
                  {field.value?.length || 0}/500 characters
                </p>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">What happens next?</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Your message will be sent to our support team</li>
          <li>• We'll respond within 24 hours (usually much faster)</li>
          <li>• You'll receive a response via email</li>
          <li>• For urgent matters, please call us directly</li>
        </ul>
      </div>
    </div>
  )
}
