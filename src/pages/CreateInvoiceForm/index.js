import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { enums } from "../../constants";
import PDFUploadComponent from "../FileUploader";
import { ToastContainer, toast, Flip } from "react-toastify";
import DisplayData from "../DisplayData";


const InvoiceForm = ({ displayData, setDisplayData }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState();

  useEffect(() => {
    const initialValues = JSON.parse(localStorage.getItem("formData"));
    console.log("initialValues - ", initialValues);
    if (initialValues) {
      setFormData(initialValues);
    } else {
      setFormData({
        vendor: "",
        poNumber: "",
        invoiceNumber: "",
        invoiceDate: "",
        totalAmount: "",
        paymentTerms: "",
        invoiceDueDate: "",
        glPostDate: "",
        invoiceDescription: "",
        lineAmount: "",
        department: "",
        account: "",
        location: "",
        description: "",
        comment: "",
      });
    }
  }, [displayData]);

  const validationSchema = Yup.object({
    vendor: Yup.string().required("Vendor is required"),
    poNumber: Yup.string().required("Purchase Order Number is required"),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    invoiceDate: Yup.date().required("Invoice Date is required"),
    totalAmount: Yup.number().required("Total Amount is required"),
    paymentTerms: Yup.string().required("Payment Terms are required"),
    invoiceDueDate: Yup.date().required("Invoice Due Date is required"),
    glPostDate: Yup.date().required("GL Post Date is required"),
    invoiceDescription: Yup.string().required(
      "Invoice Description is required"
    ),
    lineAmount: Yup.number().required("Line Amount is required"),
    department: Yup.string().required("Department is required"),
    account: Yup.string().required("Account is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
  });

  if (!formData) return <>Loading...</>;

  const isPDFUploaded = (pdfFile) => {
    return pdfFile !== null;
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Create New Invoice
        </Typography>

        <Grid container>
          <Grid item xs={6}>
            <PDFUploadComponent
              setFile={setFile}
              fileName={fileName}
              setFileName={setFileName}
            />
            {displayData && <DisplayData data={formData} />}
          </Grid>

          <Grid item xs={6}>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (isPDFUploaded(file)) {
                  localStorage.setItem("formData", JSON.stringify(values));
                  localStorage.setItem("invoicePDF", file);
                  localStorage.setItem("fileName", fileName);
                  toast.success(`Data Added Successfully`, {
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
                  setDisplayData(false);
                } else {
                  toast.error(`Upload a PDF to Submit Data!`, {
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
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Vendor Information
                  </Typography>
                  <FormControl
                    fullWidth
                    error={touched.vendor && Boolean(errors.vendor)}
                  >
                    <InputLabel>Vendor</InputLabel>
                    <Field as={Select} name="vendor" label="Vendor">
                      {enums.vendorOptions.map((vendor) => (
                        <MenuItem value={vendor}>{vendor}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    General Information
                  </Typography>
                  <FormControl
                    fullWidth
                    error={touched.poNumber && Boolean(errors.poNumber)}
                  >
                    <InputLabel>Purchase Order Number</InputLabel>
                    <Field
                      as={Select}
                      name="poNumber"
                      label="Purchase Order Number"
                    >
                      {enums.purchaseOrderOptions.map((order) => (
                        <MenuItem value={order}>{order}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Invoice Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Invoice Number"
                        name="invoiceNumber"
                        variant="outlined"
                        error={
                          touched.invoiceNumber && Boolean(errors.invoiceNumber)
                        }
                        helperText={
                          touched.invoiceNumber && errors.invoiceNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Invoice Date"
                        name="invoiceDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={
                          touched.invoiceDate && Boolean(errors.invoiceDate)
                        }
                        helperText={touched.invoiceDate && errors.invoiceDate}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        type="number"
                        fullWidth
                        label="Total Amount"
                        name="totalAmount"
                        variant="outlined"
                        error={
                          touched.totalAmount && Boolean(errors.totalAmount)
                        }
                        helperText={touched.totalAmount && errors.totalAmount}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        error={
                          touched.paymentTerms && Boolean(errors.paymentTerms)
                        }
                      >
                        <InputLabel>Payment Terms</InputLabel>
                        <Field
                          as={Select}
                          name="paymentTerms"
                          label="Payment Terms"
                        >
                          {enums.paymentTermOptions.map((po) => (
                            <MenuItem value={po}>{po}</MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Invoice Due Date"
                        name="invoiceDueDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={
                          touched.invoiceDueDate &&
                          Boolean(errors.invoiceDueDate)
                        }
                        helperText={
                          touched.invoiceDueDate && errors.invoiceDueDate
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="GL Post Date"
                        name="glPostDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={touched.glPostDate && Boolean(errors.glPostDate)}
                        helperText={touched.glPostDate && errors.glPostDate}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Invoice Description"
                        name="invoiceDescription"
                        variant="outlined"
                        error={
                          touched.invoiceDescription &&
                          Boolean(errors.invoiceDescription)
                        }
                        helperText={
                          touched.invoiceDescription &&
                          errors.invoiceDescription
                        }
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Expense Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Line Amount"
                        name="lineAmount"
                        variant="outlined"
                        error={touched.lineAmount && Boolean(errors.lineAmount)}
                        helperText={touched.lineAmount && errors.lineAmount}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        error={touched.department && Boolean(errors.department)}
                      >
                        <InputLabel>Department</InputLabel>
                        <Field as={Select} name="department" label="Department">
                          {enums.departmentOptions.map((po) => (
                            <MenuItem value={po}>{po}</MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        error={touched.account && Boolean(errors.account)}
                      >
                        <InputLabel>Accounts</InputLabel>
                        <Field as={Select} name="account" label="Account">
                          {enums.accountOptions.map((account) => (
                            <MenuItem value={account}>{account}</MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        error={touched.location && Boolean(errors.location)}
                      >
                        <InputLabel>Location</InputLabel>
                        <Field as={Select} name="location" label="Location">
                          {enums.locationOptions.map((po) => (
                            <MenuItem value={po}>{po}</MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label=" Description"
                        name="description"
                        variant="outlined"
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Comments
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Add a Comment"
                    name="comment"
                    multiline
                    rows={3}
                    variant="outlined"
                    error={touched.comment && Boolean(errors.comment)}
                    helperText={touched.comment && errors.comment}
                    sx={{ mt: 3 }}
                  />

                  <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item>
                      <Button variant="outlined" type="reset">
                        Save as Draft
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" type="submit">
                        Submit & New
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default InvoiceForm;
