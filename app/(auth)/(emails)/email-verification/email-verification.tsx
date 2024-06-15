import React from 'react'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'

export const EmailTemplate = () => {
  return (
    <div>
      <div className=" max-w-3xl bg-white">
        <p>Confirm your Email</p>
        <Link href={''}>
          Back to Log In
          <BeatLoader />
        </Link>
      </div>
    </div>
  )
}
 