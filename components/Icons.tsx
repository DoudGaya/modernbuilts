import React, { ReactElement } from 'react'
import icon1 from '@/public/img/icons/create-an-account.svg'
import icon2 from '@/public/img/icons/select-a-project.svg'
import icon3 from '@/public/img/icons/fund-a-project.svg'
import icon4 from '@/public/img/icons/wait-for-roi.svg'
import Image, { StaticImageData } from 'next/image'


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

export const Icons = () => {
  return (
    <div className=' w-full flex flex-col py-20'>
        <div className=" text-center w-full">
           <h1> </h1>
        </div>
        <div className=" mx-auto grid grid-cols-4 gap-10 max-w-6xl">
            {
                icons.map(( icon: Icons ) => {
                    return (
                        <div className=" flex items-center space-y-4 justify-center text-center flex-col">
                            <Image className=' h-20' src={ icon.icon } alt='' height={1000} width={1000} />
                            <p className=' font-semibold'>{ icon.title }</p>
                            <p className=' text-sm'> {icon.message}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
