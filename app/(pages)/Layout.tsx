import React from 'react'
import { PublicNavigations
 } from '@/components/PublicNavigations'
import { Footer } from '@/components/Footer'

const PagesLayout = ({ children }: {
  children: React.ReactNode 
}) => {
  return (
    <div>
      <PublicNavigations />
      {children}
      <Footer />
    </div>
  )
}

export default PagesLayout