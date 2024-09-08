"use client";
import React, { useEffect, useState } from "react";
import UserModal from "../usermodal/UserModal";
import Image from "next/image";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { useRouter } from "next/navigation";

function AdminHeader() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch the user from cookies and set it to state
    const fetchUser = () => {
      const userData = getUserFromCookies();
      if (userData) {
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  console.log(user);

  const router = useRouter();

  const handelClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage`);
  };

  return (
    <div className="flex w-screen justify-between items-center  px-4 cb-shadow">
      <div
        className="flex items-center mr-10 cursor-pointer"
        onClick={handelClick}
      >
        <Image src="/notextlogo.png" height={50} width={50} alt="msp logo" />
        <div className="mt-4 px-3">
          <h1 className="text-xs font-bold sm:text-2xl primary-navy-blue">
            MSP ACADEMY
          </h1>
        </div>
      </div>

      <div className=" p-1">
        {/* Conditionally render UserModal only if the user exists */}
        {user && <UserModal />}
      </div>
    </div>
  );
}

export default AdminHeader;
