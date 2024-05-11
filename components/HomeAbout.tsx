import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WhatWeDo from '@/public/img/home-yellow.svg'
import { Button } from './ui/button'

export const HomeAbout = () => {
  return (
<div className=" flex flex-col">
      <div className=" w-full bg-yellow-400">
      <div className=" grid px-10 lg:divide-x-4 lg:divide-y-0 divide-y-2 divide-black lg:px-0 lg:grid-cols-4 grid-cols-1 gap-3 py-10 max-w-5xl mx-auto ">
          <div className=" flex items-center space-x-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 flex-none h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
            <h1 className=' text font-sans font-bold'>
              Nigeria's most trusted real estate company
            </h1>
          </div>
          <p className=' text-base font-sans col-span-3 py-3 lg:py-0 lg:px-6'>
            We provide the best oppotunity for our customers to start a real estate business with 0% risk, high return on investment ( ROI ) and with a little capital
          </p>
      </div>
      </div>
      <div className=' w-full bg-white py-10 '>
          <div className=" max-w-6xl mx-auto">
              <div className=" grid grid-cols-1 gap-6 py-10 lg:grid-cols-2">
                  <div className=" flex justify-center px-10 flex-col space-y-4">
                      <h1 className=' text-2xl lg:text-3xl font-poppins py-1  font-semibold'> Welcome to StableBricks </h1>
                      <p className=' text-justify text-lg'>
                          {/* We are Nigeria’s top and most reliable construction company with over 10,000 
                          happy customers across the nation. We are now venturing into constructional 
                          crowdfunding business model to give our customers the ability to own a share assets of a big projects 
                          with their little capital and receive large investment return.  */}

                          At StableBricks, we believe in democratizing real estate investment. 
                          Our mission is to empower individuals by giving them the opportunity to own a 
                          share of prime real estate projects. Whether you’re an experienced investor or a 
                          first-time buyer, we’re here to make property ownership accessible, 
                          transparent, and rewarding.

                      </p>
                      <div className=" py-3 font-poppin flex w-full text-center font-semibold ">
                          <Link href={'/about'} className=' w-full lg:max-w-max px-6 bg-yellow-400 rounded-md py-2'> Learn More </Link>
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
