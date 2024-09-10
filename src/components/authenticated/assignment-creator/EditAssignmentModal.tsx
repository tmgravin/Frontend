"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromCookies } from "../../cookie/oldtoken";
import { DataItem } from "./LatestProjects";
import Image from "next/image";

const user = getUserFromCookies();

interface EditAssignmentModalProps {
  project: DataItem;
  onClose: () => void;
  onSave: () => void;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  project,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(project.projects.projectName);
  const [projectDescription, setprojectDescription] = useState(
    project.projectDescription || ""
  );
  const [deadline, setDeadline] = useState(project.projects.projectDeadline);
  const [attachment, setAttachment] = useState<File | null>(null);

  const [experienceYear, setExperienceYear] = useState(project.experienceYear);
  const [levelOfExperience, setLevelOfExperience] = useState(
    project.levelOfExperience
  );
  // const [skills, setSkills] = useState(project.skills || "");
  const [budgetType, setBudgetType] = useState(project.projects.budgets || "");
  const [budget, setBudget] = useState(project.projects.projectAmount);
  const [scope, setScope] = useState(project.scope);
  const [category, setCategory] = useState(
    project.projects.projectCategory?.id || ""
  );
  const [catData, setCatData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/`,
          {
            withCredentials: true, // Include credentials with the request
          }
        );
        setCatData(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      projectName: title,
      projectDescription,
      projectDeadline: deadline,
      experienceYear,
      levelOfExperience,
      // skills,
      budgets: budgetType,
      projectAmount: budget,
      projectCategory: category,
      scope,
      users: user?.id,
      projectUrl: attachment,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/?id=${project.projects.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
          },
          withCredentials: true,
        }
      );
      toast.success("Assignment updated successfully!");
      onSave(); // Call onSave to refresh data after saving
    } catch (error) {
      toast.error("Error updating assignment. Please try again.");
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-600 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Assignment</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Assignment Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="levelOfExperience"
              className="block text-sm font-medium text-gray-700"
            >
              Required Experience
            </label>
            <select
              id="levelOfExperience"
              value={levelOfExperience}
              onChange={(e) => setLevelOfExperience(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Experience Level</option>
              <option value="ENTRY">ENTRY</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="EXPERT">EXPERT</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="experienceYear"
              className="block text-sm font-medium text-gray-700"
            >
              Required Experience
            </label>
            <select
              id="experienceYear"
              value={experienceYear}
              onChange={(e) => setExperienceYear(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">How long will work take</option>
              <option value="LESS_THAN_ONE_MONTH">Less than a month</option>
              <option value="ONE_TO_THREE_MONTH">One to three months</option>
              <option value="THREE_TO_SIX_MONTH">Three to six months</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Job Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Category</option>
              {catData.map((catData) => (
                <option key={catData.id} value={catData.id}>
                  {catData.category}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700"
            >
              Skills (separate by commas)
            </label>
            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., JavaScript, React, Node.js"
              required
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="scope"
              className="block text-sm font-medium text-gray-700"
            >
              Scope of Project
            </label>
            <div className="mt-1 flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="LARGE"
                  checked={scope === "LARGE"}
                  onChange={(e) => setScope(e.target.value)}
                  className="mr-2"
                  name="scope"
                />
                Large
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="MEDIUM"
                  checked={scope === "MEDIUM"}
                  onChange={(e) => setScope(e.target.value)}
                  className="mr-2"
                  name="scope"
                />
                Medium
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="SMALL"
                  checked={scope === "SMALL"}
                  onChange={(e) => setScope(e.target.value)}
                  className="mr-2"
                  name="scope"
                />
                Small
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="budgetType"
              className="block text-sm font-medium text-gray-700"
            >
              Budget Type
            </label>
            <div className="mt-1 flex flex-row items-center justify-center border-2 p-4 relative">
              <label className="flex flex-col items-center relative">
                <input
                  type="radio"
                  name="budgetType"
                  value="HOURLY_RATE"
                  checked={budgetType === "HOURLY_RATE"}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="absolute top-0 left-0"
                />
                <Image
                  src="/postassignment-svg/hourlyrate.svg"
                  alt="Hourly Rate"
                  width={30}
                  height={30}
                />
                Hourly Rate
              </label>
              <label className="flex flex-col items-center relative mx-3">
                <input
                  type="radio"
                  name="budgetType"
                  value="FIXED_PRICE"
                  checked={budgetType === "FIXED_PRICE"}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="absolute top-0 left-0"
                />
                <Image
                  src="/postassignment-svg/fixedprice.svg"
                  alt="Fixed Rate"
                  width={30}
                  height={30}
                />
                Fixed Price
              </label>
              {/* <label className="flex flex-col items-center justify-center relative mx-3">
                <input
                  type="radio"
                  name="budgetType"
                  value="recurring"
                  checked={budgetType === 'recurring'}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="absolute top-0 left-0"
                />
                <Image
                  src="/postassignment-svg/recuringpayment.svg"
                  alt="Recurring Payment"
                  width={30}
                  height={30}
                />
                Recurring Payment
              </label> */}
              <label className="flex flex-col items-center justify-center relative">
                <input
                  type="radio"
                  name="budgetType"
                  value="TASK_BASED"
                  checked={budgetType === "TASK_BASED"}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="absolute top-0 left-0"
                />
                <Image
                  src="/postassignment-svg/taskbased.svg"
                  alt="Task Based"
                  width={30}
                  height={30}
                />
                Task Based
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="attachment"
              className="block text-sm font-medium text-gray-700"
            >
              Attachment
            </label>
            <input
              id="attachment"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget (in USD)
            </label>
            <input
              id="budget"
              type="number"
              placeholder="$"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="primary-orangebg  m-1 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
            >
              Save Edit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 m-1 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditAssignmentModal;
