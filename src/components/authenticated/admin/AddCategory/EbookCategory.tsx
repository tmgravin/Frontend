"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Category {
  id: number;
  category: string;
  createdAt: string;
}

const EbookCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const cookieuser = getUserFromCookies();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/category/`,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
          },
          withCredentials: true,
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      category: categoryName,
    };

    try {
      if (editingCategory) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/category?categoryId=${editingCategory.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("Category updated successfully!");
        setEditingCategory(null);
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/category/`,

          formData,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("Category created successfully!");
      }
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error creating/updating category:", error);
      toast.error("Error creating/updating category.");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.category);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {editingCategory ? "Edit Category" : "Create New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
        <div className="flex flex-col">
          <label
            htmlFor="categoryName"
            className="mb-2 font-medium text-gray-700"
          >
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleCategoryNameChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Categories</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Category Name</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{category.id}</td>
                <td className="py-2 px-4 border-b">{category.category}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(category.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(category)}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                    aria-label={`Edit ${category.category}`}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete ${category.category}`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EbookCategoryForm;
