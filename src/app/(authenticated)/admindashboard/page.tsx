import React from 'react'
import HomePage from '@/components/authenticated/admin/AdminHome'
import AdminHeader from '@/components/authenticated/admin/AdminHeader'
function page() {
  return (
    <div>
      <div>
      <AdminHeader/>
      </div>
      <div>
        <HomePage/>
        </div>
   </div>
  )
}

export default page