import React from "react";
import HomePage from "@/components/authenticated/admin/AdminHome";
import AdminHeader from "@/components/authenticated/admin/AdminHeader";

function page() {
  //const user = getUserFromCookies();

  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div>
        <HomePage />
      </div>
    </div>
  );
}

export default page;
