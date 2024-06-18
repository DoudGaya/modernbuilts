import React from 'react'
import { auth } from '@/auth'
import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import DashboardBanner from '@/public/stablebricks_calipha.svg'

const settings = async (  ) => {




  const session = await auth()
  return (
    <div className='w-full h-full bg-gray-50 items-center justify-center'>

       <div className=" flex flex-col items-center px-10 py-20 ">
        <Image src={DashboardBanner} height={700} width={700} className='  h-[400px] object-contain w-full' alt="" />
       <form action={ async () => {
          "use server"
          await signOut()
        }}>
          <Button type='submit' className=" bg-primary px-6">Sign Out</Button>
        </form>
       </div>
    </div>
  )
}

export default settings