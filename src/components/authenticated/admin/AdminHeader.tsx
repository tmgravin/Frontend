"use client";
import React, { useEffect, useState } from "react";
import UserModal from "../usermodal/UserModal";
import Image from "next/image";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RiMenuUnfold3Line } from "react-icons/ri";
import MaxWidthWrapper from "./maxWidthWrapper";
import AdminUserModal from "../usermodal/AdminUserModal";

function AdminHeader({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
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
    <div
      className={`   shadow-lg ${
        isSidebarOpen ? "min-w-max sm:min-w-full overflow-hidden" : ""
      }`}
    >
      <MaxWidthWrapper
        className={`flex justify-between  items-center transition-all duration-300  ${
          isSidebarOpen ? "px-2.5 md:px-5 " : ""
        }`}
      >
        <div className="">
          <Button
            onClick={toggleSidebar}
            className={` transition-opacity  ${
              isSidebarOpen ? "opacity-0 " : "opacity-100 "
            }`}
          >
            <RiMenuUnfold3Line className="text-white text-2xl" />
          </Button>
        </div>
        {/* <div
        className="hidden sm:flex items-center mx-auto cursor-pointer "
        onClick={handelClick}
      >
        <Image
          src="/notextlogo.png"
          height={50}
          width={50}
          alt="msp logo"
          className="h-6 md:h-10 w-auto"
        />
        <div className=" px-3">
          <h1 className="text-xs font-bold sm:text-2xl primary-navy-blue">
            MSP ACADEMY
          </h1>
        </div>
      </div> */}

        <div className=" p-1">
          {/* Conditionally render UserModal only if the user exists */}
          {user && <UserModal />}
        </div>
      </MaxWidthWrapper>
      <div className=" p-1">
        {/* Conditionally render UserModal only if the user exists */}
        {user && <AdminUserModal />}
      </div>
    </div>
  );
}

export default AdminHeader;
