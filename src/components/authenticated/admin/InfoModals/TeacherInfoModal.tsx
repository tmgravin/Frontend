import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../Doers";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
const cookieuser = getUserFromCookies();

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  open: boolean;
}

const TeacherInfoModal: React.FC<UserModalProps> = ({
  user,
  onClose,
  open,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [totalEarning, setTotalEarning] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id && open) {
          //   const response = await axios.get(
          //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/?id=${user.id}`,
          //     { withCredentials: true }
          //   );
          //   setUserData(response.data);

          const totalEarningResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/doer/total-earnings?doerId=${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${cookieuser?.token}`, // Replace `yourBearerToken` with your actual token
              },
              withCredentials: true,
            }
          );
          setTotalEarning(totalEarningResponse.data);
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
        <Box className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
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
            Teacher Details
          </Typography>

          <p>Profile Picture here</p>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Doer ID:</strong> {user.id}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Registration Date:</strong> {user.createdAt}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Address:</strong> {user.address}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>CV:</strong>
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Cover letter:</strong>
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Total Earning:</strong>
            {totalEarning}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Paymetn Verified:</strong>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default TeacherInfoModal;
