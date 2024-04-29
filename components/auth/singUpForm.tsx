"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc";

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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function SignUpForm() {
  // ...
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }



  return (
    <div className=" flex flex-col">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="FullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name </FormLabel>
              <FormControl>
                <Input className=" outline-yellow-500" placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input className=" outline-yellow-500" placeholder="Email Address" {...field} />
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
                <Input className=" outline-yellow-500" placeholder="(234) 000 000 000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
       <div className="grid grid-cols-2 gap-4">
       <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className=" outline-yellow-500" placeholder="Passsord" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="Password Confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input type="password" className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       <Button type="submit" className=" w-full">Submit</Button>
      </form>
    </Form>
   <div className=" py-6">
   <fieldset className=" border-t-2 flex flex-col text-center items-center align-middle justify-center">
      <legend className=" self-center flex px-2 text-sm text-gray-800" >Or Log in with</legend>
      <div className=" py-4 w-full ">
        <button className=" rounded-md flex space-x-3 items-center justify-center bg-white py-2 border-2  border-gray-300 w-full ">
         <p className=" text-md"> Log in with Google</p>
         <FcGoogle size={23} />
        </button>
      </div>
    </fieldset>
   </div>
    </div>
  )
}
