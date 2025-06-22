import React from 'react'
import { PublicNavigations } from './PublicNavigations'
import bannerImage from '@/public/img/banner-image.jpg'
import bannerMan from '@/public/img/file.png'
import Image from 'next/image'
import Link from 'next/link'
import { LoginButton } from './auth/loginButton'

export const Banner = () => {
  return (
    <>  
    <div className=" h-[100vh] bg-white overflow-hidden bg-no-repeat bg-cover bg-center bg-blend-multiply" style={{
        backgroundImage: `url(${bannerImage.src})`
    }} >
        <div className=" h-full w-full grid grid-cols-1 lg:grid-cols-2 px-8 pt-20 lg:py-0 max-w-6xl mx-auto ">
            <div className=" h-full flex flex-col space-y-3 items-center text-center lg:text-start justify-center mx-auto">
                <h1 className=' lg:text-4xl font-poppins text-2xl font-bold'>Join us and be Part of a Prime <span className=' bg-yellow-500 text-black transform skew-y-6'>Real Esate</span> Project</h1>
                <h3 className=' text-xl'>
                    We provide investment opportunities for people interested in property investment 
                </h3>                <div className=" flex w-full lg:justify-start justify-center">
                  <LoginButton>
                        <Link className=' rounded-full font-semibold text-lg border-2 border-yellow-900 px-8 py-2 bg-yellow-500' href={'/user/projects'}>
                                Start Investing
                        </Link>
                  </LoginButton>
                    
                </div>

            </div>
            <div className=" h-full w-full">
                <Image className=' h-full w-full object-center object-cover' src={bannerMan} alt='Modern Built Consturcion Limited' />
            </div>
        </div>
    </div>
</>
)
}
