"use client"

import React, { useState } from 'react';

interface PostAssignmentModalProps {
  onClose: () => void;
}

const PostAssignmentModal: React.FC<PostAssignmentModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [scope, setScope] = useState('');
  const [budget, setBudget] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission
    const newAssignment = {
      title,
      description,
      deadline,
      firstName,
      lastName,
      email,
      contactNumber,
      jobTitle,
      experience,
      skills,
      scope,
      budget,
      attachment,
      paymentVerified
    };
    console.log(newAssignment);

    // Clear the form and close the modal
    setTitle('');
    setDescription('');
    setDeadline('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setContactNumber('');
    setJobTitle('');
    setExperience('');
    setSkills('');
    setScope('');
    setBudget('');
    setAttachment(null);
    setPaymentVerified(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Post a New Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
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
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Required Experience
            </label>
            <input
              id="experience"
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="scope" className="block text-sm font-medium text-gray-700">
              Scope of Project
            </label>
            <input
              id="scope"
              type="text"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
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
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
              Attachment
            </label>
            <input
              id="attachment"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentVerified" className="block text-sm font-medium text-gray-700">
              Payment Verified
            </label>
            <input
              id="paymentVerified"
              type="checkbox"
              checked={paymentVerified}
              onChange={(e) => setPaymentVerified(e.target.checked)}
              className="mt-1 block"
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
              Post Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAssignmentModal;
