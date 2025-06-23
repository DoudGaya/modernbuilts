"use client"
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/stablebricks.png"
import { useSession } from "next-auth/react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { DarkButton } from "./DarkButton"

// const navLinks = [
//   {
//     id: 1,
//     name: "HOME",
//     url: "/",
//     icon: "",
//   },
//   {
//     id: 2,
//     name: "ABOUT",
//     url: "/about",
//     icon: "",
//   },
//   {
//     id: 3,
//     name: "CONTACT",
//     url: "/contact",
//     icon: "",
//   },
// ]

const investmentLinks = [
  { name: "Investment Opportunities", url: "/investments", description: "Browse available investment projects" },
  { name: "Portfolio Tracker", url: "/portfolio", description: "Track your investments" },
  { name: "Investment Calculator", url: "/calculator", description: "Calculate potential returns" },
  { name: "Investor Relations", url: "/investor-relations", description: "Information for investors" },
]

const propertyLinks = [
  { name: "Property Listings", url: "/properties", description: "Browse all properties" },
  { name: "Property Search", url: "/properties/search", description: "Advanced property search"},
  { name: "Featured Properties", url: "/properties/featured", description: "Premium listings"},
]

const partnershipLinks = [
    { name: "Land Submissions", url: "/land-submissions", description: "Submit your land for development" },
    { name: "Developer Portal", url: "/developer", description: "For construction partners" },
]

const companyLinks = [
    { name: "Become a Partner", url: "/partnerships", description: "Join our partnership program" },
    { name: "Who We Are", url: "/about", description: "Learn more about us" },
    { name: "Contact Us", url: "/contact", description: "Send us a message or visit us.." },
//   { name: "Partnerships", url: "/partnerships", description: "For construction partners" },
]

