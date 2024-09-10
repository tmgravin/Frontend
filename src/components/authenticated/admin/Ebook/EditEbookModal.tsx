import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { toast, ToastContainer } from "react-toastify";
const cookieuser = getUserFromCookies();

interface Category {
  id: number;
  category: string;
  createdAt: string;
}

interface Ebook {
  id: string;
  bookTitle: string;
  authorName: string;
  publicationName: string;
  publishedDate: string;
  coverImageUrl: File | null;
  bookUrl: File | null;
  coverImagePreviewUrl: string | null; // For displaying existing cover image
  existingEbookUrl: string | null; // For displaying existing ebook file link
  category: string;
}

interface EditEbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingEbook?: any;
}

function EditEbookModal({
  isOpen,
  onClose,
  editingEbook,
}: EditEbookModalProps) {
  const [editedEbook, setEditedEbook] = useState<Ebook>({
    id: "",
    bookTitle: "",
    authorName: "",
    publicationName: "",
    publishedDate: new Date().toISOString().split("T")[0],
    coverImageUrl: null,
    bookUrl: null,
    coverImagePreviewUrl: null,
    existingEbookUrl: null,
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

  useEffect(() => {
    if (editingEbook) {
      setEditedEbook({
        id: editingEbook.id.toString(),
        bookTitle: editingEbook.bookTitle,
        authorName: editingEbook.authorName,
        publicationName: editingEbook.publicationName,
        publishedDate: editingEbook.publishedDate
          ? new Date(editingEbook.publishedDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        coverImageUrl: null,
        bookUrl: null,
        coverImagePreviewUrl: editingEbook.coverImageUrl || null, // Set existing cover image URL
        existingEbookUrl: editingEbook.bookUrl || null, // Set existing ebook URL
        category: editingEbook.category.category || "",
      });
    }
  }, [editingEbook]);

  if (!isOpen) return null;

  const onFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Ebook
  ) => {
    const file = e.target.files?.[0] || null;
    setEditedEbook((prev) => ({ ...prev, [field]: file }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEbook((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditedEbook((prev) => ({ ...prev, category: e.target.value }));
  };

  const onEditEbook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("bookTitle", editedEbook.bookTitle);
      formData.append("authorName", editedEbook.authorName);
      formData.append("publicationName", editedEbook.publicationName);
      formData.append("category", editedEbook.category);
      formData.append("publishedDate", editedEbook.publishedDate);
      if (editedEbook.coverImageUrl)
        formData.append("cover", editedEbook.coverImageUrl);
      if (editedEbook.bookUrl) formData.append("ebook", editedEbook.bookUrl);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${editedEbook.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if ((res.status = 200)) {
        toast.success("E-Book Added Successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error updating ebook:", error);
      toast.update("Failed to update ebook. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-6 rounded w-full max-w-md overflow-scroll h-4/5">
        <h2 className="text-xl font-bold mb-4">Edit Ebook</h2>
        <form onSubmit={onEditEbook} className="space-y-4">
          <div>
            <label htmlFor="bookTitle" className="block font-medium">
              Title
            </label>
            <input
              id="bookTitle"
              type="text"
              name="bookTitle"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={editedEbook.bookTitle}
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
              value={editedEbook.authorName}
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
              value={editedEbook.publicationName}
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
              value={editedEbook.category}
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
              value={editedEbook.publishedDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="coverFile" className="block font-medium">
              Cover Image
            </label>
            {editedEbook.coverImagePreviewUrl && (
              <img
                src={editedEbook.coverImagePreviewUrl}
                alt="Current Cover"
                className="mb-2 w-full h-32 object-cover"
              />
            )}
            <input
              id="coverFile"
              type="file"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              accept="image/*"
              onChange={(e) => onFileChange(e, "coverImageUrl")}
            />
          </div>
          <div>
            <label htmlFor="ebookFile" className="block font-medium">
              Ebook File
            </label>
            {editedEbook.existingEbookUrl && (
              <a
                href={editedEbook.existingEbookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mb-2"
              >
                View Current Ebook
              </a>
            )}
            <input
              id="ebookFile"
              type="file"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              accept=".pdf"
              onChange={(e) => onFileChange(e, "bookUrl")}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEbookModal;
