import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/stablebricks.png'



import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"


  const navLinks = [
    {
        id: 1,
        name: 'HOME',
        url: "/",
        icon: ""
    },
    {
        id: 1,
        name: 'ABOUT',
        url: "/about",
        icon: ""
    },
    {
        id: 1,
        name: 'CONTACT',
        url: "/contact",
        icon: ""
    },
  ]

  const auth = [
    {
        id: 1,
        name: 'Log In',
        url: "/login",
        icon: ""
    },
    {
        id: 2,
        name: 'Sign Up',
        url: "/register",
        icon: ""
    },
  ]

  


export const PublicNavigations = () => {
  return (
<>
    <div className=' w-full bg-white hidden lg:flex border-b fixed left-0 top-0 py-4'>
        <nav className=" max-w-6xl mx-auto w-full flex justify-between">
        <Link href={'/'} className="">
            <Image src={logo} alt='stable Bricks Logo' className=' h-10 object-left object-contain' />
        </Link>
            <div className=" flex divide-x-2 divide-yellow-500 items-center">  
                    <div className=" mx-2">
                        <Link
                            href={'/'}
                            className="rounded-md font-poppins font-semibold px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Home
                        </Link>
                        <Link
                            href={'about'}
                            className="rounded-md font-poppins font-semibold px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            About
                        </Link>
                        <Link
                            href={'contact'}
                            className="rounded-md font-poppins font-semibold px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className=" px-3 flex items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>
                        <div className="">
                        <Link
                                href={'signup'}
                                className="rounded-md font-poppins font-semibold px-2 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                            Register
                            </Link>
                            <Link
                                href={'login'}
                                className="rounded-md font-poppins font-semibold px-2 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                            Log In
                            </Link>
                        </div>
                    </div>
            </div>
    </nav>
    </div>

    <Sheet>
    <   div className=" w-full md:hidden border-b flex justify-between shadow-sm z-10 items-center fixed left-0 top-0 bg-white px-8 py-3">
            <Link href={'/'}>
                <Image src={logo} alt='stable Bricks Logo' className=' h-10 object-left object-contain' />
            </Link>
            <div className=" flex justify-between">
                <SheetTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </SheetTrigger>
            </div>
        </div>
        {/* @ts-ignore */}
        <SheetContent side={'left'} className="">
            <SheetHeader>
            <SheetTitle className=" flex items-center  ">
                <div className=" px-2 flex items-center">
                    <Image alt='StableBrick Logo' className=' h-10 object-contain object-left' src={logo} />
                </div>
            </SheetTitle>
            <SheetDescription>
              <div className=" flex flex-col px-2 py-6 items-start space-y-4">
                {
                    navLinks.map((nav) => {
                        return ( 
                            <Link href={nav.url} className=' font-poppins font-semibold text-lg text-black hover:text-yellow-500'> 
                                <SheetTrigger>{nav.name}</SheetTrigger>
                            </Link>
                        )
                    })
                }
                <div className=" flex flex-col space-y-4 border-t-2 py-3 w-full ">
                    <Link href={'/signup'} className=" py-2 font-poppins font-semibold text-lg w-full rounded-lg bg-yellow-500 text-black">Resiter</Link>
                    <Link href={'/login'} className=" py-2 font-poppins font-semibold text-lg w-full rounded-lg border-2 border-yellow-500 text-black">Lon In</Link>
                </div>
              </div>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>

</>
  )
}


