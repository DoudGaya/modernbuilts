import React from 'react'
import skyScrapper from '@/public/stablebricks_calipha.svg'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex flex-col items-center w-full h-full text-center space-y-3 justify-center'>
    <Image src={skyScrapper} height={600} width={600} className=' h-[400px] w-[400px] object-contain' alt='Stablebricks Inc' />
    <p className=' text-2xl font-poppins bg-gray-200/70 rounded-md text-gray-700 px-2 py-1'>There is currently no active project</p>
    <Link href={'/user/dashboard'} className=' px-6 py-2 text-lg rounded-lg font-poppins bg-primary'>Go Home</Link>
</div>
  )
}

export default page