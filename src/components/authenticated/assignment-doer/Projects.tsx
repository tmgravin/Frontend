"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReadMoreModal from "./ReadMoreModal";
import ApplyModal from "./ApplyModal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { getUserFromCookies } from "../../auth/oldtoken";

export interface DataItem {
  id: number;
  projectStatus: string;
  scope: string;
  experienceYear: string;
  levelOfExperience: string;
  projectUrl: string;
  projectDescription: string;
  createdAt: string;
  updatedAt: string;
  projects: {
    id: number;
    projectName: string;
    projectAmount: string;
    projectDeadline: string;
    budgets: string | null;
    projectDescription: string;
    createdAt: string;
    updatedAt: string;
    users: {
      id: number;
      name: string;
      email: string;
    };
    projectCategory: {
      id: number;
      category: string;
    } | null;
  };
}

const LatestProjects: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DataItem | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/pending`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const truncateDescription = (description: string, length: number) => {
    if (typeof description !== "string") return "";
    if (description.length <= length) return description;
    return description.slice(0, length) + "...";
  };

  const handleReadMore = (project: DataItem) => {
    setSelectedProject(project);
    setShowReadMoreModal(true);
  };

  const handleCloseReadMore = () => {
    setShowReadMoreModal(false);
    setSelectedProject(null);
  };

  const handleApplyNow = (project: DataItem) => {
    setSelectedProject(project);
    setShowApplyModal(true);
  };

  const handleCloseApplyModal = () => {
    setShowApplyModal(false);
    setSelectedProject(null);
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <ToastContainer />
      <div className="flex justify-center items-center primary-green p-2">
        Latest Projects
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold underline">
              {item.projects.projectName}
            </h2>
            <p>
              {truncateDescription(item.projectDescription, 100)}
              <button
                onClick={() => handleReadMore(item)}
                className="primary-navy-blue hover:underline"
              >
                Read More
              </button>
            </p>
            <p className="text-sm">
              Project Amount: {item.projects.projectAmount}
            </p>
            <p className="text-sm">Deadline: {item.projects.projectDeadline}</p>
            <button
              className="primary-orangebg rounded-sm p-1 text-white "
              onClick={() => handleApplyNow(item)}
            >
              <h1 className="text-xs">Apply now</h1>
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {visibleCount < data.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 text-white rounded hover:bg-orange-600 primary-orangebg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
      {showReadMoreModal && selectedProject && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseReadMore}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ReadMoreModal
              project={selectedProject}
              onClose={handleCloseReadMore}
            />
          </div>
        </>
      )}
      {showApplyModal && selectedProject && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseApplyModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ApplyModal
              project={selectedProject}
              onClose={handleCloseApplyModal}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LatestProjects;
