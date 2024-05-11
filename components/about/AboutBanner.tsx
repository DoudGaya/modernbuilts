import React from 'react'
import aboutImage from '@/public/city-view.jpg'
import Link from 'next/link'

export const AboutBanner = () => {
  return (
    <div style={{
      backgroundImage: `url(${aboutImage.src})`
    }} className=" bg-gray-900/90 text-yellow-500 mt-10 bg-no-repeat bg-cover h-[200px] md:h-full bg-center bg-blend-multiply w-full">
      <div className=" mx-auto w-full max-w-6xl py-20 px-10 h-full flex align-baseline my-auto ">
         <div className=" flex space-x-3 h-full my-auto w-full justify-center lg:justify-start self-center items-center lg:items-start text-center">
            <h1><Link href={""}  className=" font-semibold">{"HOME < ABOUT"}</Link></h1>
         </div>
      </div>
    </div>
  )
}
