import React from 'react'
import { MdErrorOutline } from "react-icons/md";

interface ErrorComponent {
    message?: string
}


export const FormError = ( {message}: ErrorComponent) => {
    if (!message) return null;
  return (
    <div className=' items-center gap-x-3 p-2 text-center justify-center bg-destructive/20 text-destructive w-full flex rounded-md text-sm'>
        <p>{message}</p> <MdErrorOutline />
    </div>
  )
}