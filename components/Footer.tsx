import Image from 'next/image'
import React from 'react'
import logo from '@/public/stable-bricks-white.png'
import Link from 'next/link'

interface SocialLinks {
    id: number,
    link: string 
    icon: string
}



export const Footer = () => {
  return (
    <div className=' w-full bg-black py-10 px-4 '>
        <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto py-10">
            <div className=" flex flex-col">
                <div className=" border-b-2 py-1">
                    <Image src={logo} className=' object-contain object-left flex-none h-20' alt='' />
                </div>
                <div className=" space-y-4 my-4">
                    {/* <h1 className=' font-poppins text-yellow-500  '>ABOUT US</h1> */}
                    <p className=' w-full text-sm text-justify text-white'>
                        We are Nigeria's most reliable construction company. We raise funds  from investors for a reliable and lucrative construction project in urban areas 
                        with no risk and high return on investment. 
                    </p>
                </div>
                <div className=" flex flex-row space-x-2">
                    Follow us: Social media links
                </div>
            </div>
                <div className=" text-white font-poppins lg:pr-10">
                <div className=" space-y-4 my-4">
                    <h1 className=' font-poppins text-3xl text-yellow-500  '>useful Links </h1>
                  <ul className=' flex flex-col space-y-3'>
                    <li>
                        <Link className=' flex space-x-3 items-center hover:text-yellow-600 transition-all ease-in-out' href={'/'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>HOME</p>
                        </Link>
                    </li>
                    <li>
                        <Link className=' flex space-x-3 items-center hover:text-yellow-600 transition-all ease-in-out' href={'/about'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>ABOUT</p>
                        </Link>
                    </li>
                    <li>
                        <Link className=' flex space-x-3 items-center hover:text-yellow-600 transition-all ease-in-out' href={'/contact'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>CONTACT</p>
                        </Link>
                    </li>
                    <li>
                        <Link className=' flex space-x-3 items-center hover:text-yellow-600 transition-all ease-in-out' href={'/blog'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>BLOG</p>
                        </Link>
                    </li>
                    <li>
                        <Link className=' flex space-x-3 items-center hover:text-yellow-600 transition-all ease-in-out' href={'/store'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            <p>STORE</p>
                        </Link>
                    </li>
                  </ul>
                </div>
                </div>
                <div className=" flex flex-col text-white space-y-4">
                    <div className="">
                        <h1 className=' text-2xl text-yellow-500'>Office Location:</h1>
                        <p>Hamisu Abba Plaza, Tarauni, Kano</p>
                        <p>Contact: 080 6224 9834 </p>
                    </div>
                <iframe className=' w-full rounded-md' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31223.64261811877!2d8.515904689540227!3d11.977593059661778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8199ae590507%3A0x466f5cb1734cb983!2sTarauni%2C%20Kano%20700102%2C%20Kano!5e0!3m2!1sen!2sng!4v1714818643021!5m2!1sen!2sng" 
                 height="200" style={{border:"10px"}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
        </div>
    </div>
  )
}
