import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { toast, ToastContainer } from "react-toastify";

const cookieuser = getUserFromCookies();

// Define the type for the Category
interface Category {
  id: number;
  category: string;
  createdAt: string;
}

// Define the type for the Ebook
interface Ebook {
  bookTitle: string;
  authorName: string;
  publicationName: string;
  publishedDate: string; // Use string for input and convert to Date later
  coverImageUrl: File | null;
  bookUrl: File | null;
  category: string;
}

interface AddEbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddEbookModal({ isOpen, onClose }: AddEbookModalProps) {
  const [newEbook, setNewEbook] = useState<Ebook>({
    bookTitle: "",
    authorName: "",
    publicationName: "",
    publishedDate: "",
    coverImageUrl: null,
    bookUrl: null,
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/category/`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Prevent rendering if not open
  if (!isOpen) return null;

  const onFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Ebook
  ) => {
    const file = e.target.files?.[0] || null;
    setNewEbook((prev) => ({ ...prev, [field]: file }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEbook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewEbook((prev) => ({ ...prev, category: e.target.value }));
  };

  const onAddEbook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("bookTitle", newEbook.bookTitle);
      formData.append("authorName", newEbook.authorName);
      formData.append("publicationName", newEbook.publicationName);
      formData.append("category", newEbook.category);

      // Convert date to the correct format (yyyy-MM-dd HH:mm:ss)
      const publishedDate = new Date(newEbook.publishedDate);
      const formattedDate = `${
        publishedDate.toISOString().split("T")[0]
      } 00:00:00`;
      formData.append("publishedDate", formattedDate);

      if (newEbook.coverImageUrl) {
        formData.append("coverImageUrl", newEbook.coverImageUrl);
      }
      if (newEbook.bookUrl) {
        formData.append("bookUrl", newEbook.bookUrl);
      }

      // Assuming the API endpoint for adding an ebook is /api/ebooks
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if ((res.status = 200)) {
        toast.success("Ebook Added Successfully");
        // Reset form fields and close the modal
        setNewEbook({
          bookTitle: "",
          authorName: "",
          publicationName: "",
          publishedDate: "",
          coverImageUrl: null,
          bookUrl: null,
          category: "",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding ebook:", error);
      toast.error("Failed to add ebook. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-6 rounded w-full max-w-md overflow-scroll h-4/5">
        <h2 className="text-xl font-bold mb-4">Add Ebook</h2>
        <form onSubmit={onAddEbook} className="space-y-4">
          <div>
            <label htmlFor="bookTitle" className="block font-medium">
              Title
            </label>
            <input
              id="bookTitle"
              type="text"
              name="bookTitle"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={newEbook.bookTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="authorName" className="block font-medium">
              Author Name
            </label>
            <input
              id="authorName"
              type="text"
              name="authorName"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={newEbook.authorName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="publicationName" className="block font-medium">
              Publication Name
            </label>
            <input
              id="publicationName"
              type="text"
              name="publicationName"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={newEbook.publicationName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={newEbook.category}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="publishedDate" className="block font-medium">
              Published Date
            </label>
            <input
              id="publishedDate"
              type="date"
              name="publishedDate"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={newEbook.publishedDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="coverFile" className="block font-medium">
              Cover Image
            </label>
            <input
              id="coverFile"
              type="file"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              accept="image/*"
              onChange={(e) => onFileChange(e, "coverImageUrl")}
              required
            />
          </div>
          <div>
            <label htmlFor="ebookFile" className="block font-medium">
              Ebook File
            </label>
            <input
              id="ebookFile"
              type="file"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              accept=".pdf"
              onChange={(e) => onFileChange(e, "bookUrl")}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={() => {
                setNewEbook({
                  bookTitle: "",
                  authorName: "",
                  publicationName: "",
                  publishedDate: "",
                  coverImageUrl: null,
                  bookUrl: null,
                  category: "",
                });
                onClose();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default AddEbookModal;
