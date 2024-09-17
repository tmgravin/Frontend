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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserData from "@/components/providers/UserProvider";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
const cookieuser = getUserFromCookies();

const UserModal: React.FC = () => {
  const { user, fetchData } = useUserData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      toast.warning("Logging out");
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

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

  return (
    <div>
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
          <div className="md:flex flex-col items-end justify-center hidden">
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
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* Confirmation Modal */}
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
  );
};

export default UserModal;
