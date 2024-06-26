"use client"

import React, { useEffect, useCallback, useState } from 'react'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { emailVerification } from '@/actions/email-verification'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

const EmailVerification = () => {


  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {

    if (success || error) return;

    if (!token){
      setError("Please generate a new token!")
      return;
    }
    emailVerification(token)
    .then((data) => {
      setSuccess(data.success)
      setError(data.error)
    }).catch(() => {
      setError("Something Went Wrong!")
    })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      <div className=" max-w-3xl flex items-center space-y-2 justify-center flex-col text-center bg-white">
        <h1 className=' text-2xl font-semibold'>Welcome to StableBricks</h1>
        <p>Confirming your Email</p>
          {!success && !error && (
            <div className=" flex py-6">
              <BeatLoader loading={true} size={12} color='#ffda48'  />
            </div>
          )}

          {
            success ? (
              <FormError message={error} />
              ) : 
            <FormSuccess message={success}/>
          }
        <Link href={''} className=' bg-primary px-6 py-2 rounded-md'>
            Back to Log In
        </Link>
      </div>
    </div>
  )
}

export default EmailVerification
 