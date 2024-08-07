// src/components/authenticated/project-table/ProjectTableComponent.tsx
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectInfoModal from './InfoModals/ProjectInfoModal'; // Adjust the import path as necessary

interface Creator {
  name: string;
  email: string;
}

interface Category {
  category: string;
}

interface Project {
  projectName: string;
  projectAmount: string;
  projectDeadline: string;
  paymentStatus: string;
  projectUrl: string ; 
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/projects/',{
      withCredentials: true // Include credentials with the request
    })
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Project Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Project Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Amount</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Deadline</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Scope</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Experience Required</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Status</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Category</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Payment Status</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Creator Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Creator Email</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100"></th> {/* Added for the "see more" button */}
            </tr>
          </thead>
          <tbody>
            {projects.map((projectWrapper) => {
              const project = projectWrapper.projects;
              const creator = project.users;
              const category = project.projectCategory;

              return (
                <tr key={projectWrapper.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b border-gray-200">{project.projectName}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{project.projectAmount}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{new Date(project.projectDeadline).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{projectWrapper.scope}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{projectWrapper.experienceYear}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{projectWrapper.projectStatus}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{category?.category || 'N/A'}</td> {/* Safe access with optional chaining */}
                  <td className="px-4 py-2 border-b border-gray-200">{project.paymentStatus}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{creator.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{creator.email}</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <button 
                      className="text-blue-500 underline"
                      onClick={() => handleOpenModal(project)}
                    >
                      see more
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
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProjectTableComponent;
