"use client";
import React, { useState, MouseEvent } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, Avatar, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getUserFromCookies } from "../../auth/token"; // Adjust the path as necessary
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch user from cookies
const user = getUserFromCookies();

const UserModal: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Function to remove a cookie
  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = async () => {
    try {
      removeCookie("user");
      console.log("User cookie has been cleared");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/security/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logout Successful");
      } else {
        toast.error("Logout Failed");
      }
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
          <IconButton onClick={handleMenuClick} sx={{ ml:0 }}>
            {user?.imageUrl ? (
              <Avatar src={user.imageUrl} alt={user.name} />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
          </IconButton>
          <div className="flex flex-col items-end justify-center"> {/* Align text to the right */}
            <Typography
              variant={isSmallScreen ? "body1" : "h6"} // Responsive typography
              sx={{
                mr: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "right", // Align text to the right
              }}
            >
              {user?.name || "Loading..."}
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
                {user?.userType || "Loading..."}
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
