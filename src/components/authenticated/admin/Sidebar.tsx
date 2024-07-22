import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

interface SidebarProps {
  onSelect: (content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: 2,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        position: 'fixed',
        overflowY: 'auto'  // Ensure sidebar content can scroll if it overflows
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Navigation</Typography>
      <List>
        <ListItem>
          <Button onClick={() => onSelect('Page1')} fullWidth>
            Page 1
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => onSelect('Page2')} fullWidth>
            Page 2
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => onSelect('Page3')} fullWidth>
            Page 3
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
