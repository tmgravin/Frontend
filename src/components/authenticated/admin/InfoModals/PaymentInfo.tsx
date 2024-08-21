"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PaymentInfoModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number;
}

interface PaymentInfo {
  id: number;
  amount: number;
  paymentMethod: string;
  isPaymentVerified: string;
  createdAt: string;
  users: {
    name: string;
    email: string;
  };
  projects: {
    projectName: string;
    projectAmount: number;
    projectDeadline: string;
    paymentStatus: string;
  };
}

const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  useEffect(() => {
    if (open && projectId) {
      setLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/?projectId=${projectId}`,
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.length > 0) {
            const data = response.data[0];
            setPaymentInfo({
              id: data.id,
              amount: data.amount,
              paymentMethod: data.paymentMethod,
              isPaymentVerified: data.isPaymentVerified,
              createdAt: data.createdAt,
              users: {
                name: data.users.name,
                email: data.users.email,
              },
              projects: {
                projectName: data.projects.projectName,
                projectAmount: data.projects.projectAmount,
                projectDeadline: data.projects.projectDeadline,
                paymentStatus: data.projects.paymentStatus,
              },
            });
          } else {
            setPaymentInfo(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching payment info:", error);
          setError(
            "An error occurred while fetching payment information."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, projectId]);

  const handleApprovePayment = () => {
    if (paymentInfo && isApproved) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/payment/approve?id=${paymentInfo.id}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(() => {
          console.log("Payment approved as complete");
          toast.success("Payment Approved Successfully");
          // Optionally, you could refetch the payment info or update the state
        })
        .catch((error) => {
          console.error("Error approving payment:", error);
          toast.error("Failed to Approve Payment");
          // Optionally, set an error state to display an error message
        });
    }
  };

  useEffect(() => {
    if (isApproved) {
      handleApprovePayment();
    }
  }, [isApproved]);

  return (
    <div>
      <ToastContainer />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : paymentInfo ? (
            <>
              <Typography variant="body1">
                <strong>Amount Paid:</strong> ${paymentInfo.amount.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Method:</strong> {paymentInfo.paymentMethod}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Verified:</strong>{" "}
                {paymentInfo.isPaymentVerified === "Y" ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Date:</strong>{" "}
                {new Date(paymentInfo.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Project Name:</strong> {paymentInfo.projects.projectName}
              </Typography>
              <Typography variant="body1">
                <strong>Project Amount:</strong> $
                {paymentInfo.projects.projectAmount.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>Project Deadline:</strong>{" "}
                {new Date(paymentInfo.projects.projectDeadline).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Status:</strong>{" "}
                {paymentInfo.projects.paymentStatus}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isApproved}
                    onChange={(e) => setIsApproved(e.target.checked)}
                    color="primary"
                  />
                }
                label="Approve Payment as Complete"
              />
            </>
          ) : (
            <Typography variant="body1">
              No payment information available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaymentInfoModal;
