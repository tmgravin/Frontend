import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import ApplicantsInfoModal from "./ApplicantsInfoModal";
import { getUserFromCookies } from "@/components/auth/oldtoken";

const user = getUserFromCookies();

interface DataItem {
  id: number;
  projects: {
    id: number;
    projectName: string;
    projectAmount: number;
    projectDeadline: string;
    budgets: string;
    createdAt: string;
    updatedAt: string;
    users: {
      id: number;
      name: string;
      email: string;
      isEmailVerified: string;
      password: string;
      phone: string;
      address: string;
      userType: string;
      loginType: string | null;
      createdAt: string;
      updatedAt: string;
      hibernateLazyInitializer: object;
    };
    projectCategory: {
      id: number;
      category: string;
      createdAt: string;
      updatedAt: string;
    };
    paymentStatus: string;
  };
  doer: {
    id: number;
    name: string;
    email: string;
    isEmailVerified: string;
    password: string;
    phone: string;
    address: string;
    userType: string;
    loginType: string | null;
    createdAt: string;
    updatedAt: string;
    hibernateLazyInitializer: object;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PendingForApproval: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<DataItem | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/creator?creatorId=${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          withCredentials: true,
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const handleViewApplicants = (assignment: DataItem) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  return (
    <Container>
      <p className="flex justify-center items-center primary-green p-2 font-bold">
        Assignment Pending For Approval
      </p>
      <Grid container spacing={4}>
        {data.length > 0 ? (
          data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  {item.projects.projectName}
                </Typography>
                <Typography variant="body1">
                  Description: {/* Add description if available */}
                </Typography>
                <Typography variant="body2">
                  Amount: ${item.projects.projectAmount}
                </Typography>
                <Typography variant="body2">
                  Deadline: {item.projects.projectDeadline}
                </Typography>
                <Button
                  variant="contained"
                  className="primary-orangebg hover:bg-orange-700"
                  onClick={() => handleViewApplicants(item)}
                  sx={{ mt: 2 }}
                >
                  View Applicants
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ p: 2 }}>
            No data available.
          </Typography>
        )}
      </Grid>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        {loading && <CircularProgress size={24} />}
      </Box>
      {selectedAssignment && (
        <ApplicantsInfoModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          assignment={selectedAssignment}
        />
      )}
    </Container>
  );
};

export default PendingForApproval;
