"use client"

import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReadMoreModal from './ReadMoreModal'; // Import ReadMoreModal

export interface DataItem {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
}

const Projects: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    { id: 1, title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30' },
    { id: 2, title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15' },
    { id: 1, title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30' },
    { id: 2, title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15' },
    { id: 1, title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30' },
    { id: 2, title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15' },
    { id: 1, title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30' },
    { id: 2, title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15' },
    { id: 1, title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30' },
    { id: 2, title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15' },
    // ... (other projects)
  ]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DataItem | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    coverLetter: null as File | null,
    cv: null as File | null,
  });
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/projects');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const openApplyModal = (project: DataItem) => {
    setSelectedProject(project);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setSelectedProject(null);
  };

  const openBankModal = () => {
    setIsBankModalOpen(true);
  };

  const closeBankModal = () => {
    setIsBankModalOpen(false);
  };

  const openReadMoreModal = (project: DataItem) => {
    setSelectedProject(project);
    setIsReadMoreModalOpen(true);
  };

  const closeReadMoreModal = () => {
    setIsReadMoreModalOpen(false);
    setSelectedProject(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'coverLetter' || name === 'cv') {
      setFormData((prevData) => ({ ...prevData, [name]: files?.[0] || null }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    closeApplyModal();
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleBankSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Bank Details:', bankDetails);
    closeBankModal();
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-center items-center primary-green p-2'>Latest Assignments you can work on</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <div className="flex items-center">
              <p className="flex-grow">{item.description}</p>
              <button
                onClick={() => openReadMoreModal(item)}
                className="ml-4 px-4 py-2 text-blue-500 hover:underline"
              >
                Read More
              </button>
            </div>
            <p className="text-sm">Project Amount: {item.amount}</p>
            <p className="text-sm">Deadline: {item.deadline}</p>
            <button
              onClick={() => openApplyModal(item)}
              className="mt-2 px-4 py-2 primary-btn-blue text-white rounded"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center'>
        {visibleCount < data.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2  text-white rounded primary-btn-blue"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>

      {/* Apply Modal */}
      <Modal
        open={isApplyModalOpen}
        onClose={closeApplyModal}
        aria-labelledby="apply-modal-title"
        aria-describedby="apply-modal-description"
      >
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Box className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeApplyModal}
              aria-label="close"
              className="absolute top-2 right-2"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" id="apply-modal-title" className="mb-4">
              Apply for {selectedProject?.title}
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                type="email"
              />
              <TextField
                name="contact"
                label="Contact"
                value={formData.contact}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                type="tel"
              />
              <TextField
                name="coverLetter"
                label="Cover Letter"
                type="file"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="cv"
                label="CV"
                type="file"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

      {/* Bank Details Modal */}
      <Modal
        open={isBankModalOpen}
        onClose={closeBankModal}
        aria-labelledby="bank-modal-title"
        aria-describedby="bank-modal-description"
      >
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Box className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeBankModal}
              aria-label="close"
              className="absolute top-2 right-2"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" id="bank-modal-title" className="mb-4">
              Bank Details
            </Typography>
            <form onSubmit={handleBankSubmit}>
              <TextField
                name="accountHolderName"
                label="Account Holder Name"
                value={bankDetails.accountHolderName}
                onChange={handleBankDetailsChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="bankName"
                label="Bank Name"
                value={bankDetails.bankName}
                onChange={handleBankDetailsChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="accountNumber"
                label="Account Number"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="ifscCode"
                label="IFSC Code"
                value={bankDetails.ifscCode}
                onChange={handleBankDetailsChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

      {/* Read More Modal */}
      <ReadMoreModal
        project={selectedProject}
        onClose={closeReadMoreModal}
        open={isReadMoreModalOpen}
        onApply={openApplyModal} // Pass the callback here
      />
    </div>
  );
};

export default Projects;
