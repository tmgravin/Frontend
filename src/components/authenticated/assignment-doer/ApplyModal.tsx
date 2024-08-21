import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { DataItem } from "./Projects";
import { getUserFromCookies } from "@/components/auth/token";

interface ApplyModalProps {
  project: DataItem | null;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ project, onClose }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!project) return;

    try {
      const user = getUserFromCookies();

      if (!user || !user.id) {
        toast.error("User not found. Please log in.");
        return;
      }

      const doerId = user.id;
      const formData = new FormData();
      formData.append("doerId", doerId.toString());
      formData.append("projectId", project.projects.id.toString());
      formData.append("coverLetter", coverLetter);

      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Application submitted successfully!");
      onClose(); // Close the modal after successful application
    } catch (error) {
      console.error("Error applying for project", error);
      toast.error("Failed to apply for the project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Apply for Project</h2>
      {project && (
        <>
          <p className="mb-2">
            <strong>Project:</strong> {project.projects.projectName}
          </p>
          <p className="mb-4">
            <strong>Deadline:</strong> {project.projects.projectDeadline}
          </p>
        </>
      )}
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Write your cover letter..."
        rows={5}
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 primary-orangebg text-white rounded"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApplyModal;
