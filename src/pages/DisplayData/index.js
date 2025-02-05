import React, { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function DisplayData({ data}) {


  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [file, setFile] = React.useState(null);

  useEffect(() => {
    const savedPdf = localStorage.getItem("invoicePDF");
    if (savedPdf) {
      setFile(savedPdf);
    }
  }, [setFile]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };


  return (
   
      <Box sx={{mt:10}} >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          textAlign="center"
        >
          Invoice Details
        </Typography>
        {(data && file) ? 
        <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Vendor:</strong>
              </Typography>
              <Typography variant="body1">{data?.vendor}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Purchase Order Number:</strong>
              </Typography>
              <Typography variant="body1">{data?.poNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Invoice Number:</strong>
              </Typography>
              <Typography variant="body1">{data?.invoiceNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Invoice Date:</strong>
              </Typography>
              <Typography variant="body1">{data?.invoiceDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Total Amount:</strong>
              </Typography>
              <Typography variant="body1">{data?.totalAmount}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Payment Terms:</strong>
              </Typography>
              <Typography variant="body1">{data?.paymentTerms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Invoice Due Date:</strong>
              </Typography>
              <Typography variant="body1">{data?.invoiceDueDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>GL Post Date:</strong>
              </Typography>
              <Typography variant="body1">{data?.glPostDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Invoice Description:</strong>
              </Typography>
              <Typography variant="body1">
                {data?.invoiceDescription}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Line Amount:</strong>
              </Typography>
              <Typography variant="body1">{data?.lineAmount}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Department:</strong>
              </Typography>
              <Typography variant="body1">{data?.department}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Account:</strong>
              </Typography>
              <Typography variant="body1">{data?.account}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Location:</strong>
              </Typography>
              <Typography variant="body1">{data?.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Description:</strong>
              </Typography>
              <Typography variant="body1">{data?.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Comment:</strong>
              </Typography>
              <Typography variant="body1">{data?.comment}</Typography>
            </Grid>
    

          
            <Grid item sx={12}>
              {file && (
                <Box sx={{ mt: 1, textAlign: "center" }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography>
                      Page {pageNumber} of {numPages}
                    </Typography>
                    <IconButton
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                    >
                      <NavigateBefore />
                    </IconButton>
                    <IconButton
                      disabled={pageNumber >= numPages}
                      onClick={() => setPageNumber(pageNumber + 1)}
                    >
                      <NavigateNext />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      overflow: "hidden",
                      maxWidth: "100%",
                      mx: "auto",
                      width: "fit-content",
                    }}
                  >
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page pageNumber={pageNumber} width={500} />
                    </Document>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>  

          : 
          <Grid sx={{mt:5}}>
            <Typography textAlign="center" >{'No Record Found!'}</Typography>
          </Grid>
           }
      </Box>
  );
}
