import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  CssBaseline,
  Container,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";
import LeftContainer from "../components/LeftContainer";
import DiveBuddiesHead from "../components/DiveBuddiesHead";

interface OtpVerificationProps {
  email: string;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
    }),
    onSubmit: (values) => {
      console.log("Submitted OTP:", values.otp);
    },
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        style={{
          border: "1px solid black",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* left-container component  */}
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

          <Typography variant="h6" gutterBottom align="left">
            OTP Verification
          </Typography>

          <Typography variant="body1" gutterBottom align="left">
            We have sent a code to
          </Typography>

          <Typography variant="body1" gutterBottom align="left">
            {email}
          </Typography>
          {/* ********************************form-section start********************************  */}
          <form onSubmit={formik.handleSubmit} style={{ width: "60vh" }}>
            {/* **************************otp input section start********************** */}
            <MuiOtpInput
              style={{
                border: "1px solid black",
                marginTop: "30px",
              }}
              value={formik.values.otp}
              onChange={(value) => formik.setFieldValue("otp", value)}
              onBlur={() => formik.setFieldTouched("otp", true)}
              length={4}
              TextFieldsProps={{
                inputProps: {
                  style: {
                    backgroundColor: "rgba(230, 230, 230, 1)",
                    borderRadius: "10px",
                    width: "32px",
                  },
                },
                error: formik.touched.otp && Boolean(formik.errors.otp),
                helperText: formik.touched.otp ? formik.errors.otp : "",
              }}
            />
            {/* **************************otp input section end********************** */}

            {/* error section */}
            {formik.touched.otp && formik.errors.otp && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {formik.errors.otp}
              </Typography>
            )}
            {/* *******************************Resend OTP and Verify btn start******************************* */}
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                marginTop: "50px",
              }}
            >
              {/* Resend OTP link start */}
              <Link
                href="/OtpVerification"
                underline="hover"
                variant="body2"
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Resend OTP
              </Link>
              {/* Resend OTP link end  */}

              {/* Verify-btn start  */}
              <Button
                type="submit"
                variant="contained"
                style={{
                  float: "inline-end",
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
              >
                Verify
              </Button>
              {/* Verify-btn end  */}
            </div>
            {/* *******************************Resend OTP and Verify btn end******************************* */}
          </form>
          {/* ********************************form-section end********************************  */}
        </div>
        {/* ************************right-container end**************************  */}
      </Container>
    </React.Fragment>
  );
};

export default OtpVerification;
