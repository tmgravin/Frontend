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
      <ToastContainer />
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
