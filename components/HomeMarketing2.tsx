import React from 'react'
import Image from "next/image";
import Link from "next/link";
import badAss from '@/public/img/female-engineer-standing-like-a-baddass.jpg'

export const HomeMarketing2 = () => {
  return (
    <div style={{
        backgroundImage: `url(${badAss.src})`
      }} className=" bg-fixed bg-cover  w-full h-full bg-stone-600/40 bg-blend-multiply">
       <div className="grid lg:grid-cols-2 max-w-5xl grid-cols-1 mx-auto w-full ">
        <div className="">

        </div>
          <div className=" flex flex-col bg py-20 bg-black/70 lg:bg-black/80 space-y-6 px-10 text-white">
           <div className=" space-y-2 ">
            <h1 className=" font-bold text-3xl ">The <span className=" text-yellow-400">secret</span> of <span className=" text-yellow-400">success</span> is doing it right</h1>
              <p className=" ">Make the right choice <span>Invest With US</span> </p>
           </div>

            <p className="">
            With our innovative model, you can invest in projects that you are passionate about
             and watch as they come to life. Once a project is completed and sold, we pay back our 
            investors their return on investment. It's a win-win situation for everyone involved!
            </p>
            <div className=" py-3 text-black font-poppin font-semibold ">
                  <Link href={''} className=' px-6 bg-yellow-400 rounded-md py-2'> Learn More </Link>
              </div>
          </div>
       </div>
      </div>
  )
}
