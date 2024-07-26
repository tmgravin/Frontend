"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';
import { DataItem } from './LatestProjects'; // Adjust the import path as needed

interface EditAssignmentModalProps {
  assignment: DataItem;
  onClose: () => void;
  onSave: (updatedProject: DataItem) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({ assignment, onClose, onSave, onChange }) => {
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [amount, setAmount] = useState(assignment.amount);
  const [deadline, setDeadline] = useState(assignment.deadline);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedProject: DataItem = {
      title,
      description,
      amount,
      deadline
    };

    try {
      await axios.put(`/api/projects/${assignment.title}`, updatedProject);
      onSave(updatedProject);
      setResultMessage('Project updated successfully!');
    } catch (error) {
      setResultMessage('Error updating project. Please try again.');
    }

    setResultModalVisible(true);
  };

  const handleCloseResultModal = () => {
    setResultModalVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
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
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
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

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>

      {resultModalVisible && (
        <ResultModal 
          message={resultMessage} 
          onClose={handleCloseResultModal} 
        />
      )}
    </div>
  );
};

export default EditAssignmentModal;
