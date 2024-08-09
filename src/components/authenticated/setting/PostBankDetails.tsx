"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { getUserFromCookies } from '@/components/auth/token';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const user = getUserFromCookies() || { id: null }; // Set a default value

const PostBankDetails: React.FC = () => {
  // State for bank details
  const [bankDetails, setBankDetails] = useState({
    firstName: '',
    lastName: '',
    accountNumber: '',
    bankName: '',
    creditCardNumber: '',
    registeredPhoneNumber: '',
    
  });

  // State for posting bank details
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.id) {
      toast.error('User ID is not available');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/`,
        { ...bankDetails, userId: user.id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        toast.success('Bank details posted successfully');
        setBankDetails({
          firstName: '',
          lastName: '',
          accountNumber: '',
          bankName: '',
          creditCardNumber: '',
          registeredPhoneNumber: '',
        }); // Clear form after successful submission
      } else {
        toast.error('Failed to post bank details');
      }
    } catch (error) {
      toast.error('Error posting bank details');
      console.error('Error posting bank details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <ToastContainer />
      <h2 className="text-2xl mb-4">Post Bank Details</h2>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="mb-4">
          <label className="block text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={bankDetails.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={bankDetails.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={bankDetails.accountNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Account Number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={bankDetails.bankName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Bank Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Credit Card Number:</label>
          <input
            type="text"
            name="creditCardNumber"
            value={bankDetails.creditCardNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Credit Card Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Registered Phone Number:</label>
          <input
            type="text"
            name="registeredPhoneNumber"
            value={bankDetails.registeredPhoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Registered Phone Number"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PostBankDetails;
