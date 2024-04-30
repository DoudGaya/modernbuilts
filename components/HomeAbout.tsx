import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WhatWeDo from '@/public/img/home-yellow.svg'
import { Button } from './ui/button'

export const HomeAbout = () => {
  return (
<div className=" flex flex-col">
      <div className=" w-full bg-yellow-400">
      <div className=" grid grid-cols-4 gap-6 py-10 max-w-5xl mx-auto ">
          <h1 className=' text-xl font-sans font-bold'>
            Nigeria's most trusted real estate company
          </h1>
          <p className=' col-span-2'>
            We provide the best oppotunity for our customers to start a real estate business with 0% risk, high return on investment ( ROI ) and with a little capital
          </p>
      </div>
      </div>
      <div className=' w-full bg-white py-10 '>
          <div className=" max-w-6xl mx-auto">
              <div className=" grid grid-cols-1 gap-6 py-10 lg:grid-cols-2">
                  <div className=" flex justify-center px-10 flex-col space-y-4">
                      <h1 className=' text-3xl font-poppins border-b-2 w-1/2 py-1 border-yellow-500 font-semibold'> Who We Are </h1>
                      <p className=' text-justify text-lg'>
                      We are Nigeria’s top and most reliable construction company with over 10,000 
                      happy customers across the nation. We are now venturing into constructional 
                      crowdfunding business model to give our customers the ability to own a share assets of a big projects 
                      with their little capital and receive large investment return. 
                      </p>
                      <div className=" py-3 font-poppin font-semibold ">
                          <Link href={'/about'} className=' px-6 bg-yellow-400 rounded-md py-2'> Learn More </Link>
                      </div>
                  </div>
                  <div className="">
                    <Image src={WhatWeDo} alt='' />
                  </div>
              </div>
          </div>
      </div>
</div>
  )
}
