import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
interface Creator {
  name: string;
  email: string;
}

interface Category {
  category: string;
}

interface Project {
  projectName: string;
  projectDescription: string;
  projectAmount: string;
  projectDeadline: string;
  paymentStatus: string;
  projectCategory: Category;
  users: Creator;
  projectUrl: string | ArrayBuffer;
}

interface ProjectInfoModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  project,
  open,
  onClose,
}) => {
  const category = project.projectCategory.category || "N/A";

  const handleDownload = () => {
    if (typeof project.projectUrl === "string") {
      // Handle URL string
      const link = document.createElement("a");
      link.href = project.projectUrl;
      link.download = "project_file"; // Default filename, can be customized
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (project.projectUrl instanceof ArrayBuffer) {
      // Handle binary data (ArrayBuffer)
      const blob = new Blob([project.projectUrl]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "project_file"; // Default filename, can be customized
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up
    } else {
      console.error("Unsupported projectUrl type");
    }
  };

  const handleVisible = () => {
    const response = axios;

    console.log("payment approved");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Project Information</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Project Details</Typography>
        <Typography variant="body1">
          <strong>Project Name:</strong> {project.projectName}
        </Typography>
        <Typography variant="body1">
          <strong>Project Description:</strong> {project.projectDescription}
        </Typography>
        <Typography variant="body1">
          <strong>Project Amount:</strong> ${project.projectAmount}
        </Typography>
        <Typography variant="body1">
          <strong>Project Deadline:</strong>{" "}
          {new Date(project.projectDeadline).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Category:</strong> {category}
        </Typography>
        <Typography variant="body1">
          <strong>Payment Status:</strong> {project.paymentStatus}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Creator Information
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {project.users.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {project.users.email}
        </Typography>
        <Typography variant="body1">
          <strong>Project File:</strong>{" "}
          {typeof project.projectUrl === "string"
            ? "Link available"
            : "Binary data available"}
        </Typography>

        <Typography variant="body1">
          <Button onClick={handleDownload} color="primary">
            Download Project File
          </Button>
        </Typography>
        <Typography variant="body1">
          <Button onClick={handleVisible} color="primary">
            MAKE PROJECT VISIBLE TO CREATOR
          </Button>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectInfoModal;
