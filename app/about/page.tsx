import { PageProps } from '@/.next/types/app/layout'
import React from 'react'
import Link from 'next/link'

const page = ( {params}: any ) => {
  return (
    <div>
      <div className=" bg-yellow-500 w-full">
        <div className=" mx-auto w-full max-w-6xl py-20 px-10">
           <div className=" flex spacve-x-3 ">
           <h1>
              <Link href={""}  className=" font-semibold">{"HOME"}</Link> 
            </h1>
           <p className=' mx-2'> {" < "} </p>
            <h1 className=" font-semibold">
              {"ABOUT"}
            </h1>
           </div>
        </div>
      </div>

      <div className=" w-full py-10">
      <div className=" mx-auto w-full gap-6 grid grid-cols-2 max-w-4xl ">
       <div className=" space-y-3">
        <h1 className=' text-2xl font-bold '>
            We are <span className=' text-yellow-600'>Reliable</span> We are  <span className=' text-yellow-600'> Trustworthy</span> and we get things done. 
          </h1>
          <p>
          Our team of experts is dedicated to ensuring that each project is planned and executed to the highest standards, with a focus on quality and safety. We are committed to providing our investors with a 
          transparent and reliable investment experience, so you can feel 
          confident in your decision to invest with us.
          </p>
       </div>
       <div className="">
        
       </div>
      </div>
      </div>
    </div>
  )
}

export default page