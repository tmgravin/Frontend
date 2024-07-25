// CustomTabModal.tsx
"use client"

import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import AssignmentStatus from './AssignmentStatus';
import CompletedAssignments from './CompletedAssignments';

interface CustomTabModalProps {
  onClose: () => void;
}

const CustomTabModal: React.FC<CustomTabModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-h-[90vh] overflow-y-auto relative">
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
        <h2 className="text-2xl font-bold mb-4">Your Assignments</h2>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List className="flex space-x-2 border-b border-gray-300 mb-4 justify-center items-center">
            <Tabs.Trigger
              value="tab1"
              className="py-2 px-4 border-b-2 border-transparent cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
            >
              Completed Assignments
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              className="py-2 px-4 border-b-2 border-transparent cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
            >
              Assignments Status
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="space-y-4 flex justify-center items-center">
            <CompletedAssignments />
          </Tabs.Content>
          <Tabs.Content value="tab2" className="space-y-4 flex justify-center items-center">
            <AssignmentStatus />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default CustomTabModal;
