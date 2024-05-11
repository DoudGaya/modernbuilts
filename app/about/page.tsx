import { AboutBanner } from '@/components/about/AboutBanner'
import { AboutWelcome } from '@/components/about/AboutWelcome'
import React from 'react'
import stablebricks from '@/public/stablebricks.png'
import Image from 'next/image'
import Link from 'next/link'
import { TheTeam } from '@/components/TheTeam'
import { WhatWeDoAbout } from '@/components/about/WhatWeDoAbout'




const page = ({ params }: any ) => {
  return (
    <div>
      <AboutBanner />
      <div className=" w-full flex flex-col py-20 border">
        <div className=" flex flex-col space-y-4 mx-auto max-w-4xl w-full px-10 items-center text-center ">
         <div className=" flex ">
          <Image src={stablebricks} className=' h-20 object-contain object-center' alt='Stable Bricks Logo ' />
         </div>
          <p className=' text-lg'>
            We envisions a world where everyone can participate in real estate growth. 
            We’re committed to transparency, integrity, and sustainable development. 
            Join us on this exciting journey!
          </p>
          <Link href={'/signup'} className=' w-full font-semibold lg:max-w-max px-6 bg-primary py-2 rounded-lg'>Sign Up Now</Link>
        </div>
      </div>
      <AboutWelcome />
      <WhatWeDoAbout />
      <div className="">
        <TheTeam />
       </div>
    </div>
  )
}

export default page