"use client";
// src/DataFetching.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/auth/oldtoken";
const user = getUserFromCookies();
// Define types based on the API response structure
interface Project {
  id: number;
  projectName: string;
  projectAmount: string;
  projectDeadline: string;
  status: string;
  users: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface DataItem {
  id: number;
  projects: Project;
  doer: User;
  status: string;
  users: User;
  createdAt: string;
  updatedAt: string;
}

const AssignmentStatus: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      //need to implement doer id here and ain
      const response = await axios.get<DataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/doer?doer=${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className="flex justify-center items-center primary-green p-2">
        Assignment Status
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.projects.projectName}</h2>
            <p>${item.projects.projectAmount}</p>
            <p className="text-sm">Deadline: {item.projects.projectDeadline}</p>

            <p
              className={`text-sm font-bold ${
                item.status === "ACCEPTED" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {item.status}
            </p>
            <p className="text-sm">Creator: {item.projects.users.name}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {visibleCount < data.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 primary-orange-bg text-white rounded hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentStatus;
