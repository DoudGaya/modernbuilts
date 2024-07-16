import React from 'react'
import zaks from '@/public/img/ceo-zaks.jpeg'
import daddy from '@/public/img/founder1.jpg'
import mejarks from '@/public/img/mejarks-works.jpg'
import Image, { StaticImageData } from 'next/image'


interface Founder {
    id: number
    name: string
    profession: string
    designation: string
    img: StaticImageData
}

interface Team {
    
}
const founders = [
    {
        id: 1,
        name: "Engr. Muhammad Zakari",
        profession: "Civil Engineer",
        designation: "Chief Executive Officer",
        img: zaks
    },  
    {
        id: 2,
        name: "Engr. Abdulrahman Dauda",
        profession: 'Software Engineer',
        designation: "Managing Director",
        img: daddy
    },
    {
        id: 3,
        name: "Arc. Abubakar Zubair",
        profession: 'Architect',
        designation: "Director, Works",
        img: mejarks
    }
]

export const TheTeam = () => {
  return (
    <div className=' w-full bg-white py-10'>
    <div className=" flex flex-col justify-center mx-auto py-10 space-y-10  max-w-7xl">
        <h1 className=' text-2xl font-poppins text-center '>Meet the Founders</h1>
        <div className=" w-full grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3  py-3">
                {
                    founders.map(( founder: Founder ) => {
                        return (
                            <div key={ founder.id} className=" flex flex-col space-y-6 md:space-y-0 items-center text-center space-x-4 ">
                                <div className=" h-[120px] w-[120px] rounded-full my-6 ">
                                    <Image src={founder.img} className=' h-[120px] w-[120px] object-cover rounded-full shadow-inner' alt='Stable Bricks CEO' />
                                </div>
                                <div className=" flex flex-col justify-center">
                                    <span className='text-sm'> <span>{ founder.profession}</span> / { founder.designation } </span>
                                    <p className=' font-semibold  text-yellow-900'> { founder.name.toUpperCase() } </p>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    </div>
    </div>
  )
}
