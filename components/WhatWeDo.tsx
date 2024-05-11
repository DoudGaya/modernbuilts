import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Poppins } from 'next/font/google'
import WhatWeDo from '@/public/img/home-yellow.svg'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import bg from '@/public/img/bg.jpg'

// images 
import completed from '@/public/img/completed_homes.jpg'
import site from '@/public/img/construction-site.jpg'
import unCompleted from '@/public/img/uncompleted.jpg'
import slideer1 from '@/public/img/slider1.jpeg'

const poppins = Poppins({
    subsets: ["latin"],
    weight: "600"
})

export const HomeWhatWeDo = () => {
  return (
<div style={{
  backgroundImage: `url(${bg.src})`
}} className=" flex flex-col w-full bg-cover bg-no-repeat bg-fixed bg-blend-overlay bg-center bg-yellow-50">
      <div className=' w-full '>
          <div className=" max-w-6xl mx-auto">
            {/* THE CROWDFUNDING */}
              <div className=" grid grid-cols-1 gap-6 py-10 lg:grid-cols-2">
                  <div className=" grid grid-cols-1 md:grid-cols-2 px-10 gap-6  lg:h-[400px] rounded-2xl ">
                      <Image src={site} className=' bg-stone-800 bg-blend-overlay object-cover object-center rounded-2xl lg:mt-10 h-[300px]' alt='' />
                      <Image src={unCompleted} className=' bg-stone-800 bg-blend-overlay object-cover object-center rounded-2xl lg:-mt-10 h-[300px]' alt='' />
                  </div>
                  <div className=" flex justify-center px-10 flex-col space-y-4">
                    <div className="">
                      <h1 className=' text-2xl lg:text-3xl font-poppins font-semibold'>Real Estate Crowdfunding</h1>
                      <small className=' uppercase font-semibold '>Invest with Confidence</small>
                    </div>
                      <p className=' text-justify text-lg'>
                      We carefully select high-potential real estate projects, from residential 
                      developments to commercial spaces. As an investor, you can browse our listings, 
                      choose the projects that resonate with you, and buy shares. Your investment grows 
                      alongside the property value, and you receive dividends once the project is complete.
                      </p>
                      <div className=" py-3 font-poppin w-full flex max-w-max font-semibold ">
                          <Link href={'/register'} className=' px-6 bg-yellow-400 w-full rounded-md py-2'> Get Started  </Link>
                      </div>
                  </div>
                 
              </div>
              {/* end of crowdfunding */}
              <div className=" grid grid-cols-1 gap-6 py-10 lg:py-20 lg:grid-cols-2">
                    <div className=" flex justify-center px-10 flex-col space-y-4">
                        <div className=" flex flex-col items-start">
                        <h1 className=' text-2xl lg:text-3xl font-poppins font-semibold'>Property Development</h1>
                        <small className=' uppercase font-semibold '>Creating Value</small>
                        </div>
                        <p className=' text-justify text-lg'>
                        Our team of architects, engineers, and designers work tirelessly to create exceptional buildings. 
                        From concept to completion, we focus on quality, 
                        sustainability, and innovation. When you invest in a StableBricks project, you’re 
                        investing in a vision that adds value to the community.
                        </p>
                        <div className=" py-3 font-poppin w-full max-w-max font-semibold ">
                            <Link href={'/register'} className=' px-6 bg-yellow-400 rounded-md py-2'> Get Started  </Link>
                        </div>
                    </div>
                    <div className=" grid grid-cols-2 gap-3 md:gap-6 px-3 h-[400px] rounded-2xl ">
                        <Image src={completed} className=' bg-stone-800 bg-blend-overlay object-cover object-center rounded-2xl mt-10 h-full' alt='' />
                        <Image src={slideer1} className=' bg-stone-800 bg-blend-overlay object-cover object-center rounded-2xl -mt-10 h-full' alt='' />
                    </div>
              </div>
          </div>
      </div>
      
</div>
  )
}
