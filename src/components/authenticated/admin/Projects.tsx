"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import ProjectInfoModal from './InfoModals/ProjectInfoModal';

export interface Project {
  doerId: number;
  doerName: string;
  creatorId: number;
  creatorName: string;
  projectTitle: string;
  projectId: string;
  deadline: string;
  status: string;
}

const ProjectsTableComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    // Sample data
    {
      doerId: 1,
      doerName: 'John Doe',
      creatorId: 101,
      creatorName: 'Jane Smith',
      projectTitle: 'Website Redesign',
      projectId: '12',
      deadline: '2023-12-01',
      status: 'In Progress'
    },
    {
      doerId: 2,
      doerName: 'Alice Johnson',
      creatorId: 102,
      creatorName: 'Bob Brown',
      projectTitle: 'Mobile App',
      projectId: '123',
      deadline: '2023-11-15',
      status: 'Completed'
    },
    {
      doerId: 3,
      doerName: 'Charlie Davis',
      creatorId: 103,
      creatorName: 'Eve Foster',
      projectTitle: 'Marketing Campaign',
      projectId: '4234',
      deadline: '2023-10-20',
      status: 'Pending'
    },
  ]);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.doerName.toLowerCase().includes(search.toLowerCase()) ||
        project.creatorName.toLowerCase().includes(search.toLowerCase()) ||
        project.projectTitle.toLowerCase().includes(search.toLowerCase()) ||
        project.projectId.toLowerCase().includes(search.toLowerCase()) ||
        project.status.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, projects]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page changes
  };

  const handleActionClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const currentItems = filteredProjects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Table</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md p-2"
        />
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Doer ID</th>
            <th className="border px-4 py-2">Doer Name</th>
            <th className="border px-4 py-2">Creator ID</th>
            <th className="border px-4 py-2">Creator Name</th>
            <th className="border px-4 py-2">Project Title</th>
            <th className="border px-4 py-2">Project Name</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(project => (
            <tr key={`${project.doerId}-${project.creatorId}`}>
              <td className="border px-4 py-2">{project.doerId}</td>
              <td className="border px-4 py-2">{project.doerName}</td>
              <td className="border px-4 py-2">{project.creatorId}</td>
              <td className="border px-4 py-2">{project.creatorName}</td>
              <td className="border px-4 py-2">{project.projectTitle}</td>
              <td className="border px-4 py-2">{project.projectId}</td>
              <td className="border px-4 py-2">{project.deadline}</td>
              <td className="border px-4 py-2">{project.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleActionClick(project)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(filteredProjects.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center mt-4"}
        pageClassName={"mx-1"}
        pageLinkClassName={"px-3 py-1 border rounded"}
        activeClassName={"bg-blue-500 text-white"}
        previousLinkClassName={"px-3 py-1 border rounded"}
        nextLinkClassName={"px-3 py-1 border rounded"}
      />
      <ProjectInfoModal
        project={selectedProject}
        onClose={handleModalClose}
        open={isModalOpen}
      />
    </div>
  );
};

export default ProjectsTableComponent;
