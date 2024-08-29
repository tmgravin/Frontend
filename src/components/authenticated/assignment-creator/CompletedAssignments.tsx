"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewRating from "../Review-modal/ReviewRating";
import { getUserFromCookies } from "@/components/auth/token";
import Image from "next/image";

const user = getUserFromCookies();

interface ProjectDetails {
  title: string;
  description: string;
}

interface DataItem {
  id: number;
  projectName: string;
  projectAmount: number;
  projectDeadline: string;
  budgets: string;
  createdAt: string;
  updatedAt: string | null; // Handle nullable updatedAt
  users: {
    id: number;
    name: string;
    email: string;
    isEmailVerified: string;
    phone: string;
    address: string;
    userType: string;
    loginType: string | null; // Handle nullable loginType
    createdAt: string;
    updatedAt: string | null; // Handle nullable updatedAt
  };
  projectCategory: {
    id: number;
    category: string;
    createdAt: string;
    updatedAt: string | null; // Handle nullable updatedAt
  };
  paymentStatus: string;
  file: string | null; // Handle nullable file
  projectsDetails: ProjectDetails | string; // Change to string to handle current data format
  doer: {
    id: number;
    name: string;
    email: string;
    isEmailVerified: string;
    phone: string;
    address: string;
    userType: string;
    loginType: string | null; // Handle nullable loginType
    createdAt: string;
    updatedAt: string | null; // Handle nullable updatedAt
  };
  message: string;
}

const CompletedAssignments: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<DataItem | null>(
    null
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/completed?userId=${user.id}`,
        {
          withCredentials: true, // Include credentials with the request
        }
      );
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Unexpected data format", response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleReviewClick = (assignment: DataItem) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleDownloadClick = async (filename: string | null) => {
    if (!filename) return; // Handle null filename

    try {
      const formData = new FormData();
      formData.append("filename", filename);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/file/download/`,
        formData,
        {
          responseType: "blob", // Ensure the response is a Blob for file download
          withCredentials: true,
        }
      );

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename.split("/").pop() || "file"); // Extract filename from URL
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className="flex justify-center items-center primary-green p-2 font-bold">
        Completed Assignments Ready For Download
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.projectName}</h2>
            <h2>Completed by: {item.doer.name}</h2>
            <h2>DoerId:{item.doer.id}</h2>
            {typeof item.projectsDetails === "string" ? (
              <p>{item.projectsDetails}</p>
            ) : (
              <>
                <p>{item.projectsDetails.title}</p>
                <p>{item.projectsDetails.description}</p>
              </>
            )}
            <p className="text-sm">Project Amount: {item.projectAmount}</p>
            <p className="text-sm">Deadline: {item.projectDeadline}</p>
            {item.file && (
              <p className="text-sm">
                Download Assignment:
                <button
                  onClick={() => handleDownloadClick(item.file)}
                  className="text-blue-500 underline ml-2"
                >
                  Download
                </button>
              </p>
            )}
            <button
              className="underline"
              onClick={() => handleReviewClick(item)}
            >
              <div className="flex flex-row">
                Review Teacher
                <Image
                  src="./star.svg"
                  className="px-1"
                  alt="star icon"
                  height="40"
                  width="80"
                />
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {visibleCount < data.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>

      {selectedAssignment && (
        <ReviewRating
          open={modalOpen}
          onClose={handleModalClose}
          doerId={selectedAssignment.doer.id} // Pass the userId of the selected assignment
          doerName={selectedAssignment.doer.name}
        />
      )}
    </div>
  );
};

export default CompletedAssignments;
