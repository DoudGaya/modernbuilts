import React from 'react'
import { auth } from '@/auth'
import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

const settings = async () => {

  const session = await auth()
  return (
    <div className=''>
        { JSON.stringify(session)}

        <form action={ async () => {
          "use server"
          await signOut()
        }}>
          <Button type='submit' className=" bg-primary">Sign Out</Button>
        </form>
    </div>
  )
}

export default settings