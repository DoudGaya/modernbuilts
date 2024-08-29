import Link from 'next/link'
import React from 'react'


export interface DashboardTopcardProps {
    title: string
    icon: React.ReactNode
    amount: number
    urlTo: string
}

export const DashboadTopCard = ( {
    title,
    icon,
    amount,
    urlTo
}: DashboardTopcardProps) => {


  let formatterAmount = amount.toLocaleString()

  return (
    <div className=' w-full bg-white dark:bg-neutral-900/95 dark:border dark:border-neutral-800 dark:text-white shadow-lg pt-6 rounded-xl flex flex-col space-y-3'>
      <div className=" flex flex-col w-full px-3 space-y-2">
      <div className=" flex justify-between w-full  items-center">
        <p className=' font-poppins text-sm'> {title} </p>
        <div className=" stroke-primary">
          { icon }
        </div>
      </div>
      <div className=" w-full flex ">
         <p className=' text-2xl font-semibold'> { formatterAmount }</p>
      </div>
      </div>
      <Link href={urlTo} className=' w-full bg-black text-primary py-2  rounded-b-xl items-center justify-center flex space-x-3'>
        <p>Details</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" py- text-primary stroke-primary size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </Link>
    </div>
  )
}
