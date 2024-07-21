"use client"

import React, { useState } from 'react';

interface CreditCardVerificationModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreditCardVerificationModal: React.FC<CreditCardVerificationModalProps> = ({ onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cardData = {
      cardNumber,
      cardholderName,
      expirationDate,
      cvv,
    };
    onSubmit(cardData);

    // Clear the form and close the modal
    setCardNumber('');
    setCardholderName('');
    setExpirationDate('');
    setCvv('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Credit Card Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={16}
              pattern="\d{16}"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              id="expirationDate"
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={5}
              pattern="\d{2}/\d{2}"
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={3}
              pattern="\d{3}"
              placeholder="123"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white rounded-lg px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardVerificationModal;
