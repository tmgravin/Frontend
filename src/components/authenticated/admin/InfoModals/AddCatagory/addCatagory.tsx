"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      category: categoryName,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setResultMessage("Category created successfully!");
      toast.success("Category created successfully!");
      console.log("Category created successfully:", response.data);
    } catch (error) {
      console.error("Error creating category:", error);
      setResultMessage("Error creating category.");
      toast.error("Error creating category.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Create New Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="categoryName" className="mb-2 font-medium text-gray-700">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleCategoryNameChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
          Add Category
        </button>
      </form>
      {resultMessage && <p className="text-center mt-4 text-green-500">{resultMessage}</p>}
      <ToastContainer />
    </div>
  );
};

export default CategoryForm;
