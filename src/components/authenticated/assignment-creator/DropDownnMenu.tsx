// DropdownMenu.tsx
import React from 'react';

interface DropdownMenuProps {
  onPostAssignmentClick: () => void;
  onYourAssignmentsClick: () => void;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onPostAssignmentClick, onYourAssignmentsClick, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-48 z-50">
      <button
        onClick={() => {
          onPostAssignmentClick();
          onClose();
        }}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Post Assignment
      </button>
      <button
        onClick={() => {
          onYourAssignmentsClick();
          onClose();
        }}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Your Assignments
      </button>
    </div>
  );
};

export default DropdownMenu;
