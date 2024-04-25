import Link from 'next/link'
import React from 'react'

export const HomeAbout = () => {
  return (
    <div className=' w-full bg-white py-10'>
        <div className=" max-w-4xl mx-auto">
            <div className=" grid grid-cols-2">
                <div className=" flex flex-col space-y-4">
                    <h1 className=' text-2xl font-poppins border-b-2 w-1/2 py-1 border-yellow-500 font-semibold'> Who We Are </h1>
                    <p className=' text-justify'>
                    We are Nigeria’s top and most reliable construction company with over 10,000 
                    happy customers across the nation. We are now venturing into constructional 
                    crowdfunding business model to give our customers the ability to own a share assets of a big projects 
                    with their little capital and receive large investment return. 
                    </p>
                    <div className=" py-3 font-poppin font-semibold ">
                    <Link href={''} className=' px-6 bg-gray-300 py-2'> Learn More </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
