import React from 'react'

export const ErrorCard = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full p-4 text-center bg-red-100 border border-red-200 rounded-lg'>
        Sorry something went wrong. Please try again later.
        <br />
        If the problem persists, please contact support.
    </div>
  )
}