export const PublicNavigations = () => {
  const { data: session } = useSession()
  const user = session?.user?.name

  return (
    <>
      <div className="w-full bg-white dark:text-gray-100 border-primary hidden lg:flex border-b fixed z-50 left-0 top-0 py-4 shadow-sm">
        <nav className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
          <Link href={"/"} className="">
            <Image
              src={logo || "/placeholder.svg"}
              alt="StableBricks Logo"
              className="h-10 object-left object-contain"
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">


              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-poppins font-semibold">Investments</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {investmentLinks.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.url}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-poppins font-semibold">Properties</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {propertyLinks.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.url}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-poppins font-semibold">Partnerships</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {partnershipLinks.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.url}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>


                <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-poppins font-semibold">Company</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {companyLinks.map((item) => (
                        <li key={item.name}>
                            <NavigationMenuLink asChild>
                            <Link
                                href={item.url}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                                <div className="text-sm font-medium leading-none">{item.name}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                                </p>
                            </Link>
                            </NavigationMenuLink>
                        </li>
                        ))}
                    </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex divide-x-2 divide-yellow-500 items-center">
            {user ? (
              <div className="px-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                 
                <div className="">
                  <Link
                    href={"/user/dashboard"}
                    className="rounded-md font-poppins font-semibold px-2 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
                <div className=" flex ml-6 items-center justify-center">
                    <Link
                        href={'login'}
                        className="block flex-none text-sm select-none font-poppins font-semibold space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        Log In
                    </Link>

                    <Link
                        href={'register'}
                        className="block select-none text-sm bg-yellow-500 flex-none font-poppins font-semibold space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        Get Started
                    </Link>
                      
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <div className="w-full md:hidden border-b flex justify-between shadow-sm z-50 items-center fixed left-0 top-0 bg-white px-8 py-3">
          <Link href={"/"}>
            <Image
              src={logo || "/placeholder.svg"}
              alt="StableBricks Logo"
              className="h-10 object-left object-contain"
            />
          </Link>
          <div className="flex justify-between">
            <SheetTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent side={"left"} className="">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <div className="px-2 flex items-center">
                <Image
                  alt="StableBricks Logo"
                  className="h-10 object-contain object-left"
                  src={logo || "/placeholder.svg"}
                />
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-col px-2 py-6 justify-start text-start items-start space-y-4">
                 <div className="w-full space-y-3">
                  <h3 className="font-poppins font-bold text-lg text-black">Investments</h3>
                  {companyLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className="font-poppins font-medium text-base text-gray-600 hover:text-yellow-500 block pl-4"
                    >
                      <SheetTrigger>{link.name}</SheetTrigger>
                    </Link>
                  ))}
                </div>

                <div className="w-full space-y-3">
                  <h3 className="font-poppins font-bold text-lg text-black">Investments</h3>
                  {investmentLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className="font-poppins font-medium text-base text-gray-600 hover:text-yellow-500 block pl-4"
                    >
                      <SheetTrigger>{link.name}</SheetTrigger>
                    </Link>
                  ))}
                </div>

                <div className="w-full space-y-3">
                  <h3 className="font-poppins font-bold text-lg text-black">Properties</h3>
                  {propertyLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className="font-poppins font-medium text-base text-gray-600 hover:text-yellow-500 block pl-4"
                    >
                      <SheetTrigger>{link.name}</SheetTrigger>
                    </Link>
                  ))}
                </div>

                <div className="w-full space-y-3">
                  <h3 className="font-poppins font-bold text-lg text-black">Partnerships</h3>
                  {partnershipLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className="font-poppins font-medium text-base text-gray-600 hover:text-yellow-500 block pl-4"
                    >
                      <SheetTrigger>{link.name}</SheetTrigger>
                    </Link>
                  ))}
                </div>

                <div className="flex h-full flex-col space-y-4 border-t-2 py-3 w-full">
                  {user ? (
                    <div className="flex flex-col h-full justify-between space-y-4">
                      <Link href={"/dashboard"} className="">
                        <SheetTrigger className="py-2 font-poppins flex items-center space-x-3 font-semibold text-lg w-full text-black">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          <p className="font-poppins">Dashboard</p>
                        </SheetTrigger>
                      </Link>
                      <div className="py-2 font-poppins items-center flex space-x-3 font-semibold text-lg w-full text-black">
                        <DarkButton />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link href={"/register"} className="">
                        <SheetTrigger className="py-2 font-poppins font-semibold text-lg w-full rounded-lg bg-black text-primary">
                          Register
                        </SheetTrigger>
                      </Link>
                      <Link href={"/login"} className="">
                        <SheetTrigger className="py-2 font-poppins font-semibold text-lg w-full rounded-lg border-2 border-black text-black">
                          Log In
                        </SheetTrigger>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}


// "use client"
// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import logo from '@/public/stablebricks.png'
// import { useSession } from 'next-auth/react'



// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
//   } from "@/components/ui/sheet"
// import { DarkButton } from './DarkButton'


//   const navLinks = [
//     {
//         id: 1,
//         name: 'HOME',
//         url: "/",
//         icon: ""
//     },
//     {
//         id: 1,
//         name: 'ABOUT',
//         url: "/about",
//         icon: ""
//     },
//     {
//         id: 1,
//         name: 'CONTACT',
//         url: "/contact",
//         icon: ""
//     },
//   ]

//   const auth = [
//     {
//         id: 1,
//         name: 'Log In',
//         url: "/login",
//         icon: ""
//     },
//     {
//         id: 2,
//         name: 'Sign Up',
//         url: "/register",
//         icon: ""
//     },
//   ]

// export const PublicNavigations = () => {
//     const session = useSession()
//     const user = session.data?.user?.name
//   return (
// <>
//     <div className=' w-full bg-white dark:text-gray-100 border-primary hidden lg:flex border-b fixed z-10 left-0 top-0 py-4'>
//         <nav className=" max-w-6xl mx-auto w-full flex justify-between">
//         <Link href={'/'} className="">
//             <Image src={logo} alt='stable Bricks Logo' className=' h-10 object-left object-contain' />
//         </Link>
//             <div className=" flex divide-x-2 divide-yellow-500 items-center">  
//                     <div className=" mx-2">
//                         <Link
//                             href={'/'}
//                             className="rounded-md font-poppins font-semibold px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
//                         >
//                             Home
//                         </Link>
//                         <Link
//                             href={'about'}
//                             className="rounded-md font-poppins font-semibold px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
//                         >
//                             About
//                         </Link>
//                         <Link
//                             href={'contact'}
//                             className="rounded-md font-poppins font-semibold px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
//                         >
//                             Contact
//                         </Link>
//                     </div>
//                    {
//                     user ? (
//                         <div className=" px-3 flex items-center ">
//                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                         </svg>

//                     <div className="">
//                     <Link
//                             href={'/user/dashboard'}
//                             className="rounded-md font-poppins font-semibold px-2 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
//                         >
//                         Dashboard
//                         </Link>
//                     </div>
//                     </div>
//                     ) : (
//                     <div className=" px-3 flex items-center ">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
//                         </svg>
//                     <div className="">
//                     <Link
//                             href={'register'}
//                             className="rounded-md font-poppins font-semibold px-2 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
//                         >
//                         Register
//                         </Link>
//                         <Link href={'login'}
//                             className="rounded-md font-poppins font-semibold px-2 py-2 ring-1 ring-transparent transition hover:text-black/70 text-gray-900 dark:hover:text-primary focus:outline-none focus-visible:ring-[#FF2D20]"
//                             >
//                         Log In
//                         </Link>
//                     </div>
//                     </div>
//                     )
//                    }
//             </div>
//     </nav>
//     </div>

//     <Sheet>
//     <   div className=" w-full md:hidden border-b flex justify-between shadow-sm z-10 items-center fixed left-0 top-0 bg-white px-8 py-3">
//             <Link href={'/'}>
//                 <Image src={logo} alt='stable Bricks Logo' className=' h-10 object-left object-contain' />
//             </Link>
//             <div className=" flex justify-between">
//                 <SheetTrigger>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
//                     </svg>
//                 </SheetTrigger>
//             </div>
//         </div>
//         {/* @ts-ignore */}
//         <SheetContent side={'left'} className="">
//             <SheetHeader>
//             <SheetTitle className=" flex items-center  ">
//                 <div className=" px-2 flex items-center">
//                     <Image alt='StableBrick Logo' className=' h-10 object-contain object-left' src={logo} />
//                 </div>
//             </SheetTitle>
//             <SheetDescription>
//               <div className=" flex flex-col px-2 py-6 items-start space-y-4">
//                 {
//                     navLinks.map((nav) => {
//                         return ( 
//                             <Link href={nav.url} key={ nav.id } className=' font-poppins font-semibold text-lg text-black hover:text-yellow-500'> 
//                                 <SheetTrigger>{nav.name}</SheetTrigger>
//                             </Link>
//                         )
//                     })
//                 }
//                 <div className=" flex h-full flex-col space-y-4 border-t-2 py-3 w-full ">
//                    { user ? (
//                     <div className=" flex flex-col h-full justify-between space-y-4">
//                      <Link href={'/user/dashboard'} className="">
//                         <SheetTrigger className='py-2 font-poppins flex items-center space-x-3 font-semibold text-lg w-full text-black'>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                         </svg>
//                            <p className=' font-poppins'>Dashboard</p>
//                         </SheetTrigger>
//                     </Link>

//                         <div className="py-2 font-poppins items-center flex space-x-3 font-semibold text-lg w-full  text-black">
//                             <DarkButton />
//                             {/* <p className='font-poppins font-semibold'>Dark Mode</p> */}
//                         </div>
//                     </div>
//                    ) :
//                   <div className=" flex flex-col space-y-3">
//                      <Link href={'/register'} className="">
//                         <SheetTrigger className='py-2 font-poppins font-semibold text-lg w-full rounded-lg bg-black text-primary '>Register</SheetTrigger>
//                     </Link>
//                     <Link href={'/login'} className="">
//                         <SheetTrigger className='py-2 font-poppins font-semibold text-lg w-full rounded-lg border-2 border-black text-black'>Log In</SheetTrigger>
//                     </Link>
//                   </div>
//                    }
//                 </div>
//               </div>
//             </SheetDescription>
//             </SheetHeader>
//         </SheetContent>
//     </Sheet>
// </>
//   )
// }


