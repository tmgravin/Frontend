"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import useUserData from "@/components/providers/UserProvider";
const Header: React.FC = () => {
  const { user } = useUserData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cookieuser = getUserFromCookies();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

  const handleMenuClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = async () => {
    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout/${cookieuser?.id}`
      // );
      removeCookie("token");
      toast.warning("Logging out");
    } catch (err) {
      toast.error("Logout Failed");
      console.log("Error occurred", err);
    } finally {
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage`);
    }
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
    setAnchorEl(null);
  };

  const confirmLogout = () => {
    handleLogout();
    setIsModalOpen(false); // Close the modal after logout
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Just close the modal
  };

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "ASSIGNMENT_DOER":
        return "Doer";
      case "ASSIGNMENT_CREATOR":
        return "Creator";
      case "ADMIN":
        return "Admin";
      default:
        return "Loading...";
    }
  };

  const formatName = (name: string) => {
    if (!name) return "Loading...";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <header className="cb-shadow rounded-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/notextlogo.png" // Path relative to the public directory
            alt="logo"
            width={50} // Provide appropriate width
            height={50} // Provide appropriate height
          />
          <div className="mt-4 px-3">
            <h1 className="text-xs font-bold sm:text-2xl primary-navy-blue">
              MSP ACADEMY
            </h1>
          </div>
        </div>
        <div className="flex items-center">
          <Box className="text-right mr-2">
            <Typography variant="h6">
              {formatName(user?.name || "Loading...")}
            </Typography>
            <Typography variant="subtitle1">
              {getUserTypeLabel(user?.userType || "USER")}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuClick}>
            {user?.profileImageUrl ? (
              <Avatar src={user?.profileImageUrl} alt={user?.name} />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
              <p className="mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={confirmLogout}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
