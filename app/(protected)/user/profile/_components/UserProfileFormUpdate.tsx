"use client"
import React, {useState} from 'react'
import { User } from '@prisma/client'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useTransition } from 'react'
import { profileRecordsUpdate } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { BeatLoader } from 'react-spinners'
import { useSession } from 'next-auth/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'
import Link from "next/link";
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes";
import Image from 'next/image'

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
import { SettingsSchema } from '@/lib/schema'
import { File } from 'buffer'

export const UserProfileFormUpdate = ( {editModal, changeModal}: {editModal: string, changeModal: any}) => {

    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const {update} = useSession()
    const [terms, setTerms] = useState<boolean> (false)
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState < string | undefined>('')
    const [image, setImage] = useState<File | undefined>()

     
   
    const form = useForm<z.infer<typeof SettingsSchema>>({
      resolver: zodResolver(SettingsSchema),
      defaultValues: {
       name: user?.name || undefined,
       email: user?.email || undefined,
       phone: user?.phone || undefined,
       image: user?.image || undefined
      },

    })     

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };
    
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {


      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
        const base64Image = reader.result?.toString().split(',')[1];
          startTransition(() => {
              profileRecordsUpdate(
              {
                ...values, 
                image: base64Image
              }
              )
              .then((data) => {
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
      }

     if (!image) {

      // console beginig 

        startTransition(() => {
            profileRecordsUpdate({...values, image: undefined})
            .then((data) => {
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
      //console end
     }
    }
    if (editModal === "profile") {
        return (
           <div className=" flex flex-col space-y-4 h-fit shadow-sm w-full  bg-white rounded-lg">
           <div className="font-poppins flex justify-between text-xl px-4 bg-primary rounded-t-lg py-4">
            <h2 className=''>Update Profile Details</h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
           </div>
             <div className='w-full flex-col'>
             <div className=" flex py-6 flex-col p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=' flex flex-col p-4 rounded-md border border-dotted items-center justify-center text-center space-y-4'>
                          <div className="">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                          </svg>
                          </div>
                        <FormControl className=' w-full items-center justify-center text-center flex'>
                          <Input disabled={isPending} type='file' onChange={handleImageChange} className=" border-none" placeholder="Name" />
                        </FormControl>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} className=" outline-yellow-500" placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className=" grid grid-cols-2 gap-2">
                    {user?.isOAuth === false && (
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
                    )}
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
                  { success ?  <FormSuccess message={success} /> ? error : <FormError message={error} /> : "" }
                  <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-black/80 text-black w-full">Update My Records</Button> 
                </form>
              </Form>
             </div>               
            </div>
           </div>
          )
    }
 
}
