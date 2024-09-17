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
  status: string; // Added status field
}

export default function HelpAndSupport() {
  const [data, setData] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | undefined>(
    undefined
  );
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null); // New state for status

  const cookieuser = getUserFromCookies(); // Moved inside the component to avoid SSR issues

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!cookieuser?.token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching help and support data...");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/help/`,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
            },
            withCredentials: true,
          }
        );
        console.log("Response data:", response.data);
        setData(response.data);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookieuser?.token]);

  const openModal = (id: string, email: string, status: string) => {
    setCurrentId(id);
    setCurrentEmail(email);
    setCurrentStatus(status); // Set the current status
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/help/?id=${id}`,
        { id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setData(
        data.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      toast.success("Status updated successfully!");
    } catch (error: any) {
      console.error(
        "Failed to update status:",
        error.response?.data || error.message
      );
      toast.error("Failed to update status.");
    }
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
    } catch (error: any) {
      console.error(
        "Failed to send reply:",
        error.response?.data || error.message
      );
      toast.error("Failed to send reply.");
    } finally {
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/help/${id}`, {
        headers: {
          Authorization: `Bearer ${cookieuser?.token}`,
        },
        withCredentials: true,
      });

      setData(data.filter((item) => item.id !== id)); // Remove the deleted item from state
      toast.success("Feedback deleted successfully!");
    } catch (error: any) {
      console.error(
        "Error occurred while deleting feedback:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete feedback.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="mb-6">Help and Support Requests</h2>
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
            <p>
              <strong>Status:</strong>{" "}
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                className="mt-2 px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value="REPLIED">Replied</option>
                <option value="FIXED">Fixed</option>
                <option value="PENDING">Pending</option>
              </select>
            </p>

            <div className="flex flex-row justify-around">
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => openModal(item.id, item.email, item.status)}
              >
                Reply
              </button>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
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
