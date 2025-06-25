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
import { createContact } from "@/actions/contact"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

export function ContactForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await createContact(values)
        
        if (result.success) {
          toast.success(result.success)
          form.reset()
        } else {
          toast.error(result.error || "Failed to send message")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
      }
    })  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Send Us a Message</h3>
        <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      disabled={isPending}
                      className="focus:ring-2 focus:ring-primary"
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
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      {...field} 
                      disabled={isPending}
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    {...field} 
                    disabled={isPending}
                    className="focus:ring-2 focus:ring-primary"
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
                <FormLabel>Subject *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="What is this regarding?" 
                    {...field} 
                    disabled={isPending}
                    className="focus:ring-2 focus:ring-primary"
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
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us how we can help you. Please include as much detail as possible..." 
                    className="min-h-[140px] resize-none focus:ring-2 focus:ring-primary" 
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
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/80 transition-colors" 
            disabled={isPending}
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Message...
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

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2 text-primary">What happens next?</h4>
        <ul className="text-xs text-primary space-y-1">
          <li>• We'll review your message within 24 hours</li>
          <li>• Our team will respond via email</li>
          <li>• For urgent matters, please call us directly</li>
          <li>• All messages are kept confidential</li>
        </ul>
      </div>
    </div>
  )
}
