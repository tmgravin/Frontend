import React from "react";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const cookieuser = getUserFromCookies();

// Define the type for the Ebook
interface Ebook {
  id: number;
  bookTitle: string;
  // Add other fields if needed
}

// Define the type for the component props
interface DeleteEbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletingEbook?: Ebook | null; // Optional because it might not be provided
}

const DeleteEbookModal: React.FC<DeleteEbookModalProps> = ({
  isOpen,
  onClose,
  deletingEbook,
}) => {
  if (!isOpen) return null;

  const handleDeleteEbook = async () => {
    if (!deletingEbook) return;

    try {
      // Replace with actual delete logic, such as an API call
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${deletingEbook.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieuser?.token}`,
          },
        }
      );

      if ((res.status = 200)) {
        toast.success("E-Book Deleted Successfully");
      }

      // Optionally, you can add logic to notify the user or refresh the list
    } catch (error) {
      toast.error("Error deleting ebook");
      console.error("Error deleting ebook:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to delete this ebook?
        </h2>
        <p className="mb-4">
          {deletingEbook ? deletingEbook.bookTitle : "No eBook selected"}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteEbook}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEbookModal;
