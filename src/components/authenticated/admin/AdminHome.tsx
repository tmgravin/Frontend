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
import UploadEbook from "./UploadEbook";
import { useRouter } from "next/navigation";

const AdminHome: React.FC = () => {
  // Check activation of tab
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const router = useRouter();

  const handelClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage`);
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
          <div className="w-full   ">
            <Tabs.List
              className={` px-4 pt-[11px] pb-10 flex flex-col gap-5 h-full bg-white dark:bg-black duration-300  z-50  fixed   overflow-y-auto scrollbar-hide  ${
                isSidebarOpen ? "ml-0 w-full min-[400px]:w-80" : "-ml-80 w-80"
              }`}
            >
              {/* --------------------------------- Sidebar Toggle Button ----------------------------------- */}
              <div className="flex items-center">
                <div
                  className="flex  items-center mx-auto cursor-pointer "
                  onClick={handelClick}
                >
                  <Image
                    src="/notextlogo.png"
                    height={50}
                    width={50}
                    alt="msp logo"
                    className="h-10 w-auto"
                  />
                  <div className=" px-3">
                    <h1 className=" font-bold text-lg primary-navy-blue">
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

              <Tabs.Trigger value="">
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

              <div className="flex flex-col gap-1 ">
                {[
                  "dashboard",
                  "creators",
                  "doers",
                  "projects",
                  "update",
                  "category",
                  "uploadebook",
                  "testimonials",
                  "ebookcategory",
                ].map((section) => (
                  <Tabs.Trigger
                    key={section}
                    value={section}
                    className={cn(
                      " p-2.5 cursor-pointer bg-gray-200 border border-gray-300 rounded  text-left w-full h-12 flex items-start justify-start  ease-in",
                      `${
                        activeSection === section
                          ? "bg-primary  text-white "
                          : " hover:bg-primary/70 hover:text-white"
                      }`
                    )}
                    onClick={() => {
                      setActiveSection(section);
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Tabs.Trigger>
                ))}
              </div>
            </Tabs.List>
          </div>
        </aside>

        {/* --------------------------------- Content Side  ----------------------------------- */}

        <div
          className={`flex flex-col flex-grow w-full ease-in-out duration-300 ${
            isSidebarOpen ? "pl-80 min-w-max sm:min-w-full " : "pl-0"
          }`}
        >
          {/* --------------------------------- Dark Overlay that toggles sidebar ----------------------------------- */}
          <div
            className={cn(
              `fixed hidden z-20 top-0 left-0 bg-black transition-all duration-300 w-full h-full border  `,
              {
                "bg-opacity-70 block md:hidden ": isSidebarOpen,
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
              className={` pt-8 transition-all duration-300 min-w-max  ${
                isSidebarOpen ? "px-2.5 md:px-5 " : ""
              }`}
            >
              <div className="">
                <Tabs.Content value="dashboard">
                  <h2>Dashboard</h2>
                  <Dashboard />
                </Tabs.Content>
                <Tabs.Content value="creators">
                  <h2>Creators</h2>
                  <StudentComponent />
                </Tabs.Content>
                <Tabs.Content value="doers">
                  <h2>Doers</h2>
                  <TeacherComponent />
                </Tabs.Content>
                <Tabs.Content value="projects">
                  <h2>Projects</h2>
                  <div>
                    <ProjectsTableComponent />
                  </div>
                </Tabs.Content>
                {/* <Tabs.Content value="paymenttable">
            <h2>Payment Table</h2>
            <div style={scrollableContentStyle}>
              <PaymentsTable />
            </div>
          </Tabs.Content> */}
                <Tabs.Content value="update">
                  <h2>Featured Images</h2>
                  <FeaturedImages />
                </Tabs.Content>
                <Tabs.Content value="category">
                  <h2>Project Category</h2>
                  <CategoryForm />
                </Tabs.Content>
                <Tabs.Content value="uploadebook">
                  <h2>Upload E-Book</h2>
                  <UploadEbook />
                </Tabs.Content>
                <Tabs.Content value="testimonials">
                  <h2>Testimonials</h2>
                  <TestimonialForm />
                </Tabs.Content>
                <Tabs.Content value="ebookcategory">
                  <h2>E-Book Category</h2>
                  <EbookCategoryForm />
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
