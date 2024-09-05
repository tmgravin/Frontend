import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import StudentComponent from "./Creators";
import TeacherComponent from "./Doers";
import ProjectsTableComponent from "./Projects";
import Dashboard from "./Dashboard";
import Image from "next/image";
import UserModal from "../usermodal/UserModal";
import FeaturedImages from "./FeaturedImages";
import CategoryForm from "./AddCatagory/addCatagory";
import PaymentsTable from "./InfoModals/PaymentsTable";
import UploadEbook from "./UploadEbook";
import TestimonialForm from "./Testimonials";

const AdminHome: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Tabs.Root
        defaultValue="dashboard"
        orientation="vertical"
        style={{ display: "flex", width: "100%" }}
      >
        <Tabs.List style={tabsListStyle}>
          <Tabs.Trigger value="">
            <div>
              <Image
                src="/admin-icons/adminmenuimg.png"
                alt="Total doers"
                width={250}
                height={150}
                className="m-1"
              />
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger value="dashboard" style={tabStyle}>
            Dashboard
          </Tabs.Trigger>
          <Tabs.Trigger value="creators" style={tabStyle}>
            Creators
          </Tabs.Trigger>
          <Tabs.Trigger value="doers" style={tabStyle}>
            Doers
          </Tabs.Trigger>
          <Tabs.Trigger value="projects" style={tabStyle}>
            Projects
          </Tabs.Trigger>
          {/* <Tabs.Trigger value="paymenttable" style={tabStyle}>Payment Table</Tabs.Trigger> */}
          <Tabs.Trigger value="update" style={tabStyle}>
            Update Images
          </Tabs.Trigger>
          <Tabs.Trigger value="category" style={tabStyle}>
            Add Category
          </Tabs.Trigger>
          <Tabs.Trigger value="uploadebook" style={tabStyle}>
            Upload E-Book
          </Tabs.Trigger>
          <Tabs.Trigger value="testimonials" style={tabStyle}>
            Tesitmonials
          </Tabs.Trigger>
        </Tabs.List>

        <div style={contentContainerStyle}>
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
            <div style={scrollableContentStyle}>
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
            <h2>Add Category</h2>
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
        </div>
      </Tabs.Root>
    </div>
  );
};

const tabsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "200px",
  borderRight: "1px solid #ddd",
  paddingRight: "10px",
};

const contentContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  overflow: "hidden", // Prevent overflow of content
};

const scrollableContentStyle: React.CSSProperties = {
  maxHeight: "calc(100vh - 60px)", // Adjust based on header height
  overflowY: "auto", // Enable vertical scrolling if content overflows
};

const tabStyle: React.CSSProperties = {
  padding: "10px",
  cursor: "pointer",
  backgroundColor: "#f1f1f1",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "4px",
  textAlign: "center",
  width: "200px", // Fixed width for the tab
  height: "50px", // Fixed height for the tab
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
};

export default AdminHome;
