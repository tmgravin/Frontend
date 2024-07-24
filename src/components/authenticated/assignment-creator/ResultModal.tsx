import React from 'react';

interface ResultModalProps {
  message: string;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
