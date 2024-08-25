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
import { getUserFromCookies } from "@/components/auth/token";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const user = getUserFromCookies();

  const handleMenuClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = async () => {
    try {
      removeCookie("user");
      toast.warning("Logging out");
      console.log("User cookie has been cleared");
    } catch (err) {
      toast.error("Logout Failed");
      console.log("Error occurred", err);
    } finally {
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage`);
    }
  };

  const fetchImage = async () => {
    try {
      const userId = user.id;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${userId}`
      );
      setImageUrl(response.data);
    } catch (error) {
      console.error("Error fetching the image URL:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  });

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "ASSIGNMENT_DOER":
        return "Doer";
      case "ASSIGNMENT_CREATOR":
        return "Creator";
      case "ADMIN":
        return "Admin";
      default:
        return "User";
    }
  };

  const formatName = (name: string) => {
    if (!name) return "Loading...";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <header className=" cb-shadow rounded-sm">
      <ToastContainer />
      <div className="sm:flex flex-row justify-between ">
        <div className="flex flex-row items-center">
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
        <div className="flex items-center ml-4">
          <Box>
            <Typography variant="h6">
              {formatName(user?.name || "Loading...")}
            </Typography>
            <Typography variant="subtitle1">
              {getUserTypeLabel(user?.userType || "USER")}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
            {imageUrl ? (
              <Avatar src={imageUrl} alt={user?.name} />
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
