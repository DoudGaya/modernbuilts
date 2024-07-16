import React, { ReactElement } from 'react'
import icon1 from '@/public/img/icons/create-an-account.svg'
import icon2 from '@/public/img/icons/select-a-project.svg'
import icon3 from '@/public/img/icons/fund-a-project.svg'
import icon4 from '@/public/img/icons/wait-for-a-return.svg'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'


interface Icons {
    id: number
    title: string
    message: string
    icon: StaticImageData
}

const icons = [
    {
        id: 1,
        title: "Create an Account",
        icon: icon1,
        message: "Sign up to our secure and web application to be able to track your investment. Our technology is end-to-end encrypted."
    },
    {
        id: 2,
        title: "Choose a project",
        icon: icon2,
        message: "Chose from all the available projects that best suits your interest. We provide comprehensive details on all options "
    },
    {
        id: 3,
        title: "Fund a Project",
        icon: icon3 ,
        message: "After careful selection of a project. Buy in multiples of share units. Each project have its unique unit price and investment returns"
    },
    {
        id: 4,
        title: "Wait for your Payout",
        icon: icon4,
        message: "Wait for the payout day to get your return on investment (ROI). While you wait you can visit or monitor project progress"
    }

]

export const HomeIcons = () => {
  return (
    <div className=' w-full flex flex-col py-20 px-10 lg:px-0'>

        <div className=" text-center items-center flex flex-col justify-center py-6 max-w-4xl mx-auto w-full">
           <h1 className=' text-2xl font-semibold'> Follow these Easy Steps to get Started </h1>
           <hr className=' w-2/12 border-b-2 border-black my-4' />
        </div>
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-6xl">
            {
                icons.map(( icon: Icons ) => {
                    return (
                        <div key={icon.id} className=" flex items-center space-y-4 justify-center text-center flex-col">
                            <Image className=' h-20' src={ icon.icon } alt='' height={1000} width={1000} />
                            <p className=' font-semibold'>{ icon.title }</p>
                            <p className=' text-sm'> {icon.message}</p>
                        </div>
                    )
                })
            }
        </div>
       <div className=" flex items-center justify-center py-10">
            <div className=" py-3 font-poppin font-semibold ">
                <Link href={'/about'} className=' px-8 bg-yellow-400 rounded-md py-3'> Learn More </Link>
            </div>
       </div>
    </div>
  )
}
