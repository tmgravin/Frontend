// src/components/authenticated/project-table/InfoModals/PaymentInfoModal.tsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import axios from 'axios';

interface PaymentInfoModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number;
}

interface PaymentInfo {
  amountPaid: string;
  paymentStatus: string;
  paymentDate: string;
}


const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({ open, onClose, projectId }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    if (open && projectId) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/${projectId}`)
        .then(response => {
          setPaymentInfo(response.data);
        })
        .catch(error => {
          console.error("Error fetching payment info:", error);
        });
    }
  }, [open, projectId]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Information</DialogTitle>
      <DialogContent>
        {paymentInfo ? (
          <>
            <Typography variant="body1"><strong>Amount Paid:</strong> {paymentInfo.amountPaid}</Typography>
            <Typography variant="body1"><strong>Payment Status:</strong> {paymentInfo.paymentStatus}</Typography>
            <Typography variant="body1"><strong>Payment Date:</strong> {new Date(paymentInfo.paymentDate).toLocaleDateString()}</Typography>
            <Typography variant="body1"><button>approve payment as complete</button></Typography>

          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentInfoModal;
