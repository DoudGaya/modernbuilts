"use client"
import React, { useState } from 'react'
import { UserProfileDetails } from '../../user/profile/_components/UserProfileDetails'
import { UserProfileFormUpdate } from '../../user/profile/_components/UserProfileFormUpdate'
import { SecurityDetailsForm } from '../../user/profile/_components/SecurityDetailsForm'

const AdminSettingsPage = () => {
  const [editModal, setEditModal] = useState<string>("")

  const changeModal = (message: string) => {
    setEditModal(message)
  }

  return (
    <div className="flex w-full p-6 h-full">
      <div className="grid grid-cols-1 gap-6 w-full md:grid-cols-3">
        <UserProfileDetails changeModal={changeModal} />
        <UserProfileFormUpdate editModal={editModal} changeModal={changeModal} />
        <SecurityDetailsForm editModal={editModal} changeModal={changeModal} />
      </div>      
    </div>
  )
}

export default AdminSettingsPage
