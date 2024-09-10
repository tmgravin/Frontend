import React from "react";
import { DataItem } from "./Projects";

interface ReadMoreModalProps {
  project: DataItem | null;
  onClose: () => void;
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-2">
          {project.projects.projectName}
        </h2>
        <p className="mb-2">
          <strong>Description:</strong> {project.projectDescription}
        </p>
        <p className="mb-2">
          <strong>Amount:</strong> {project.projects.projectAmount}
        </p>
        <p className="mb-2">
          <strong>Deadline:</strong> {project.projects.projectDeadline}
        </p>
        <p className="mb-2">
          <strong>Scope:</strong> {project.scope}
        </p>
        <p className="mb-2">
          <strong>Experience Year:</strong> {project.experienceYear}
        </p>
        <p className="mb-2">
          <strong>Level of Experience:</strong> {project.levelOfExperience}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {project.projectStatus}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-white rounded hover:bg-orange-600 primary-orangebg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReadMoreModal;
