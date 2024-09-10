"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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
    <div className="p-4 sm:p-6">
      <div className="mt-4">
        {ebooks.length === 0 ? (
          <p className="text-center text-gray-600">No eBooks available</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {ebooks.map((ebook) => (
              <li
                key={ebook.id}
                className="border p-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="cb-shadow">
                  {" "}
                  {ebook.coverImageUrl && (
                    <Image
                      src={ebook.coverImageUrl}
                      alt={ebook.bookTitle}
                      width={128} // Adjust the width to match your desired size
                      height={128} // Adjust the height to match your desired size
                      className="w-full md:w-32 h-32 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 ">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {ebook.bookTitle}
                    </h3>
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
                        className="text-blue-500 underline mt-2 block"
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
        )}
      </div>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
}

export default EbookManager;
