"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DataItem {
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
    { id: 3, title: 'Project 3', description: 'Description 3', amount: 3000, deadline: '2024-09-01' },
    { id: 4, title: 'Project 4', description: 'Description 4', amount: 4000, deadline: '2024-07-25' },
    { id: 5, title: 'Project 5', description: 'Description 5', amount: 5000, deadline: '2024-08-05' },
    { id: 6, title: 'Project 6', description: 'Description 6', amount: 6000, deadline: '2024-09-10' },
    { id: 7, title: 'Project 7', description: 'Description 7', amount: 7000, deadline: '2024-07-29' },
    { id: 8, title: 'Project 8', description: 'Description 8', amount: 8000, deadline: '2024-08-20' },
    { id: 9, title: 'Project 9', description: 'Description 9', amount: 9000, deadline: '2024-09-15' },
    { id: 10, title: 'Project 10', description: 'Description 10', amount: 10000, deadline: '2024-10-01' },
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

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/projects'); // Replace with your API endpoint
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
    // Process the form data
    console.log('Form Data:', formData);
    closeApplyModal();
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleBankSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process bank details
    console.log('Bank Details:', bankDetails);
    closeBankModal();
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p className="text-sm">Project Amount: {item.amount}</p>
            <p className="text-sm">Deadline: {item.deadline}</p>
            <button
              onClick={() => openApplyModal(item)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
      {visibleCount < data.length && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}

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
              <div className="mb-4">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Contact"
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  name="coverLetter"
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="coverLetter">Cover Letter</label>
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  name="cv"
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="cv">CV</label>
              </div>
              <div className="flex justify-end mb-4">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={openBankModal}
                >
                  Add Bank Details
                </Button>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Modal>

      {/* Bank Details Modal */}
      <Modal
        open={isBankModalOpen}
        onClose={closeBankModal}
        aria-labelledby="bank-details-modal-title"
        aria-describedby="bank-details-modal-description"
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
            <Typography variant="h6" id="bank-details-modal-title" className="mb-4">
              Add Bank Details
            </Typography>
            <form onSubmit={handleBankSubmit}>
              <div className="mb-4">
                <TextField
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={bankDetails.accountHolderName}
                  onChange={handleBankDetailsChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Bank Name"
                  name="bankName"
                  value={bankDetails.bankName}
                  onChange={handleBankDetailsChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={handleBankDetailsChange}
                  fullWidth
                  required
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="IFSC Code"
                  name="ifscCode"
                  value={bankDetails.ifscCode}
                  onChange={handleBankDetailsChange}
                  fullWidth
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Projects;
