import React from 'react'
import Image from 'next/image'
import authImage from '@/public/img/home-yellow.svg'
import { PublicNavigations } from '@/components/PublicNavigations'
import { RoleGate } from '@/components/auth/RoleGate'
import { UserRole } from '@prisma/client'

const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (

     <>
    <PublicNavigations />
    <div className=' flex flex-row  items-center max-w-7xl mx-auto justify-center h-[90vh] w-full'>
      <div className=" hidden lg:block  w-8/12 ">
        <Image src={authImage} className='h-[400px] object-contain' alt='' />
      </div>
        <div className=" flex lg:w-4/12 w-full  items-center rounded-md  justify-center px-10 py-10">
            {children}
        </div>
    </div>
    </>
  )
}

export default AuthLayout