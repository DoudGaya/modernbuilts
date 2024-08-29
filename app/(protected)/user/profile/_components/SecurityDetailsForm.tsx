"use client"
import React, {useState} from 'react'
import { User } from '@prisma/client'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useTransition } from 'react'
import { securityRecordsUpdate } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { BeatLoader } from 'react-spinners'
import { useSession } from 'next-auth/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { Switch } from "@/components/ui/switch"

import { z } from "zod"


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
import { settingsSecurityDetailsSchema } from '@/lib/schema'

export const SecurityDetailsForm = ( {editModal, changeModal}: {editModal: string, changeModal: any}) => {

    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const {update} = useSession()
    const [terms, setTerms] = useState<boolean> (false)
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState < string | undefined>('')

  
     
   
    const form = useForm<z.infer<typeof settingsSecurityDetailsSchema>>({
      resolver: zodResolver(settingsSecurityDetailsSchema),
      defaultValues: {
       oldPassword: undefined,
       newPassword: undefined,
       newPasswordConfirmation: undefined,
       isTwoFactorEnabled: undefined
      },
    })     

    const onSubmit = (values: z.infer<typeof settingsSecurityDetailsSchema>) => {
        startTransition(() => {
            securityRecordsUpdate(values).then((data) => {
              if (data.error) {
               setError(data.error)
              }
              if (data.success) {
               update()
               setSuccess(data.success)
               changeModal("")
              }
           })
        })
    }
    if (editModal == 'security') {
        return (
           <div className=" flex flex-col space-y-4 h-fit shadow-sm max-h-min w-full bg-white rounded-lg">
           <div className=" font-poppins flex justify-between px-4 text-xl bg-black text-primary rounded-t-lg py-4">
           <h2 className=''>Update Security Settings</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
           </div>
             <div className='w-full flex-col'>
             <div className=" flex py-6 flex-col p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} type='password' className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className=" grid gap-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} type='password' className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>

                <div className=" grid gap-2">
                    <FormField
                      control={form.control}
                      name="newPasswordConfirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input disabled={isPending} type='password' className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-4">
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem>
                       <div className=" flex justify-between items-center">
                       <div className=" flex flex-col">
                       <FormLabel>Two factor Authenication</FormLabel>
                       <FormDescription>Enable two Factor Authentication</FormDescription>
                       </div>
                        <FormControl>
                          <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                       </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                  { success ?  <FormSuccess message={success} /> ? error : <FormError message={error} /> : "" }
                  <Button type="submit" disabled={isPending} className=" bg-black hover:bg-black/80 text-primary w-full">Update Security Records</Button> 
                </form>
              </Form>
             </div>    
            </div>
           </div>
          )
    }
 
}
