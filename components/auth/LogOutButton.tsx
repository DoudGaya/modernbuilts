"use client"

import React from 'react'



interface logOutButtonProps {
    children?: React.ReactNode;
}

export const LogOutButton = ( {children}: logOutButtonProps) => {
  return (
    <div>{children}</div>
  )
}
