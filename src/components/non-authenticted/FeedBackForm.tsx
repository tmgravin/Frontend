"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// Define the type for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  feedback: string;
  rating: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");

  // Handle change in form fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ message: string }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`,
        formData
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setResponseMessage(
          error.response.data.message || "Error submitting feedback"
        );
      } else {
        setResponseMessage("Error submitting feedback");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-start">
        Feedback Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Rating */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Please provide your feedback on the quality of our service:
          </p>
          <div className="space-x-3 flex flex-row">
            <label className="block">
              <input
                type="radio"
                name="rating"
                value="Excellent"
                checked={formData.rating === "Excellent"}
                onChange={handleChange}
                className="mr-2"
              />
              Excellent
            </label>
            <label className="block">
              <input
                type="radio"
                name="rating"
                value="Very Good"
                checked={formData.rating === "Very Good"}
                onChange={handleChange}
                className="mr-2"
              />
              Very Good
            </label>
            <label className="block">
              <input
                type="radio"
                name="rating"
                value="Good"
                checked={formData.rating === "Good"}
                onChange={handleChange}
                className="mr-2"
              />
              Good
            </label>
            <label className="block">
              <input
                type="radio"
                name="rating"
                value="Average"
                checked={formData.rating === "Average"}
                onChange={handleChange}
                className="mr-2"
              />
              Average
            </label>
            <label className="block">
              <input
                type="radio"
                name="rating"
                value="Poor"
                checked={formData.rating === "Poor"}
                onChange={handleChange}
                className="mr-2"
              />
              Poor
            </label>
          </div>
        </div>

        {/* Feedback Suggestion */}
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Do you have any suggestion on what we can do to provide you with a
            better service?
          </label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder="Type here...."
            value={formData.feedback}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 p-2 w-full border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full primary-orangebg text-white py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <p className="mt-4 text-center text-green-600">{responseMessage}</p>
      )}
    </div>
  );
};

export default FeedbackForm;
