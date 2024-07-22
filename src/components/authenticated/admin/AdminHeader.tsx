"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const AdminHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleNavigation = (path: string) => () => {
    router.push(path);
    setIsDrawerOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
            <List>
              <ListItem button onClick={handleNavigation('/page1')}>
                <ListItemText primary="Page 1" />
              </ListItem>
              <ListItem button onClick={handleNavigation('/page2')}>
                <ListItemText primary="Page 2" />
              </ListItem>
              <ListItem button onClick={handleNavigation('/page3')}>
                <ListItemText primary="Page 3" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
