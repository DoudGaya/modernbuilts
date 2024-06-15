import React from 'react'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'

const EmailVerification = () => {
  return (
    <div>
      <div className=" max-w-3xl flex items-center space-y-2 justify-center flex-col text-center bg-white">
        <h1 className=' text-2xl font-semibold'>Welcome to StableBricks</h1>
        <p>Confirming your Email</p>
          <BeatLoader loading={true} size={12} color='#ffda48'  />
        <Link href={''} className=' bg-primary px-6 py-2 rounded-md'>
            Back to Log In
        </Link>
      </div>
    </div>
  )
}

export default EmailVerification
 