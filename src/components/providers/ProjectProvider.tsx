"use client";
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { getUserFromCookies } from "../auth/oldtoken";

// Assuming `getUserFromCookies` returns an object with an `id` property
const user = getUserFromCookies();

interface ProjectDataItem {
  // Define the structure of a project data item
  id: number;
  name: string;
  // other fields...
}

interface ProjectContextType {
  data: ProjectDataItem[];
  loading: boolean;
  fetchData: () => void;
}

// Create a Context with a default value of `undefined`
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Create a Provider component
export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ProjectDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<ProjectDataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/byUser?userId=${user?.id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectContext.Provider value={{ data, loading, fetchData }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the context
export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
