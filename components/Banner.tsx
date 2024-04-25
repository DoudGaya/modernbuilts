import React from 'react'
import { PublicNavigations } from './PublicNavigations'
import bannerImage from '@/public/img/banner-image.jpg'
import bannerMan from '@/public/img/file.png'
import Image from 'next/image'
import Link from 'next/link'

export const Banner = () => {
  return (
    <>  
    <div className=" h-[100vh] bg-white overflow-hidden bg-blend-multiply" style={{
        backgroundImage: `url(${bannerImage.src})`
    }} >
        <PublicNavigations />
        <div className=" h-full w-full grid grid-cols-2  max-w-6xl mx-auto ">
            <div className=" h-full flex flex-col space-y-3 items-center justify-center  mx-auto">
                <h1 className=' text-4xl font-poppins font-bold'>Welcome to the Nigeria’s <span className=' bg-yellow-500 text-black transform skew-y-6'>#Top</span> Rated Construction Company</h1>
                <h3 className=' text-xl'>
                    We provide investment opportunities for people interested in property investment 
                </h3>
                <div className=" flex w-full">
                <Link className=' rounded-full font-semibold text-lg border-2 border-yellow-900 px-8 py-2 bg-yellow-500' href={''}>
                    Fund a Project
                </Link>
                </div>

            </div>
            <div className=" h-full w-full">
                <Image className=' h-full w-full object-center object-cover ' src={bannerMan} alt='Modern Built Consturcion Limited' />
            </div>
        </div>
    </div>
</>
)
}
