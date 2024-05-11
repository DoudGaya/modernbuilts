import React from 'react'
import aboutImage from '@/public/city-view.jpg'
import Link from 'next/link'

export const ContactBanner = () => {
  return (
    <div style={{
      backgroundImage: `url(${aboutImage.src})`
    }} className=" bg-gray-900/90 pt-10 text-yellow-500 bg-no-repeat bg-cover bg-center bg-blend-multiply w-full">
      <div className=" mx-auto w-full max-w-6xl py-20 px-10">
         <div className=" flex spacve-x-3 w-full justify-center lg:justify-start items-center lg:items-start text-center">
         <h1>
            <Link href={""}  className=" font-semibold">{"HOME"}</Link> 
          </h1>
         <p className=' mx-2'> {" < "} </p>
          <h1 className=" font-semibold">
            {"CONTACT"}
          </h1>
         </div>
      </div>
    </div>
  )
}
