import * as React from "react";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import "../index.css";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useFormik } from "formik";
import * as Yup from "yup";
import LeftContainer from "../components/LeftContainer";
import DiveBuddiesHead from "../components/DiveBuddiesHead";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Submitting email:", values.email);
      navigate("/otpVerification");
    },
  });

  return (
    <React.Fragment>
      <CssBaseline />
      {/* *****************************parent-container start*************************  */}
      <Container
        style={{
          border: "1px solid black",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* left-container  */}
        <LeftContainer />

        {/* ************************right-container start**************************  */}
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            margin: "50px",
          }}
        >
          {/* DiveBuddiesHead Component */}
          <DiveBuddiesHead />

          {/* ******************forgot-password heading start*******************  */}
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            style={{
              border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            Forgot Password?
          </Typography>
          {/* ******************forgot-password heading end******************  */}

          {/* ****************************reset password link start*******************************  */}
          <Typography variant="h6" gutterBottom align="left">
            <Link href="/resetPassword" underline="hover" variant="body2">
              You can reset your password here
            </Link>
          </Typography>
          {/* ****************************reset password link end*******************************  */}

          {/* ********************************form-section start********************************  */}
          <form onSubmit={formik.handleSubmit} style={{ width: "60vh" }}>
            {/* ***************************form-field for email start************************* */}
            <div style={{ border: "1px solid black" }}>
              {/* email-label  */}
              <Typography variant="subtitle1" gutterBottom>
                Email Address
              </Typography>
              {/* TextField for email input  */}
              <TextField
                sx={{
                  // Root class for the input field
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "40px",
                  },
                }}
                fullWidth
                placeholder="Enter Email Address"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            {/* ***************************form-field for email end************************* */}

            {/* back-to login link */}
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                marginTop: "20px",
              }}
            >
              <Link
                href="/"
                underline="hover"
                variant="body2"
                style={{
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <KeyboardArrowLeftIcon />
                Back to Log in
              </Link>
              {/* sendOTP-btn  */}
              <Button
                type="submit"
                variant="contained"
                style={{
                  float: "inline-end",
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
              >
                Send OTP
              </Button>
            </div>
          </form>
          {/* ********************************form-section end********************************  */}
        </div>
        {/* ************************right-container end**************************  */}
      </Container>
      {/* *****************************parent-container end*************************  */}
    </React.Fragment>
  );
};

export default ForgotPassword;
