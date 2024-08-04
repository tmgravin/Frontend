import React from 'react'
import HomePage from '@/components/authenticated/admin/AdminHome'
import AdminHeader from '@/components/authenticated/admin/AdminHeader'
import { getUserFromCookies } from '@/components/auth//token'; // Adjust the path as necessary
import { redirect } from "next/navigation";


function page() {

 const user = getUserFromCookies();
 if(!user){
  redirect('./homepage')
 }

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