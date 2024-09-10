import React from "react";
import { Project } from "./Searchbar"; // Ensure this import path matches your project structure

interface ReadMoreModalProps {
  project: Project | null;
  onClose: () => void;
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          Close
        </button>
        <h2 className="text-3xl font-bold mb-4">{project.projectName}</h2>
        <p className="mb-4">
          <strong>Description:</strong> {project.budgets}
        </p>
        <p className="mb-4">
          <strong>Amount:</strong> ${project.projectAmount.toFixed(2)}
        </p>
        <p className="mb-4">
          <strong>Deadline:</strong>{" "}
          {new Date(project.projectDeadline).toLocaleDateString()}
        </p>
        <p className="mb-4">
          <strong>Created At:</strong>{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
        <p className="mb-4">
          <strong>Payment Status:</strong> {project.paymentStatus}
        </p>

        <h3 className="text-2xl font-semibold mb-2">Creator Information</h3>
        <p className="mb-2">
          <strong>Name:</strong> {project.users.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {project.users.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {project.users.phone}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {project.users.address}
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">
          Category Information
        </h3>
        <p>
          <strong>Category:</strong> {project.projectCategory.category}
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 primary-orangebg text-white rounded hover:bg-orange-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadMoreModal;
