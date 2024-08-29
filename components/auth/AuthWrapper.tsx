import React from 'react'

interface AuthWrapper {
    children: React.ReactNode
    backButtonRedirrect: string
    backButtonLabel: string
    authButtonText: string
    showSocial?: boolean
}

export const AuthWrapper = ( { 
    children, 
    backButtonLabel, 
    backButtonRedirrect, 
    authButtonText, 
    showSocial }: AuthWrapper) => {
  return (
    <div>{children}</div>
  )
}
