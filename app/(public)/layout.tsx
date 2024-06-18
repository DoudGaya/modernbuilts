import React from 'react'
import { PublicNavigations } from '@/components/PublicNavigations'
import { Footer } from '@/components/Footer'

const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (
    <>
    <PublicNavigations />
    <div className=''>
        <div className="">
            {children}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default AuthLayout