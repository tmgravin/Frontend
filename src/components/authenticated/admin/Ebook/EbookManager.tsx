"use client";
import React, { useState, useEffect } from "react";
import AddEbookModal from "./AddEbookModal";
import EditEbookModal from "./EditEbookModal";
import DeleteEbookModal from "./DeleteEbookModal";
import { ToastContainer } from "react-toastify";

export interface Ebook {
  title: string;
  id: number;
  bookTitle: string;
  authorName: string;
  publicationName: string;
  publishedDate: Date;
  coverImageUrl: string;
  bookUrl: string;
  createdAt: string;
  category: {
    id: number;
    category: string;
    createdAt: string;
  };
}

function EbookManager() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [newEbook, setNewEbook] = useState({
    bookTitle: "",
    cover: null as File | null,
    ebook: null as File | null,
  });
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [deletingEbook, setDeletingEbook] = useState<Ebook | null>(null);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/`
        );
        const data: Ebook[] = await response.json();
        setEbooks(data);
      } catch (error) {
        setError("Failed to load eBooks");
        console.error(error);
      }
    };

    fetchEbooks();
  }, []);

  return (
    <div className="p-6">
      <ToastContainer />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Ebook
      </button>

      <div className="mt-4">
        {ebooks.length === 0 ? (
          <p>No eBooks available</p>
        ) : (
          <ul>
            {ebooks.map((ebook) => (
              <li
                key={ebook.id}
                className="border p-4 mb-4 flex flex-col md:flex-row md:justify-between"
              >
                <div className="flex items-center">
                  {ebook.coverImageUrl && (
                    <img
                      src={ebook.coverImageUrl}
                      alt={ebook.bookTitle}
                      className="w-20 h-20 object-cover mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{ebook.bookTitle}</h3>
                    <p className="text-gray-600">Author: {ebook.authorName}</p>
                    <p className="text-gray-600">
                      Publication: {ebook.publicationName}
                    </p>
                    <p className="text-gray-600">
                      Published Date:{" "}
                      {new Date(ebook.publishedDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Category: {ebook.category.category}
                    </p>
                    <p className="text-gray-600">
                      Added On: {new Date(ebook.createdAt).toLocaleDateString()}
                    </p>
                    {ebook.bookUrl && (
                      <a
                        href={ebook.bookUrl}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Book
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:flex md:items-center">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      setEditingEbook(ebook);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setDeletingEbook(ebook);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddEbookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditEbookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingEbook={editingEbook}
      />

      <DeleteEbookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        deletingEbook={deletingEbook}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default EbookManager;
