"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminDetails from "./AdminDetails";
import AdminSettingHeader from "./AdminSettingHeader";

function AdminSettingPage() {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="mx-auto">
      <AdminSettingHeader />
      <button
        onClick={handleBackClick}
        className="m-4 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
      >
        Back
      </button>

      <AdminDetails />
    </div>
  );
}

export default AdminSettingPage;
