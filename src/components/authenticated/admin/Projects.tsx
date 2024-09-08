"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectInfoModal from "./InfoModals/ProjectInfoModal";
import PaymentInfoModal from "./InfoModals/PaymentInfo"; // Import the PaymentInfoModal
import { getUserFromCookies } from "@/components/cookie/oldtoken";
const cookieuser = getUserFromCookies();

interface Creator {
  name: string;
  email: string;
}

interface Category {
  category: string;
}

interface Project {
  id: number;
  projectName: string;
  projectAmount: string;
  projectDeadline: string;
  projectDescription: string;

  paymentStatus: string;
  projectUrl: string;
  projectCategory: Category;
  users: Creator;
}

interface ProjectWrapper {
  id: number;
  projectStatus: string;
  scope: string;
  experienceYear: string;
  levelOfExperience: string;
  projectUrl: string;
  createdAt: string;
  updatedAt: string;
  projects: Project;
}

const ProjectTableComponent: React.FC = () => {
  const [projects, setProjects] = useState<ProjectWrapper[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/`, {
        headers: {
          Authorization: `Bearer ${cookieuser?.token}`, // Replace `yourBearerToken` with your actual token
        },
        withCredentials: true,
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const handleOpenProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

  const handleOpenPaymentModal = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setSelectedProjectId(null);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Project Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">
                Project Name
              </th>
              <th className="px-4 py-2 border-b border-gray-200">Amount</th>
              <th className="px-4 py-2 border-b border-gray-200">Deadline</th>
              {/* <th className="px-4 py-2 border-b border-gray-200">Scope</th>
              <th className="px-4 py-2 border-b border-gray-200">Experience Year</th> */}
              <th className="px-4 py-2 border-b border-gray-200">Status</th>
              {/* <th className="px-4 py-2 border-b border-gray-200">Category</th> */}
              <th className="px-4 py-2 border-b border-gray-200">
                Payment Status
              </th>
              <th className="px-4 py-2 border-b border-gray-200">
                Creator Name
              </th>
              <th className="px-4 py-2 border-b border-gray-200">
                Creator Email
              </th>
              <th className="px-4 py-2 border-b border-gray-200">Details</th>
              <th className="px-4 py-2 border-b border-gray-200">
                Payment Info
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((projectWrapper) => {
              const project = projectWrapper.projects;
              const creator = project.users;
              const category = project.projectCategory;

              return (
                <tr key={projectWrapper.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {project.projectName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {project.projectAmount}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {new Date(project.projectDeadline).toLocaleDateString()}
                  </td>
                  {/* <td className="px-4 py-2 border-b border-gray-200">{projectWrapper.scope}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{projectWrapper.experienceYear}</td> */}
                  <td className="px-4 py-2 border-b border-gray-200">
                    {projectWrapper.projectStatus}
                  </td>
                  {/* <td className="px-4 py-2 border-b border-gray-200">{category?.category || 'N/A'}</td> */}
                  <td className="px-4 py-2 border-b border-gray-200">
                    {project.paymentStatus}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {creator.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {creator.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleOpenProjectModal(project)}
                    >
                      See More
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-green-500 underline ml-2"
                      onClick={() => handleOpenPaymentModal(project.id)}
                    >
                      Payment Info
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedProject && (
        <ProjectInfoModal
          project={selectedProject}
          open={isProjectModalOpen}
          onClose={handleCloseProjectModal}
        />
      )}
      {selectedProjectId && (
        <PaymentInfoModal
          projectId={selectedProjectId}
          open={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
        />
      )}
    </div>
  );
};

export default ProjectTableComponent;
