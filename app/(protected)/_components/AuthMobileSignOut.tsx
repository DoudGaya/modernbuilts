import React from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import stablebricksIcon from '@/public/img/logo-icon.png'
import { Button } from '@/components/ui/button'

export const AuthMobileSignOut = () => {
    const user = useCurrentUser()

    const logoutUser = () => {
        signOut()
    }
  return (
    <>
     { user && (
             <div className=" flex flex-col space-y-4">
                    <div className=" w-full  rounded-lg items-center space-x-4 px-2 py-4 bg-gray-100 justify-between flex">
                        <div className=" w-14 h-14 rounded-full flex items-center flex-none justify-center border-primary border-4">
                            <Avatar>
                                <AvatarImage 
                                // @ts-ignore
                                src={ user.image } />
                                <AvatarFallback>SB</AvatarFallback>
                            </Avatar>
                        </div>
                        <Button onClick={logoutUser} className=" flex space-x-2 bg-black justify-center items-center">
                            <p className=' font-poppins text-md text-primary px-3 py-0.5'>Logout</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </Button>
                    </div>
             </div>
           )
           }
    </>
  )
}
