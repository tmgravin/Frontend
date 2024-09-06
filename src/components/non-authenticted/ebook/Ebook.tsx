"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Download, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Ebook {
  id: string;
  title: string;
  coverUrl: string;
  downloadUrl: string;
}

export default function Ebook() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/`
      );
      if (!response.ok) throw new Error("Failed to fetch ebooks");
      const data = await response.json();

      // Map the API response to the expected format
      const mappedEbooks = data.map((ebook: any) => ({
        id: ebook.id.toString(),
        title: ebook.bookTitle,
        coverUrl: ebook.coverImageUrl,
        downloadUrl: ebook.bookUrl,
      }));

      setEbooks(mappedEbooks);
    } catch (err) {
      setError("Error fetching ebooks. Please try again later.");
      console.error("Error fetching ebooks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <AlertCircle className="h-8 w-8 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ebook Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ebooks.map((ebook) => (
          <Card key={ebook.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="truncate">{ebook.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image
                layout="responsive" // Ensures the image scales correctly
                width={1920} // Adjust width and height to the correct aspect ratio of your original image
                height={1080} // These values should match the aspect ratio of the actual image
                src={`${ebook.coverUrl}`}
                alt={`Cover for ${ebook.title}`}
                className="w-16 h-24 object-cover rounded-md"
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => window.open(ebook.downloadUrl, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
