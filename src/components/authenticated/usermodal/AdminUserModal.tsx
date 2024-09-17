"use client";
import React, { useState, MouseEvent } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdminData from "@/components/providers/AdminProvides";

import { getUserFromCookies } from "@/components/cookie/oldtoken";
const cookieuser = getUserFromCookies();

const AdminUserModal: React.FC = () => {
  const { user, setUser, fieldValues, setFieldValues, fetchData } =
    useAdminData();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleOpenConfirmLogout = () => {
    handleMenuClose();
    setOpenConfirmLogout(true);
  };

  const handleCloseConfirmLogout = () => setOpenConfirmLogout(false);

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = async () => {
    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout/${cookieuser?.id}`
      // );
      removeCookie("token");
      toast.warning("Logging out...");
    } catch (err) {
      toast.error("Logout Failed");
      console.log("Error occurred", err);
    } finally {
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/mspacademy-admin`);
    }
  };

  const handleSetting = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/admindashboard/setting`
    );
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
          <MenuItem onClick={handleSetting}>Settings</MenuItem>
          <MenuItem onClick={handleOpenConfirmLogout}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={openConfirmLogout} onClose={handleCloseConfirmLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseConfirmLogout}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleLogout();
              handleCloseConfirmLogout();
            }}
            className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default AdminUserModal;
