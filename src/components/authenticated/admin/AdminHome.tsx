"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import React, { useState } from "react";
import { RiMenuFold3Line } from "react-icons/ri";
import CategoryForm from "./AddCategory/addCategory";
import EbookCategoryForm from "./AddCategory/EbookCategory";
import AdminHeader from "./AdminHeader";
import StudentComponent from "./Creators";
import Dashboard from "./Dashboard";
import TeacherComponent from "./Doers";
import FeaturedImages from "./FeaturedImages";
import MaxWidthWrapper from "./maxWidthWrapper";
import ProjectsTableComponent from "./Projects";
import TestimonialForm from "./Testimonials";
import EbookManager from "./Ebook/EbookManager";
import { useRouter } from "next/navigation";
import HelpAndSupport from "./HelpAndSupport/HelpAndSupport";
import SettingPage from "../setting/SettingPage";
import AdminDetails from "../setting/AdminDetails";
import ChangePasswordDialog from "./TabContents/ChangePassword";
import { toast } from "react-toastify";

const AdminHome: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const router = useRouter();

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = async () => {
    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout/${cookieuser?.id}`
      // );
      removeCookie("token");
      toast.warning("logging out");
    } catch (err) {
      toast.error("Logout Failed");
      console.log("Error occurred", err);
    } finally {
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/mapacadey-admin`);
    }
  };

  const handleClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/mapacadey-admin`);
  };

  return (
    <div className="overflow-hidden">
      <Tabs.Root
        defaultValue="dashboard"
        orientation="vertical"
        style={{ display: "flex", width: "100%" }}
      >
        {/* --------------------------------- Sidebar ----------------------------------- */}

        <aside>
          <div className="w-full">
            <Tabs.List
              className={`px-4 pt-[11px] pb-10 flex flex-col gap-5 h-full bg-white dark:bg-black duration-300 z-50 fixed overflow-y-auto scrollbar-hide ${
                isSidebarOpen ? "ml-0 w-full min-[400px]:w-80" : "-ml-80 w-80"
              }`}
            >
              {/* --------------------------------- Sidebar Toggle Button ----------------------------------- */}
              <div className="flex items-center">
                <div
                  className="flex items-center mx-auto cursor-pointer"
                  onClick={handleClick}
                >
                  <Image
                    src="/notextlogo.png"
                    height={50}
                    width={50}
                    alt="msp logo"
                    className="h-10 w-auto"
                  />
                  <div className="px-3">
                    <h1 className="font-bold text-lg text-orange-600">
                      MSP ACADEMY
                    </h1>
                  </div>
                </div>
                <div className="ml-auto">
                  <Button
                    onClick={toggleSidebar}
                    className={`${
                      isSidebarOpen ? "" : "transition-opacity opacity-0 "
                    }`}
                  >
                    <RiMenuFold3Line className="text-2xl" />
                  </Button>
                </div>
              </div>
              {/* --------------------------------- Sidebar Image ----------------------------------- */}

              <Tabs.Trigger value="dashboard">
                <div className="border-b-2">
                  <Image
                    src="/admin-icons/adminmenuimg.png"
                    alt="Total doers"
                    width={250}
                    height={150}
                    className="m-1 w-full"
                  />
                </div>
              </Tabs.Trigger>

              {/* --------------------------------- Sidebar Item List ----------------------------------- */}

              <div className="flex flex-col gap-1">
                {[
                  "Dashboard",
                  "Project Doers",
                  "Project Creators",
                  "All Projects",
                  "Payment Table",
                  "Project Category",
                  "All Ebooks",
                  "Ebook Category",
                  "Testimonials",
                  "Feature Images",
                  "Help And Support",
                  "Setting",
                  /*   "Admin Details", */
                  "Change Password",

                  "Logout",
                ].map((section) => (
                  <Tabs.Trigger
                    key={section}
                    value={section.toLowerCase().replace(/\s+/g, "")}
                    className={cn(
                      "p-2.5 cursor-pointer bg-gray-200 border border-gray-300 rounded text-left w-full h-12 flex items-start justify-start ease-in",
                      `${
                        activeSection === section
                          ? "bg-primary text-white"
                          : "hover:bg-primary/70 hover:text-white"
                      }`
                    )}
                    onClick={() => {
                      if (section === "logout") {
                        handleLogout();
                      }
                      setActiveSection(section);
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                  >
                    {section}
                  </Tabs.Trigger>
                ))}
              </div>
              <Tabs.Trigger value="logout">
                <button>asdaldkjalkdjaslk</button>
              </Tabs.Trigger>
            </Tabs.List>
          </div>
        </aside>

        {/* --------------------------------- Content Side  ----------------------------------- */}

        <div
          className={`flex flex-col flex-grow w-full ease-in-out duration-300 ${
            isSidebarOpen ? "pl-80 min-w-max sm:min-w-full" : "pl-0"
          }`}
        >
          {/* --------------------------------- Dark Overlay that toggles sidebar ----------------------------------- */}
          <div
            className={cn(
              `fixed hidden z-20 top-0 left-0 bg-black transition-all duration-300 w-full h-full border`,
              {
                "bg-opacity-70 block md:hidden": isSidebarOpen,
              }
            )}
            onClick={() => toggleSidebar()}
          ></div>

          {/* --------------------------------- Admin Navbar ----------------------------------- */}

          <div>
            <AdminHeader
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>

          {/* --------------------------------- Main Content ----------------------------------- */}
          <div className="overflow-x-auto">
            <MaxWidthWrapper
              className={`pt-8 transition-all duration-300 min-w-max ${
                isSidebarOpen ? "px-2.5 md:px-5" : ""
              }`}
            >
              <div>
                <Tabs.Content value="dashboard">
                  <h2>Dashboard</h2>
                  <Dashboard />
                </Tabs.Content>
                <Tabs.Content value="projectdoers">
                  <h2>Project Doers</h2>
                  <TeacherComponent />
                </Tabs.Content>
                <Tabs.Content value="projectcreators">
                  <h2>Project Creators</h2>
                  <StudentComponent />
                </Tabs.Content>
                <Tabs.Content value="allprojects">
                  <h2>All Projects</h2>
                  <ProjectsTableComponent />
                </Tabs.Content>
                <Tabs.Content value="payment">
                  <h2>Payment Table</h2>
                </Tabs.Content>
                <Tabs.Content value="projectcategory">
                  <h2>Project Category</h2>
                  <CategoryForm />
                </Tabs.Content>
                <Tabs.Content value="allebooks">
                  <h2>All Ebooks</h2>
                  <EbookManager />
                </Tabs.Content>
                <Tabs.Content value="ebookcategory">
                  <h2>E-Book Category</h2>
                  <EbookCategoryForm />
                </Tabs.Content>
                <Tabs.Content value="testimonials">
                  <h2>Testimonials</h2>
                  <TestimonialForm />
                </Tabs.Content>
                <Tabs.Content value="featureimages">
                  <h2>Feature Images</h2>
                  <FeaturedImages />
                </Tabs.Content>
                <Tabs.Content value="helpandsupport">
                  <HelpAndSupport />
                </Tabs.Content>
                <Tabs.Content value="setting">
                  <h2>Setting</h2>
                  <AdminDetails />
                  {/* <SettingPage /> */}
                </Tabs.Content>
                {/*   <Tabs.Content value="admindetails">
                  <h2>Admin Details</h2>
                   <AdminDetails />
                  
                </Tabs.Content> */}
                <Tabs.Content value="changepassword">
                  <h2>ChangePassword</h2>
                  <ChangePasswordDialog />
                </Tabs.Content>
                <Tabs.Content value="logout">
                  <div className="flex justify-center items-center flex-col">
                    <h2 className="text-3xl">
                      Are You Sure You Want To Logout?
                    </h2>
                    <h1
                      className="text-white text-4xl bg-red-600 rounded-md mt-5 hover:cursor-pointer p-2"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </h1>
                  </div>
                </Tabs.Content>
              </div>
            </MaxWidthWrapper>
          </div>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default AdminHome;
