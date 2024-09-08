"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReadMoreModal from "./ReadMoreModal";

export interface DataItem {
  id: number;
  projectStatus: string;
  scope: string;
  experienceYear: string;
  levelOfExperience: string;
  projectUrl: string;
  createdAt: string;
  updatedAt: string;
  projectDescription: string;
  projects: {
    id: number;
    projectName: string;
    projectAmount: string;
    projectDeadline: string;
    budgets: string | null;
    createdAt: string;
    updatedAt: string;
    projectDescription: string;
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/pending`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
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
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  // Filter projects based on the search query
  const filteredData = data.filter((item) =>
    item.projects.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice the filtered data to display only the visible count
  const displayedData = filteredData.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className="flex justify-center items-center primary-green p-2">
        Latest Projects
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by project name..."
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.projects.projectName}</h2>
            <p>
              {truncateDescription(item.projectDescription, 100)}
              <button
                onClick={() => handleReadMore(item)}
                className="primary-orange hover:underline"
              >
                Read More
              </button>
            </p>
            <p className="text-sm">
              Project Amount: {item.projects.projectAmount}
            </p>
            <p className="text-sm">Deadline: {item.projects.projectDeadline}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {visibleCount < filteredData.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 text-white rounded hover:bg-orange-600 primary-orangebg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
      {selectedProject && (
        <ReadMoreModal project={selectedProject} onClose={handleClose} />
      )}
    </div>
  );
};

export default LatestProjects;
