import React from 'react'
import { BsCheck2Circle } from 'react-icons/bs'

interface SuccessComponent {
    message?: string
}


export const FormSuccess = ( {message}: SuccessComponent) => {
    if (!message) return null;
  return (
    <div className=' items-center gap-x-3 p-2 text-center justify-center bg-emerald-500/15 text-emerald-900 w-full flex rounded-md text-sm'>
        <p>{message}</p> <BsCheck2Circle />
    </div>
  )
}