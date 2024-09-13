"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

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

export default function EbookManager() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("title");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch ebooks");
        }
        const data: Ebook[] = await response.json();
        setEbooks(data);
      } catch (error) {
        setError("Failed to load eBooks");
        console.error("Fetch error:", error);
      }
    };

    fetchEbooks();
  }, []);

  const filteredAndSortedEbooks = useMemo(() => {
    return ebooks
      .filter(
        (ebook) =>
          ebook.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.category.category
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === "title") {
          return a.bookTitle.localeCompare(b.bookTitle);
        } else if (sortOption === "author") {
          return a.authorName.localeCompare(b.authorName);
        } else if (sortOption === "publishedDate") {
          return (
            new Date(a.publishedDate).getTime() -
            new Date(b.publishedDate).getTime()
          );
        }
        return 0;
      });
  }, [ebooks, searchQuery, sortOption]);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search eBooks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Sort by Title</SelectItem>
            <SelectItem value="author">Sort by Author</SelectItem>
            <SelectItem value="publishedDate">
              Sort by Published Date
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        {filteredAndSortedEbooks.length === 0 ? (
          <p className="text-center text-gray-600">No eBooks available</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedEbooks.map((ebook) => (
              <Card key={ebook.id}>
                <CardContent className="p-4 flex flex-col space-y-4">
                  {ebook.coverImageUrl && (
                    <img
                      src={ebook.coverImageUrl}
                      alt={ebook.bookTitle}
                      height={400}
                      width={200}
                      className=" object-fill rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{ebook.bookTitle}</h3>
                    <p className="text-sm text-gray-600">
                      Author: {ebook.authorName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Publication: {ebook.publicationName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Published Date:{" "}
                      {new Date(ebook.publishedDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {ebook.category.category}
                    </p>
                  </div>
                  {ebook.bookUrl && (
                    <Button
                      asChild
                      className="w-full primary-orangebg hover:bg-orange-700"
                    >
                      <a
                        href={ebook.bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download E-Book
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-destructive mt-2 text-center">{error}</p>}
    </div>
  );
}
