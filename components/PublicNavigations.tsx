import React from 'react'
import Link from 'next/link'

export const PublicNavigations = () => {
  return (
<>
<div className=' w-full bg-white hidden lg:flex border-b fixed left-0 top-0 py-4'>
    <nav className=" max-w-6xl mx-auto w-full flex justify-between">
      <div className="">HElLO </div>
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
<div className=" w-full border-b shadow-sm bg-white px-10 py-3">
    <div className=" flex justify-between">
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
        </button>
    </div>
</div>
</>
  )
}
