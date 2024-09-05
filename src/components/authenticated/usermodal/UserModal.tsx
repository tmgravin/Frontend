"use client";
import React, { useState, MouseEvent, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserData from "@/components/providers/UserProvider";
import axios from "axios";
import { getUserFromCookies } from "@/components/auth/oldtoken";
const cookieuser = getUserFromCookies();

const UserModal: React.FC = () => {
  const { user, setUser, fieldValues, setFieldValues, fetchData } =
    useUserData();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      toast.warning("logging out");
    } catch (err) {
      toast.error("Logout Failed");
      console.log("Error occurred", err);
    } finally {
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage`);
    }
  };

  const handleSetting = () => {
    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/setting`);
  };

  const openMenu = Boolean(anchorEl);

  // Function to map userType to a readable label
  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "ASSIGNMENT_DOER":
        return "Doer";
      case "ASSIGNMENT_CREATOR":
        return "Creator";
      case "ADMIN":
        return "Admin";
      default:
        return "Loading..";
    }
  };

  // Capitalize the first letter and make the rest lowercase
  const formatName = (name: string) => {
    if (!name) return "Loading...";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align content to the right
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse", // Reverse row direction
          }}
        >
          <IconButton onClick={handleMenuClick} sx={{ ml: 0 }}>
            {user?.profileImageUrl ? (
              <Avatar src={user?.profileImageUrl} alt={user.name} />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
          </IconButton>
          <div className="flex flex-col items-end justify-center">
            {/* Align text to the right */}
            <Typography
              variant={isSmallScreen ? "body1" : "h6"} // Responsive typography
              sx={{
                mr: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "right", // Align text to the right
                textTransform: "capitalize", // Capitalize first letter
              }}
            >
              {formatName(user?.name || "")}
            </Typography>
            {!isSmallScreen && (
              <Typography
                variant="subtitle2"
                sx={{
                  mr: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "right", // Align text to the right
                }}
              >
                {getUserTypeLabel(user?.userType) || "Loading..."}
              </Typography>
            )}
          </div>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
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
          <MenuItem onClick={handleSetting}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default UserModal;
