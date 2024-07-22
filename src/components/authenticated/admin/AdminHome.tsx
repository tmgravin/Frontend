"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import { Box } from '@mui/material';
import UserModal from './AdminMenu';

const HomePage: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<string>('Welcome! Please select an option.');

  const handleSelect = (content: string) => {
    setCurrentContent(content);
  };

  return (
    <div><UserModal/>
    <Box sx={{  }}>
      <Sidebar onSelect={handleSelect} />
      <Box
        sx={{
          marginLeft: 250,  // Match the sidebar width
          padding: 2,
          width: 'calc(100% - 250px)', // Adjust width to take up remaining space
          overflowY: 'auto' // Ensure content area can scroll if it overflows
        }}
      >
        <Content currentContent={currentContent} />
      </Box>
    </Box>
    </div>
  );
};

export default HomePage;
