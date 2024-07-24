import React from 'react'
import UserModal from '../usermodal/UserModal'

function AdminHeader() {
  return (
    <div className='flex flex-col w-full h-full'>
    
   <div className='flex justify-end'> <UserModal/></div>
    </div>
  )
}

export default AdminHeader