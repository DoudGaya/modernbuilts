"use client"
import React, {useState} from 'react'
import { UserProfileDetails } from './_components/UserProfileDetails'
import { UserProfileFormUpdate } from './_components/UserProfileFormUpdate'
import { SecurityDetailsForm } from './_components/SecurityDetailsForm'

const ProfilePage = () => {

  const [editModal, setEditModal] = useState<string>("")


  const changeModal = ( message: string) => {

    setEditModal(message)
  }
  return (
    <div className=' flex w-full p-2 h-full'>
      <div className=" grid grid-cols-1 gap-4 w-full md:grid-cols-3">
        <UserProfileDetails changeModal={changeModal} />
        <UserProfileFormUpdate editModal={editModal} changeModal={changeModal} />
        <SecurityDetailsForm editModal={editModal} changeModal={changeModal} />
      </div>      
    </div>
  )
}

export default ProfilePage