"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  message: string;
  imageUrl: string;
}

interface TestimonialFormData {
  name: string;
  company: string;
  position: string;
  message: string;
}

const TestimonialForm: React.FC = () => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    company: "",
    position: "",
    message: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const cookieuser = getUserFromCookies();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/`,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
          },
          withCredentials: true,
        }
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Error fetching testimonials.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    if (image) {
      submitData.append("imageUrl", image);
    }

    try {
      if (editingId) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/?id=${editingId}`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        toast.success("Testimonial updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        toast.success("Testimonial added successfully!");
      }
      setFormData({ name: "", company: "", position: "", message: "" });
      setImage(null);
      setPreviewUrl(null);
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Error submitting testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      message: testimonial.message,
    });
    setPreviewUrl(testimonial.imageUrl);
    setEditingId(testimonial.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Testimonial deleted successfully!");
        fetchTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        toast.error("Error deleting testimonial.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editingId ? "Edit Testimonial" : "Add a Testimonial"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </div>
        {previewUrl && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isSubmitting
              ? "Submitting..."
              : editingId
              ? "Update Testimonial"
              : "Add Testimonial"}
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">Testimonials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-4">
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">
                  {testimonial.position} at {testimonial.company}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{testimonial.message}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="text-blue-600 hover:text-blue-800"
                aria-label={`Edit ${testimonial.name}'s testimonial`}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Delete ${testimonial.name}'s testimonial`}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialForm;
