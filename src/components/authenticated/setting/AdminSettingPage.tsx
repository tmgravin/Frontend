"use client";

import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BankDetails from "./BankDetails";
import UserDetails from "./UserDetails";
import { getUserFromCookies } from "@/components/auth/token";
import DoerDetails from "./DoerDetails";

function SettingPage() {
  const router = useRouter();
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const user = await getUserFromCookies();
        setUserType(user?.userType);
      } catch (error) {
        console.error("Error fetching user type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserType();
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto">
      
 
     
    </div>
  );
}

export default SettingPage;
