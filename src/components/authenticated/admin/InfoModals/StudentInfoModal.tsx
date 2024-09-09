import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../Creators";
import UsersAssignment from "./UsersAssignment";
import { getUserFromCookies } from "@/components/auth/oldtoken";

const cookieuser = getUserFromCookies();

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  open: boolean;
}

const StudentInfoModal: React.FC<UserModalProps> = ({
  user,
  onClose,
  open,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [totalSpent, setTotalSpent] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id && open) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/?id=${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${cookieuser?.token}`, // Replace `yourBearerToken` with your actual token
              },
              withCredentials: true,
            }
          );
          setUserData(response.data);
          const totalspentresponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/creator/total-spent?creatorId=1${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${cookieuser?.token}`, // Replace `yourBearerToken` with your actual token
              },
              withCredentials: true,
            }
          );
          setTotalSpent(totalspentresponse.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, [user, open]);

  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Box className="bg-white p-6 rounded shadow-md w-1/2 relative max-h-[80vh] overflow-y-auto">
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            className="absolute top-2 right-2"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="user-modal-title" className="mb-4">
            {userData.name}'s Details
          </Typography>
          {userData ? (
            <>
              <Typography id="user-modal-description" className="mb-2">
                <strong>ID:</strong> {userData.id}
              </Typography>
              <Typography id="user-modal-description" className="mb-2">
                <strong>Name:</strong> {userData.name}
              </Typography>
              <Typography id="user-modal-description" className="mb-2">
                <strong>Email:</strong> {userData.email}
              </Typography>
              <Typography id="user-modal-description" className="mb-2">
                <strong>Phone:</strong> {userData.phone}
              </Typography>
              <Typography id="user-modal-description" className="mb-2">
                <strong>Registration Date:</strong> {userData.createdAt}
              </Typography>
              <Typography id="user-modal-description" className="mb-2">
                <strong>Address:</strong> {userData.address}
              </Typography>
              <Typography id="user-modal-description" className="mb-2">
                <strong>Total Spent:</strong> {totalSpent}
              </Typography>
            </>
          ) : (
            <Typography>Loading user details...</Typography>
          )}

          <Box className="mt-4">
            <UsersAssignment user={user} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default StudentInfoModal;
