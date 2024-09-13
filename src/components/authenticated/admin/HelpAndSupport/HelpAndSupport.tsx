"use client";

import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

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
  const [data, setData] = useState<SupportRequest[]>([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage errors
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const [replyMessage, setReplyMessage] = useState<string>(""); // State to hold the reply message
  const [currentId, setCurrentId] = useState<string | null>(null); // State to hold the current ID for reply

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/help/`,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`, // Use the token from cookies
            },
            withCredentials: true,
          }
        );
        setData(response.data); // Set the data to state
      } catch (error) {
        setError("Error fetching data."); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchData();
  }, []);

  const openModal = (id: string) => {
    setCurrentId(id); // Set the current ID for reply
    setIsOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsOpen(false); // Close the modal
    setReplyMessage(""); // Clear the reply message
  };

  const handleReplySubmit = async () => {
    if (!currentId) return;

    // Format data as URL-encoded string
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("id", currentId);
    urlEncodedData.append("message", replyMessage);

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/help/`,
        urlEncodedData.toString(), // Send as URL-encoded string
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "application/x-www-form-urlencoded", // Set content type to URL-encoded
          },
          withCredentials: true,
        }
      );

      toast.success("Reply sent successfully!");
    } catch (error) {
      toast.error("Failed to send reply.");
    } finally {
      closeModal(); // Close the modal after submission
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading indicator
  if (error) return <p>{error}</p>; // Show error message

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
              onClick={() => openModal(item.id)}
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Reply to Support Request
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                      rows={4}
                      placeholder="Enter your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleReplySubmit}
                    >
                      Send Reply
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
