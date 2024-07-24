"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultModal from './ResultModal';
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
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deadline', deadline);
    formData.append('experience', experience);
    formData.append('skills', skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '').join(','));
    formData.append('scope', JSON.stringify(scope));
    formData.append('budgetType', budgetType);
    formData.append('budget', budget);
    formData.append('paymentVerified', paymentVerified.toString());
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await axios.post('/api/assignments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResultMessage('Assignment posted successfully!');
      setResultModalVisible(true);
      console.log('Assignment posted successfully:', response.data);
    } catch (error) {
      setResultMessage('Error posting assignment. Please try again.');
      setResultModalVisible(true);
      console.error('Error posting assignment:', error);
    }

    // Clear the form
    setTitle('');
    setDescription('');
    setDeadline('');
    setExperience('');
    setSkills('');
    setScope([]);
    setBudgetType('');
    setBudget('');
    setAttachment(null);
    setPaymentVerified(false);
  };

  const handleCloseResultModal = () => {
    setResultModalVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto">
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
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Required Experience
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Experience Level</option>
              <option value="entry">Entry</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
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
            <div className="mt-1 flex flex-row items-center border-2 cb-shadow  p-10">
              <label className="flex items-center cb-shadow ">
                <input
                  type="radio"
                  name="budgetType"
                  value="hourly"
                  checked={budgetType === 'hourly'}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="mr-2"
                />
                Hourly Rate
              </label>
              <label className="flex items-center cb-shadow mx-3">
                <input
                  type="radio"
                  name="budgetType"
                  value="fixed"
                  checked={budgetType === 'fixed'}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="mr-2"
                />
                Fixed Rate
              </label>
              <label className="flex items-center cb-shadow  mx-3">
                <input
                  type="radio"
                  name="budgetType"
                  value="task"
                  checked={budgetType === 'task'}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="mr-2"
                />
                Task-Based
              </label>
              <label className="flex items-center cb-shadow ">
                <input
                  type="radio"
                  name="budgetType"
                  value="recurring"
                  checked={budgetType === 'recurring'}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="mr-2"
                />
                Recurring Payment
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget of Project
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
              Attachment (optional)
            </label>
            <input
              id="attachment"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="paymentVerified" className="flex items-center">
              <input
                id="paymentVerified"
                type="checkbox"
                checked={paymentVerified}
                onChange={() => setPaymentVerified(!paymentVerified)}
                className="mr-2"
              />
              Payment Verified
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Post Assignment
          </button>
        </form>

        {/* ToastContainer is added to the component tree */}
        <ToastContainer />
      </div>

      {/* Conditional rendering of the ResultModal */}
      {resultModalVisible && (
        <ResultModal
          message={resultMessage}
          onClose={handleCloseResultModal}
        />
      )}
    </div>
  );
};

export default PostAssignmentModal;
