"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultModal from './ResultModal';
import Image from 'next/image';

interface PostAssignmentModalProps {
  onClose: () => void;
}

const PostAssignmentModal: React.FC<PostAssignmentModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [budgetType, setBudgetType] = useState('');
  const [budget, setBudget] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [scope, setScope] = useState<string[]>([]);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [catagory, setCatagory] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleScopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setScope((prevScope) =>
      prevScope.includes(value) ? prevScope.filter((scope) => scope !== value) : [...prevScope, value]
    );
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('users', "1");
    formData.append('projectName', title);
    formData.append('description', description);
    formData.append('projectDeadline', deadline);
    formData.append('experienceYear', "LESS_THAN_ONE_MONTH");
    formData.append('levelOfExperience', "INTERMEDIATE");


    formData.append('scope',"LARGE");
    // formData.append('scope', JSON.stringify(scope));
    // formData.append('budgetType', budgetType);
    formData.append('projectAmount', budget);
    // formData.append('catagory', catagory);
    // formData.append('paymentVerified', paymentVerified.toString());
    if (attachment) {
      formData.append('projectUrl', attachment);
    }
    

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response)
      setResultMessage('Assignment posted successfully!');
      setResultModalVisible(true);
      console.log('Assignment posted successfully:', response.data);
    } catch (error) {
      // setResultMessage('Error posting assignment. Please try again.');
      // setResultModalVisible(true);
      console.error('Error posting assignment:', error);
    }

    // Clear the form
    // setTitle('');
    // setDescription('');
    // setDeadline('');
    // setExperience('');
    // setSkills('');
    // setScope([]);
    // setBudgetType('');
    // setBudget('');
    // setCatagory("");
    // setAttachment(null);
    // setPaymentVerified(false);
  };

  const handleCloseResultModal = () => {
    setResultModalVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
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
            />/
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Post a New Assignment</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="levelOfExperience" className="block text-sm font-medium text-gray-700">
              Required Experience
            </label>
            <select
              id="levelOfExperience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
  <label htmlFor="catagory" className="block text-sm font-medium text-gray-700">
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
    <option value="sctm">STEM-SCIENCE, TECHNOLOGY AND MATHEMATICS</option>
    <option value="writing">WRITING</option>
    <option value="projects">PROJECTS</option>
    <option value="others">OTHERS</option>
  </select>
</div>


          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills (separate by commas)
            </label>
            <input
              id="skills"
              type="text"
              value={skills}
              onChange={handleSkillsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., JavaScript, React, Node.js"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="scope" className="block text-sm font-medium text-gray-700">
              Scope of Project
            </label>
            <div className="mt-1 flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="large"
                  checked={scope.includes('large')}
                  onChange={handleScopeChange}
                  className="mr-2"
                />
                Large
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="medium"
                  checked={scope.includes('medium')}
                  onChange={handleScopeChange}
                  className="mr-2"
                />
                Medium
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="small"
                  checked={scope.includes('small')}
                  onChange={handleScopeChange}
                  className="mr-2"
                />
                Small
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="budgetType" className="block text-sm font-medium text-gray-700">
              Budget Type
            </label>
            <div className="mt-1 flex flex-row items-center justify-center border-2 p-4 relative">
              <label className="flex flex-col items-center relative">
                <input
                  type="radio"
                  name="budgetType"
                  value="hourly"
                  checked={budgetType === 'hourly'}
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
                  value="fixed"
                  checked={budgetType === 'fixed'}
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
              <label className="flex flex-col items-center justify-center relative mx-3">
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
              </label>
              <label className="flex flex-col items-center justify-center relative">
                <input
                  type="radio"
                  name="budgetType"
                  value="task-based"
                  checked={budgetType === 'task-based'}
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
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <input
              id="budget"
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={paymentVerified}
                onChange={(e) => setPaymentVerified(e.target.checked)}
                className="mr-2"
              />
              Payment Verified
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post Assignment
            </button>
          </div>
        </form>
      </div>

      {resultModalVisible && (
        <ResultModal
          message={resultMessage}
          onClose={handleCloseResultModal}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default PostAssignmentModal;
