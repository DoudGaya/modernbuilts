"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'

const profileLinks = [
    '/user/profile'
]


const logout = () => {
    signOut()
}


export const TopNav = () => {

    const session = useSession()
    const user = session.data?.user.name
  return (
    <div className="hidden lg:flex justify-between bg-white drop-shadow-sm px-12 py-6 w-full">
    <div className="">Welcome to <span>Stablebricks</span> </div>
    <div className="">
      
      <Popover>
      <PopoverTrigger asChild>
        <div className='font-semibold cursor-pointer' >{user}</div>
      </PopoverTrigger>
      <PopoverContent align='start' className=" w-56 items-start justify-start self-start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Profile Settings</h4>


            <button onClick={logout} className='bg-black w-full py-3 rounded-lg font-semibold outline-none text-primary hover:bg-black/90'>Sign Out</button>

          </div>
        </div>
      </PopoverContent>
    </Popover>

    </div>
  </div>
  )
}
