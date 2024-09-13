// HelpAndSupport.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { toast } from "react-toastify";
import ReplyModal from "./ReplyModal"; // Import the ReplyModal component

interface SupportRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  issueType: string;
  message: string;
  createdAt: string;
}

const cookieuser = getUserFromCookies();

export default function HelpAndSupport() {
  const [data, setData] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | undefined>(
    undefined
  );
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/help/`,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
            },
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (id: string, email: string) => {
    setCurrentId(id);
    setCurrentEmail(email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReplySubmit = async (replyMessage: string) => {
    if (!currentId) return;

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("id", currentId);
    urlEncodedData.append("message", replyMessage);

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/help/`,
        urlEncodedData.toString(),
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      toast.success("Reply sent successfully!");
    } catch (error) {
      toast.error("Failed to send reply.");
    } finally {
      closeModal();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Help and Support Requests</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow"
          >
            <p>
              <strong>Name:</strong> {item.firstName} {item.lastName}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Issue Type:</strong> {item.issueType}
            </p>
            <p>
              <strong>Message:</strong> {item.message}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => openModal(item.id, item.email)}
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      {/* Render ReplyModal component */}
      <ReplyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleReplySubmit}
        email={currentEmail}
      />
    </div>
  );
}
