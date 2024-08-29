"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const DashboardProfile = () => {
  const user = useSession()
  return (
    <div className='bg-white rounded-xl justify-between flex flex-col dark:bg-neutral-900/95 text-white shadow-md p-10'>
      <div className=" flex flex-col space-y-4 justify-center">
         <div className="space-x-3 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center">
            <div className=" h-[120px] md:w-[70px] flex-none w-[120px] md:h-[70px] font-bold rounded-full items-center flex justify-center text-center text-black font-poppins border-4 border-primary ">
              SB
            </div>
              <div className=" flex flex-col space-y-1">
                  <span className='text-sm dark:text-[#8F8F8F] text-black/80 text-primary'>private investor</span>
                  <p className='font-poppins dark:text-primary text-black font-semibold text-xl'>{ user.data?.user.name }</p>
              </div>
         </div>
      </div>
      <p className=' text-sm text-[#8F8F8F] py-4 text-center md:text-start font-poppins'> Lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus similique aliquid laboriosam autem expedita dicta corporis repellat voluptates nam est. ipsum dolor sit amet consectetur adipisicing elit. Expedita ullam pariatur</p>
      <div className=" flex md:items-end space-x-2 md:justify-start items-center justify-center">
          {/* <Link href={''} className=' p-2 text-black flex space-x-1 items-center font-poppins font-semibold  rounded-xl bg-black py-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </Link> */}

        <Link href={''} className=' px-8 text-black flex space-x-1 items-center font-poppins font-semibold  rounded-xl bg-primary py-2'>
            <p>Profile</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
      </div>

    </div>
  )
}
