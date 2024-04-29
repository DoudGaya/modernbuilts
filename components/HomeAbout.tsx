import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WhatWeDo from '@/public/img/what-we-do.svg'

export const HomeAbout = () => {
  return (
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
                        <Link href={''} className=' px-6 bg-gray-300 py-2'> Learn More </Link>
                    </div>
                </div>
                <div className="">
                  <Image src={WhatWeDo} alt='' />
                </div>
            </div>
        </div>
    </div>
  )
}
