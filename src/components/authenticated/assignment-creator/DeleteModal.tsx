import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
const cookieuser = getUserFromCookies();

interface DeleteModalProps {
  projectId: number; // ID of the project to delete
  onClose: () => void; // Function to close the modal
  onDelete: () => void; // Function to handle post-delete actions
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  projectId,
  onClose,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/delete?${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
          },

          withCredentials: true,
        }
      );
      toast.success("Project deleted successfully!");
      onDelete(); // Refresh data in parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting project", error);
      toast.error("Failed to delete the project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to delete this project?
        </h2>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 primary-orangebg text-white rounded hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
