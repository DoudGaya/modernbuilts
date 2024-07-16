"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { reset } from "@/actions/reset"
import { z } from "zod"
import Link from "next/link";
import { ResetSchema } from "@/lib/schema"

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
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { signIn } from "next-auth/react"
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes"

export function ResetForm() {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

   const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  const googleSignIn = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGED_IN_REDIRRECT
    })
  }
 


  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      reset(values)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }



  return (
    <div className=" flex flex-col w-full">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" disabled={isPending} className=" outline-yellow-500" placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
       <Button type="submit" disabled={isPending} className=" text-primary bg-black hover:bg-gray-900/80 w-full">Reset Password</Button>
      </form>

    </Form>
    <div className=" py-6">
        <Link href="/register" className=" flex justify-between space-x-2">
            <p className=""> Don't have an account ? </p>
            <span className=" font-semibold">Register</span>
        </Link>
      </div>
  
    </div>
  )
}

