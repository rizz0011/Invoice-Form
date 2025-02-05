import React, {  useEffect } from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { ToastContainer, toast, Flip } from "react-toastify";



const PDFUploadComponent = ({ setFile, fileName, setFileName }) => {

  useEffect(() => {
    const savedPdf = localStorage.getItem("invoicePDF");
    const savedFileName = localStorage.getItem("fileName");
    if (savedPdf) {
      setFile(savedPdf);
      setFileName(savedFileName);
    }
  }, [setFile]);

  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFileName(uploadedFile?.name);
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    } else {
      toast.error(`"Please upload a valid PDF file."`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Box
          textAlign="center"
          border={3}
          padding={3}
          borderRadius={2}
          borderColor="#ddd"
          sx={{ maxWidth: 400, mx: "auto", borderStyle: "dotted" }}
        >
          <CloudUploadIcon style={{ fontSize: 50, color: "#1976d2" }} />
          <Typography variant="body1" gutterBottom>
            Upload Your Invoice
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload PDF File
            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={onFileChange}
              id="pdf-upload"
            />
          </Button>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="primary">
              {fileName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default PDFUploadComponent;
