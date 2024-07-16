import React from 'react'
import home1 from '@/public/img/home1.jpeg'
import home2 from '@/public/img/home2.jpeg'
import home3 from '@/public/img/home3.jpeg'
import home4 from '@/public/img/home4.jpeg'
import Image from 'next/image'
import Link from 'next/link'


const homes = [
    {
        id: 1,
        img: home1,
    },
    {
        id: 2,
        img: home2,
    },
    {
        id: 3,
        img: home3,
    },
    {
        id: 4,
        img: home4,
    },
]

export const HomeSales = () => {
  return (
    <div className=" w-full bg-yellow-50 py-10 px-10 flex flex-col">
        <div className=" flex flex-col items-center space-y-4 text-center">
          <div className="">
            <h2 className=' text-md uppercase text-yellow-600'>Building Sales</h2>
            <p className=' text-3xl font-poppins'>Your Dream Home Awaits</p>
          </div>
            <p className=' max-w-3xl font-poppins'>
                Explore our portfolio of finished buildings. 
                Whether you’re looking for a cozy apartment or a spacious villa, 
                StableBricks has something for everyone. Our properties are designed 
                for comfort, aesthetics, and functionality
            </p>
        </div>
        <div className=" mx-auto grid grid-cols-1 gap-5 py-6 lg:grid-cols-4 max-w-6xl">
                {
                    homes.map((home) => {
                        return (
                            <div key={ home.id} className=" relative overflow-hidden group cursor-pointer rounded-md">
                                <Image src={home.img} className=' h-[250px] group-hover:scale-125 duration-300 transform ease-in-out delay-150 w-full object-cover' alt='' />
                            </div>
                        )
                    })
                }
        </div>  
        <div className=" w-full flex justify-center items-center text-center">
            <Link href={'/portfolio'} className=' text-black bg-primary px-6 py-2 rounded-lg'>
                Explore More
            </Link>
        </div> 
    </div>
  )
}
