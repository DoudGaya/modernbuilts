"use client"
import React from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { User } from '@prisma/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


// @ts-ignore
export const UserProfileDetails = ({ changeModal }) => {
    const user = useCurrentUser()


    if (!user) {
        return;
    }
  return (
  <div className=" flex h-full w-full">
      <div className='w-full p-3 bg-white dark:bg-stone-950 shadow-sm rounded-lg flex flex-col'>
        <div className=" flex flex-col w-full py-8 space-y-6 items-center justify-center">
           <div className=" flex flex-col items-center space-y-3 justify-center">
                <div className=" flex flex-col items-center space-y-3 justify-center">
                        <div className=" h-[90px] w-[90px] rounded-full overflow-hidden border-4 border-primary ">
                            { user.image ? <Image height={1000} width={1000} src={ user.image } className=' object-center object-cover w-full h-full rounded-full' alt='' />  : (
                                <div className=" w-full h-full text-lg  flex items-center justify-center rounded-full bg-white font-poppins">
                                    SB
                                </div>  
                            )}
                        </div>
                <div className=" flex flex-col items-center justify-center">
                    <p className=' text-xs'>Private Investor </p>
                    <h3 className=' font-poppins text-lg font-semibold text-primary'> { user.name } </h3>
                </div>
                </div>
                <div className=" divide-x rounded-md bg-[#FFFCF8] dark:bg-stone-900 py-1 px-3 border-2 border-gray-200/50 grid gap-2 grid-cols-2">
                    <div className=" flex flex-col justify-center w-full text-center">
                        <p className=' text-2xl font-semibold font-poppins'>20</p>
                        <span className=' text-xs font-poppins'>active project</span>
                    </div>
                    <div className=" flex flex-col justify-center w-full text-center">
                        <p className=' text-2xl font-semibold font-poppins'>30</p>
                        <span className=' text-xs font-poppins'>Investment</span>
                    </div>
                </div> 
           </div>
           <div className=" flex flex-col w-full space-y-3">
            {/* PERSONAL DETAILS */}
                <div className=" rounded-lg space-y-3 py-2 px-3 w-full flex flex-col">
                    <p className=' font-semibold text-gray-700 text-sm'>Personal Details</p>
                    <div className=" flex justify-between w-full">
                        <div className=" flex flex-col">
                            <p className=' text-gray-600 text-sm'>Email</p>
                            <p className=' font-semibold text-sm text-gray-600'> { user.email } </p>
                        </div>
                        <div className=" flex flex-col text-end">
                            <p className=' text-gray-600 text-sm'>Phone</p>
                            <p className=' font-semibold text-sm text-gray-600'> { user.phone || "Not Available" } </p>
                        </div>
                    </div>
                </div>
            {/* ACCOUNT DETAILS */}
                <div className=" rounded-lg space-y-3 py-2 px-3 w-full flex flex-col">
                    <p className=' font-semibold text-gray-700 text-sm'>Account Details</p>
                    <div className=" flex justify-between w-full">
                        <div className=" flex flex-col">
                            <p className=' text-gray-600 text-sm'>Bank Name</p>
                            <p className=' font-semibold text-sm text-gray-600'> { "GT Bank" } </p>
                        </div>
                        <div className=" flex flex-col text-end">
                            <p className=' text-gray-600 text-sm'>Account Number</p>
                            <p className=' font-semibold text-sm text-gray-600'> {user.phone || "Not Available"} </p>
                        </div>
                    </div>
                </div>
                        {/* SECUTIRY DETAILS */}
                <div className=" rounded-lg  space-y-3 py-2 px-3 w-full flex flex-col">
                    <p className=' font-semibold text-gray-700 text-sm'>Account Details</p>
                    <div className=" flex justify-between w-full">
                        <div className=" flex flex-col text-start justify-center ">
                            <p className='text-gray-600 text-sm font-semibold'>2FA Authentication</p>
                            <p className='text-xs text-gray-600'> Enable 2 Factor authentication for your Account</p>
                        </div>
                        <div className=" flex flex-col h-full items-center justify-center">
                            <p className=' text-gray-600 font-semibold text-sm'>
                                {user.isTwoFactorEnabled ? "ON" : "OFF"}
                            </p>
                        </div>
                    </div>
                </div>
           </div>
        </div>
       <div className="w-full grid grid-cols-2 gap-x-2 ">
            <Button className=' w-full bg-primary text-black dark:bg-primary dark:text-black' onClick={() => changeModal("profile")}>Edit Profile</Button>
            {! user?.isOAuth && (
            <Button className=' w-full hover:bg-black/70 bg-black text-primary dark:bg-primary dark:text-black' onClick={() => changeModal("security")}>Security Settings</Button>
            )}
       </div>
    </div>
  </div>
  )
}