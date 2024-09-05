"use client";
import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BankDetails from "./BankDetails";
import UserDetails from "./UserDetails";
import { getUserFromCookies } from "@/components/auth/oldtoken";
import DoerDetails from "./DoerDetails";

function SettingPage() {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const user = await getUserFromCookies();
        setUserType(user?.userType || "");
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
      <Header />
      <button
        onClick={handleBackClick}
        className="m-4 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
      >
        Back
      </button>
      <div>
        {userType === "ASSIGNMENT_DOER" ? <DoerDetails /> : <UserDetails />}
      </div>
      {userType === "ASSIGNMENT_DOER" && (
        <div>
          <BankDetails />
        </div>
      )}
    </div>
  );
}

export default SettingPage;
