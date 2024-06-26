"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { loginSchema } from "@/lib/schema"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes"
import { useSearchParams } from "next/navigation"


export function LoginForm() {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already been used with another provider" : ""


   const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const googleSignIn = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGED_IN_REDIRRECT
    })
  }
 


  function onSubmit(values: z.infer<typeof loginSchema>) {

    setError('')
    setSuccess('')

    startTransition(() => {
      login(values)
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

    <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isPending} className=" outline-yellow-500" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error ||  urlError} />
        <FormSuccess message={success} />
       <Button type="submit" disabled={isPending} className=" w-full">Log In</Button>
      </form>

    </Form>
    <div className=" py-6">
    <Link href="/register" className=" flex justify-between space-x-2">
        <p className=""> Don't have an account ? </p>
        <span className=" font-semibold">Register</span>
    </Link>
      <fieldset className=" border-t-2 flex flex-col text-center items-center align-middle justify-center">
          <legend className=" self-center flex px-2 text-sm text-gray-600" >or log in with</legend>
          <div className=" py-4 w-full ">
            <button onClick={() => googleSignIn("google")} className=" rounded-md hover:bg-gray-100 transition-all ease-in-out flex space-x-3 items-center justify-center bg-white py-2 border-2  border-gray-300 w-full ">
            <p className=" text-md"> Log in with Google</p>
            <FcGoogle size={23} />
            </button>
          </div>
        </fieldset>
      </div>
  
    </div>
  )
}

