"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResultModal from "./ResultModal";
import Image from "next/image";
import { getUserFromCookies } from "../../auth/token";
import { useProjects } from "@/components/providers/ProjectProvider";

const user = getUserFromCookies();

interface PostAssignmentModalProps {
  onClose: () => void;
}

const PostAssignmentModal: React.FC<PostAssignmentModalProps> = ({
  onClose,
}) => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const { fetchData }: any = useProjects();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [experienceYear, setExperienceYear] = useState("");
  const [levelOfExperience, setlevelOfExperience] = useState("");
  // const [skills, setSkills] = useState('');
  const [budgetType, setBudgetType] = useState("");
  const [budget, setBudget] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  // const [paymentVerified, setPaymentVerified] = useState(false);
  const [scope, setScope] = useState("");
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [catagory, setCatagory] = useState("");
  const [catData, setCatData] = useState<any[]>([]);
  const [budgetPlaceholder, setBudgetPlaceholder] = useState("");

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(capitalizeFirstLetter(value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  // const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSkills(e.target.value);
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPosting(true); // Set loading state to true
    // Retrieving user data from cookies
    const formData = new FormData();
    formData.append("users", user.id); //notokens yet sending form id from cookie which is stored when logged in
    formData.append("projectName", title);
    formData.append("projectDescription", description);
    formData.append("projectDeadline", deadline);
    formData.append("experienceYear", experienceYear); //was supposed to be"how long will work take" but backend has named experienceYear
    formData.append("levelOfExperience", levelOfExperience);
    formData.append("scope", scope);
    formData.append("budgets", budgetType);
    formData.append("projectAmount", budget);
    formData.append("projectCategory", catagory);

    // formData.append('paymentVerified', paymentVerified.toString());
    if (attachment) {
      formData.append("projectUrl", attachment);
    }

    try {
      setIsPosting(true); // Set loading state to true
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include credentials with the request
        }
      );
      console.log(response);
      setResultMessage("Assignment posted successfully!");
      setResultModalVisible(true);
      fetchData();
      console.log("Assignment posted successfully:", response.data);
    } catch (error) {
      // setResultMessage('Error posting assignment. Please try again.');
      // setResultModalVisible(true);
      console.error("Error posting assignment:", error);
    } finally {
      setIsPosting(false); // Reset loading state
    }
    // Clear the form
    setTitle("");
    setDescription("");
    setDeadline("");
    // setExperience('');
    // setSkills('');
    // setScope("");
    setBudgetType("");
    setBudget("");
    setCatagory("");
    setAttachment(null);
    // setPaymentVerified(false);
  };
  useEffect(() => {
    // Define an async function inside useEffect to fetch the data
    const fetchCatagory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/`,
          {
            withCredentials: true, // If you are using cookies for authentication
          }
        ); // Replace with your API endpoint
        console.log(response.data);
        setCatData(response.data); // Store the data in state
      } catch (err) {
        console.log(err); // Log the error if something goes wrong
      }
    };

    fetchCatagory(); // Call the async function
  }, []); // Dependency array is empty, so this runs only once after the initial render

  const handleCloseResultModal = () => {
    setResultModalVisible(false);
    onClose();
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
            /
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Post a New Assignment</h2>
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
              onChange={handleTitleChange} // Use the new handler here
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
              onChange={(e) => setlevelOfExperience(e.target.value)}
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
              htmlFor="levelOfExperience"
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
              <option value="ONE_TO_THREE_MONTH">One to three month</option>
              <option value="THREE_TO_SIX_MONTH">Three to six month</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="catagory"
              className="block text-sm font-medium text-gray-700"
            >
              Job Category
            </label>
            <select
              id="catagory"
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Category</option>
              {catData.map((catData) => (
                <option key={catData.id} value={catData.id}>
                  <div className="text-black"> {catData.category}</div>
                </option>
              ))}
            </select>
          </div>

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
                  onChange={(e) => {
                    setBudgetType(e.target.value);
                    setBudgetPlaceholder("/hr");
                  }}
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
                  onChange={(e) => {
                    setBudgetType(e.target.value);
                    setBudgetPlaceholder("");
                  }}
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
                <div className="flex flex-row">
                  {" "}
                  <input
                    type="radio"
                    name="budgetType"
                    value="TASK_BASED"
                    checked={budgetType === "TASK_BASED"}
                    onChange={(e) => {
                      setBudgetType(e.target.value);
                      setBudgetPlaceholder(" /task");
                    }}
                    className="absolute top-0 left-0"
                  />
                </div>
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
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget (in USD)
            </label>
            <div className="flex flex-row items-center ">
              <input
                id="budget"
                type="number"
                placeholder="$"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-1 block wax-w-9 border border-gray-300 rounded-md p-2"
                required
              />
              <div className="mx-1">{budgetPlaceholder}</div>
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
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={4}
              required
            ></textarea>
          </div>

          {/* <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={paymentVerified}
                onChange={(e) => setPaymentVerified(e.target.checked)}
                className="mr-2"
              />
              Payment Verified
            </label>
          </div> */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded hover:bg-orange-600 primary-orangebg"
              disabled={isPosting}
            >
              {isPosting ? "Posting..." : "Post Assignment"}
            </button>
          </div>
        </form>
      </div>

      {resultModalVisible && (
        <ResultModal message={resultMessage} onClose={handleCloseResultModal} />
      )}

      <ToastContainer />
    </div>
  );
};

export default PostAssignmentModal;
