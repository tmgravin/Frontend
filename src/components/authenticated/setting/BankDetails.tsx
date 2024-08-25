"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/auth/token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const user = getUserFromCookies() || { id: null }; // Set a default value

const BankDetails: React.FC = () => {
  // State for bank details
  const [bankDetails, setBankDetails] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    bankName: "",
    creditCardNumber: "",
    registeredPhoneNumber: "",
    users: {
      id: `${user.id}`,
    },
  });

  // State for editing values
  const [editValues, setEditValues] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    bankName: "",
    creditCardNumber: "",
    registeredPhoneNumber: "",
    users: {
      id: `${user.id}`,
    },
  });

  // State for dialogs and button disable states
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [isPostDisabled, setIsPostDisabled] = useState(false);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [hasBankDetails, setHasBankDetails] = useState(false); // New state

  useEffect(() => {
    if (!user.id) {
      console.error("User ID is not available");
      return;
    }

    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/?userId=${user.id}`,
          {
            withCredentials: true,
          }
        );

        const data = response.data[0]; // Assuming the API returns an array

        if (response.status === 200 && data) {
          setBankDetails(data);
          setEditValues({
            firstName: data.firstName,
            lastName: data.lastName,
            accountNumber: data.accountNumber,
            bankName: data.bankName,
            creditCardNumber: data.creditCardNumber,
            registeredPhoneNumber: data.registeredPhoneNumber,
            users: {
              id: user.id,
            },
          });
          setIsPostDisabled(true);
          setIsEditDisabled(false);
          setHasBankDetails(true); // Set hasBankDetails to true
        } else {
          setIsPostDisabled(false);
          setIsEditDisabled(true);
          setHasBankDetails(false); // Set hasBankDetails to false
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpenEditDialog(!openEditDialog);
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/${user.id}`,
        editValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        toast.success("Bank details updated successfully");
        setBankDetails(editValues);
        handleEditToggle(e);
      } else {
        console.error("Failed to update bank details");
      }
    } catch (error) {
      toast.error("Error updating bank details");
      console.error("Error updating bank details:", error);
    }
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpenPostDialog(!openPostDialog);
  };

  const handlePost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/`,
        bankDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        toast.success("Bank details posted successfully");
        handlePostToggle(e);
        setIsPostDisabled(true);
        setIsEditDisabled(false);
        setHasBankDetails(true); // Set hasBankDetails to true
      } else {
        console.error("Failed to post bank details");
      }
    } catch (error) {
      toast.error("Error posting bank details");
      console.error("Error posting bank details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <ToastContainer />
      <h2 className="text-2xl mb-4">Bank Details</h2>

      <form noValidate autoComplete="off">
        <div className="flex flex-row">
          <div className="mb-4">
            <label className="block text-gray-700">Account Holder Name:</label>
            <p>{bankDetails.firstName}</p>
          </div>
          <div className="mb-4 px-5">
            <label className="block text-gray-700">
              Account Holder Last Name:
            </label>
            <p>{bankDetails.lastName}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="mb-4">
            <label className="block text-gray-700">Account Number:</label>
            <p>{bankDetails.accountNumber}</p>
          </div>
          <div className="mb-4 px-5">
            <label className="block text-gray-700">Bank Name:</label>
            <p>{bankDetails.bankName}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Credit Card Number:</label>
          <p>{bankDetails.creditCardNumber || "N/A"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Registered Phone Number:
          </label>
          <p>{bankDetails.registeredPhoneNumber}</p>
        </div>

        {!hasBankDetails ? (
          <button
            onClick={handlePostToggle}
            disabled={isPostDisabled}
            className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          >
            Post Bank Details
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            disabled={isEditDisabled}
            className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          >
            Edit Bank Details
          </button>
        )}
      </form>

      {/* Edit Bank Details Dialog */}
      {openEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Edit Bank Details</h3>
            <input
              type="text"
              name="firstName"
              value={editValues.firstName}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={editValues.lastName}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="accountNumber"
              value={editValues.accountNumber}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Account Number"
            />
            <input
              type="text"
              name="bankName"
              value={editValues.bankName}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Bank Name"
            />
            <input
              type="text"
              name="creditCardNumber"
              value={editValues.creditCardNumber}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Credit Card Number"
            />
            <input
              type="text"
              name="registeredPhoneNumber"
              value={editValues.registeredPhoneNumber}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Registered Phone Number"
            />
            <div className="flex justify-end">
              <button
                onClick={(e) => handleSave(e)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Bank Details Dialog */}
      {openPostDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Post Bank Details</h3>
            <input
              type="text"
              name="firstName"
              value={bankDetails.firstName}
              onChange={handlePostChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={bankDetails.lastName}
              onChange={handlePostChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handlePostChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Account Number"
            />
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handlePostChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Bank Name"
            />
            <input
              type="text"
              name="creditCardNumber"
              value={bankDetails.creditCardNumber}
              onChange={handlePostChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Credit Card Number"
            />
            <input
              type="text"
              name="registeredPhoneNumber"
              value={bankDetails.registeredPhoneNumber}
              onChange={handlePostChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Registered Phone Number"
            />
            <div className="flex justify-end">
              <button
                onClick={(e) => handlePost(e)}
                className="primary-orange-bg text-white px-4 py-2 rounded "
              >
                Post
              </button>
              <button
                onClick={handlePostToggle}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
