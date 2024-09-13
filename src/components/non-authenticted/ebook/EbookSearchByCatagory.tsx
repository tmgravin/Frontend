"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  category: string;
}

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

const Searchbar: React.FC = () => {
  const [catData, setCatData] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [ebook, setEbook] = useState<Ebook[]>([]);
  const [isSearchAttempted, setIsSearchAttempted] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = catData.find(
      (cat) => cat.id === parseInt(event.target.value)
    );
    setCategory(selectedCategory || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!category) return;
    setIsSearchAttempted(true);
    setNoResultsMessage("");
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/category?category=${category.category}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.length === 0) {
        setNoResultsMessage("No E-Book found for the selected category.");
        setEbook([]);
        setIsModalOpen(false);
      } else {
        setEbook(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCategory(null);
    setEbook([]);
    setIsSearchAttempted(false);
    setNoResultsMessage("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/category/`,
          {
            withCredentials: true,
          }
        );
        setCatData(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <div className="flex flex-col md:flex-row w-full">
            <select
              id="category"
              value={category?.id || ""}
              onChange={handleCategoryChange}
              className="block w-full md:w-[35vw] border border-gray-300 rounded-l-md p-2 mb-2 md:mb-0"
              required
            >
              <option value="">Browse Category</option>
              {catData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 primary-orangebg text-white rounded-md md:rounded-r-md hover:bg-orange-600 w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {isSearchAttempted && noResultsMessage && (
        <p className="text-red-500 text-center">{noResultsMessage}</p>
      )}

      {isModalOpen && ebook.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-3xl relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute  top-2 right-2 text-white font-bold bg-orange-500 p-1 rounded-full hover:bg-orange-600 transition"
            >
              Close
            </button>

            <div className="max-h-[80vh] overflow-y-auto px-4 py-4">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ebook.map((ebook) => (
                  <li
                    key={ebook.id}
                    className="border p-4 flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    {ebook.coverImageUrl && (
                      <img
                        src={ebook.coverImageUrl}
                        alt={ebook.bookTitle}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                    )}
                    <div className="w-full">
                      <h3 className="font-semibold text-lg text-gray-800 text-center">
                        {ebook.bookTitle}
                      </h3>
                      <p className="text-gray-600 text-center">
                        Author: {ebook.authorName}
                      </p>
                      <p className="text-gray-600 text-center">
                        Publication: {ebook.publicationName}
                      </p>
                      <p className="text-gray-600 text-center">
                        Published Date:{" "}
                        {new Date(ebook.publishedDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-center">
                        Category: {ebook.category.category}
                      </p>
                      <div className="w-full my-3 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 text-center">
                        {ebook.bookUrl && (
                          <a
                            href={ebook.bookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download E-Book
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
