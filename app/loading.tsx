import React from 'react'
import logoicon from '@/public/img/logo-icon.png'
import Image from 'next/image'

const loading = () => {
  return (
    <div className=' h-screen w-full flex justify-center items-center'>
        <div className="">
            <Image src={logoicon} className=' h-16 w-16 animate-pulse' alt='' />    
        </div>
    </div>
  )
}

export default loading