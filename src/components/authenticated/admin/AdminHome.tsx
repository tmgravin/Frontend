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
import FeedbackForm from "./TabContents/Feedback";

const AdminHome: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

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
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/mspacademy-admin`);
    }
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const confirmLogout = () => {
    handleLogout();
    setIsModalOpen(false); // Close the modal after logout
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Just close the modal
  };

  const handleClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/mspacademy-admin`);
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
                  "Feedback",
                  "Setting",
                  "Change Password",
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
                      if (section === "Logout") {
                        handleLogoutClick();
                      } else {
                        setActiveSection(section);
                        if (window.innerWidth < 1024) {
                          toggleSidebar();
                        }
                      }
                    }}
                  >
                    {section}
                  </Tabs.Trigger>
                ))}
                <button
                  onClick={handleLogoutClick}
                  className={cn(
                    "p-2.5 cursor-pointer bg-gray-200 border border-gray-300 rounded text-left w-full h-12 flex items-start justify-start ease-in hover:bg-primary/70 hover:text-white"
                  )}
                >
                  Logout
                </button>
              </div>
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
                <Tabs.Content value="feedback">
                  <h2>Feedback</h2>

                  <FeedbackForm />
                </Tabs.Content>
                <Tabs.Content value="setting">
                  <h2>Setting</h2>

                  <AdminDetails />
                </Tabs.Content>
                <Tabs.Content value="changepassword">
                  <h2>Change Password</h2>
                  <ChangePasswordDialog />
                </Tabs.Content>
              </div>
            </MaxWidthWrapper>
          </div>
        </div>

        {/* --------------------------------- Confirmation Modal ----------------------------------- */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
              <p className="mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={confirmLogout}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </Button>
                <Button
                  onClick={cancelLogout}
                  className="bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </Tabs.Root>
    </div>
  );
};

export default AdminHome;
