"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react";
import Link from "next/link";
import { signUpSchema } from "@/lib/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes";

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
// import { register, regsiter } from "@/actions/regsiter";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import { regsiter } from "@/actions/register";


export function SignUpForm() {

  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')


  const googleSignIn = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGED_IN_REDIRRECT
    })
  }


  const changeTerms = () => {
    return setTerms((prev: boolean): boolean => {
      return !prev
    })
  }

   const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    setError('')
    setSuccess('')

    startTransition(() => {
      if(values.password !== values.passwordConfirmation) {
        setError('Password does not matched')
      }
      
      regsiter(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })

  }



  return (
    <div className=" flex mt-20 flex-col">
     
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name </FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="(234) 000 000 000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
       <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isPending} className=" outline-yellow-500" placeholder="Passsord" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input type="password"disabled={isPending} className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       <div className="flex items-center space-x-2">
      <Checkbox id="terms" 
       checked={terms}
       onCheckedChange={changeTerms}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
          <FormSuccess message={success} />
          <FormError message={error} />
       <Button type="submit" disabled={isPending} className=" bg-black hover:bg-black/80 text-primary w-full">Create an Account</Button>
      </form>
    </Form>
   <div className=" flex flex-col space-y-4 py-6">
    <Link href="/login" className=" flex space-x-2">
        <p className=""> Already have an account ? </p>
        <span className=" font-semibold">Log In</span>
    </Link>
   <fieldset className=" border-t-2 flex flex-col text-center items-center align-middle justify-center">
      <legend className=" self-center flex px-2 text-sm text-gray-600" >or log in with</legend>
      <div className=" py-4 w-full ">
        <button onClick={() => googleSignIn("google")} className=" rounded-md hover:bg-gray-100 transition-all ease-in-out flex space-x-3 items-center justify-center bg-white py-2 border-2  border-gray-300 w-full ">
         <p className=" text-md"> Sign Up with Google</p>
         <FcGoogle size={23} />
        </button>
      </div>
    </fieldset>
   </div>
    </div>
  )
}

