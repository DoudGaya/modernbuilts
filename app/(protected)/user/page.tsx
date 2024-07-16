"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import DashboardBanner from '@/public/stablebricks_calipha.svg'
import { signOut } from 'next-auth/react'

const settings = () => {

  const session = useSession()

  const logOut = () => {
    signOut()
  }

  return (
    <div className='w-full h-full bg-gray-50 items-center justify-center'>
       <div className=" flex flex-col items-center px-10 py-20 ">
        <Image src={DashboardBanner} height={700} width={700} className='h-[400px] object-contain w-full' alt="" />
        { JSON.stringify(session) }
          <Button onClick={logOut} type='submit' className=" bg-primary px-6">Sign Out</Button>
       </div>
    </div>
  )
}

export default settings