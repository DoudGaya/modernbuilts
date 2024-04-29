import React from 'react'
import loginBannerImage from '@/public/img/banner-image.jpg'

const page = () => {
  return (
    <div className=' h-[100vh] grid grid-cols-3 w-full'>
        <div style={{
            backgroundImage: `url(${loginBannerImage.src})`
        }} className=" col-span-2 h-full bg-cover bg-center ">
        </div>
        <div className=" flex items-center justify-center px-10 py-10">
             
        </div>
    </div>
  )
}

export default page