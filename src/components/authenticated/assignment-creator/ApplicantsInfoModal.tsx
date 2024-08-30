import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Applicant {
  name: string;
  email: string;
  appliedDate?: string; // Mark as optional
  status?: string;
  createdAt: string;
  cv: any;
}

interface Project {
  projectName: string;
  projectAmount: number;
  projectDeadline: string;
}

interface DataItem {
  id: number;
  projects: Project;
  doer: Applicant;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicants?: Applicant[];
  coverLetter?: String;
}

interface ApplicantsInfoModalProps {
  open: boolean;
  onClose: () => void;
  assignment: any;
}

const ApplicantsInfoModal: React.FC<ApplicantsInfoModalProps> = ({
  open,
  onClose,
  assignment,
}) => {
  // Initialize state outside of any conditionals
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  // Update the applicants whenever the assignment changes
  React.useEffect(() => {
    if (assignment) {
      setApplicants([assignment.doer, ...(assignment.applicants ?? [])]);
    }
  }, [assignment]);

  const handleReject = async (applicationId: number) => {
    // Placeholder logic for rejection
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.email === assignment?.doer.email
          ? { ...applicant, status: "Rejected" }
          : applicant
      )
    );
    toast.error("Application rejected successfully!");
  };

  const acceptApplication = async (applicationId: number) => {
    try {
      const formData = new FormData();
      formData.append("applicationId", applicationId.toString());

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/acceptApplication`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.email === assignment?.doer.email
            ? { ...applicant, status: "Accepted" }
            : { ...applicant, status: "Rejected" }
        )
      );

      toast.success("Application accepted successfully!");
    } catch (error) {
      console.error("Error accepting application", error);
      toast.error("Error accepting application. Please try again.");
    }
  };

  if (!assignment) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Applicants Information</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Project Details</Typography>
        <Typography variant="body1">
          <strong>Project Name:</strong> {assignment.projects.projectName}
        </Typography>
        <Typography variant="body1">
          <strong>Project Amount:</strong> ${assignment.projects.projectAmount}
        </Typography>
        <Typography variant="body1">
          <strong>Project Deadline:</strong>{" "}
          {assignment.projects.projectDeadline}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Applicants Information
        </Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>cv</TableCell>
              <TableCell>coverletter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length ? (
              applicants.map((applicant, index) => (
                <TableRow key={index}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.createdAt}</TableCell>
                  <TableCell>{applicant.status ?? "Pending"}</TableCell>
                  <TableCell>{applicant.cv ?? "-"}</TableCell>
                  <TableCell>{assignment.coverLetter}</TableCell>

                  <TableCell className="flex flex-row">
                    <Button
                      variant="contained"
                      className="primary-orangebg hover:bg-orange-600"
                      onClick={() => acceptApplication(assignment.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-white hover:bg-slate-300 text-black ml-2"
                      onClick={() => handleReject(assignment.id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No applicants available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className="primary-orangebg hover:bg-orange-600 text-white"
        >
          Close
        </Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default ApplicantsInfoModal;
