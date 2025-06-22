"use client"
import React, {useState} from 'react'
import { UserProfileDetails } from './_components/UserProfileDetails'
import { UserProfileFormUpdate } from './_components/UserProfileFormUpdate'
import { SecurityDetailsForm } from './_components/SecurityDetailsForm'
import { ReferralCard } from '@/components/ReferralCard'
import { useCurrentUser } from '@/hooks/use-current-user'

const ProfilePage = () => {
  const [editModal, setEditModal] = useState<string>("")
  const user = useCurrentUser()

  const changeModal = ( message: string) => {
    setEditModal(message)
  }
  return (
    <div className=' flex w-full p-2 h-full flex-col space-y-6'>
      <div className={`grid grid-cols-1 gap-4 w-full ${!user?.isOAuth ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        <UserProfileDetails changeModal={changeModal} />
        <UserProfileFormUpdate editModal={editModal} changeModal={changeModal} />
        {!user?.isOAuth && (
          <SecurityDetailsForm editModal={editModal} changeModal={changeModal} />
        )}
      </div>
      
      {/* Referral Section */}
      <div className="w-full">
        <ReferralCard />
      </div>
    </div>
  )
}

export default ProfilePage