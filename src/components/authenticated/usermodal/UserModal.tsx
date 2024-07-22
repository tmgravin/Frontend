// UserMenu.tsx
import React, { useState, MouseEvent } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';


const username = "bishnu";
const id='asdasdasd'

const UserModal: React.FC = () => {
    const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout=()=>{
    //logout function
        router.push(`./homepage`)
  }
const handleSetting=()=>{
    router.push(`./homepage/setting/${id}`)

}
  const openMenu = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mr: 2 }}>
        {username}
      </Typography>
      <IconButton onClick={handleMenuClick}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleSetting}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserModal;
