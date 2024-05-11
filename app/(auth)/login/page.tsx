import React from 'react'
import loginBannerImage from '@/public/img/banner-image.jpg'
import { LoginForm } from '@/components/auth/LogInForm'
import authImage from '@/public/img/home-yellow.svg'
import Image from 'next/image'

const page = () => {
  return (
    <div className=' flex flex-row  items-center max-w-7xl mx-auto justify-center h-[90vh] w-full'>
      <div className="  w-8/12 hidden lg:block ">
        <Image src={authImage} className='h-[400px] object-contain' alt='' />
      </div>
        <div className=" flex w-full lg:w-4/12 items-center rounded-md  justify-center px-10 py-10">
          <LoginForm />
        </div>
    </div>
  )
}

export default page