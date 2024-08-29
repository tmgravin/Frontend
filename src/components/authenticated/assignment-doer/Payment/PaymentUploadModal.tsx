import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { getUserFromCookies } from "@/components/auth/token";
import { toast, ToastContainer } from "react-toastify";

const userid = getUserFromCookies();

interface PaymentUploadModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number;
  projectName: string;
  name: string;
}

const PaymentUploadModal: React.FC<PaymentUploadModalProps> = ({
  open,
  onClose,
  projectId,
  projectName,
  name,
}) => {
  const [amount, setAmount] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value === "" ? "" : Number(value));
  };

  const handlePaymentMethodChange = (event: SelectChangeEvent<string>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("projects", projectId.toString());
    formData.append("amount", amount.toString());
    formData.append("paymentMethod", paymentMethod);
    formData.append("users", userid.id);
    if (file) {
      formData.append("screenshotUrl", file);
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include credentials with the request
      })
      .then((response) => {
        toast.success("Payment updated successfully.");
        console.log("Payment data uploaded successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error uploading payment data:", error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Upload Payment Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User ID"
            type="text"
            fullWidth
            value={userid.id}
            disabled
          />
          <TextField
            margin="dense"
            label="Project ID"
            type="text"
            fullWidth
            value={projectId}
            disabled
          />
          <TextField
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            disabled
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            disabled
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              label="Payment Method"
            >
              <MenuItem value="CARD">CARD</MenuItem>
              <MenuItem value="BANK">BANK</MenuItem>
            </Select>
          </FormControl>
          <input
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            id="upload-file"
            type="file"
            onChange={handleFileChange}
            required
          />
          <label htmlFor="upload-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              fullWidth
              style={{ marginTop: "16px" }}
              className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
            >
              Upload Screenshot/File
            </Button>
          </label>
          {file && (
            <div style={{ marginTop: "10px" }}>
              <strong>Selected File:</strong> {file.name}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaymentUploadModal;
