import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import {
  CssBaseline,
  Container,
  Button,
  Typography,
  Divider,
  Link,
  Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";

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
      <Container maxWidth="sm">
        <div className="form-container">
          <Avatar sx={{ mb: "10%" }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom align="left">
            OTP Verification
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            We have sent a code to
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            <strong>{email}</strong>.
          </Typography>
          <Divider />

          <form onSubmit={formik.handleSubmit} className="form-field-container">
            <MuiOtpInput
              value={formik.values.otp}
              onChange={(value) => formik.setFieldValue("otp", value)}
              onBlur={() => formik.setFieldTouched("otp", true)}
              length={6}
              TextFieldsProps={{
                error: formik.touched.otp && Boolean(formik.errors.otp),
                helperText: formik.touched.otp ? formik.errors.otp : "",
              }}
            />

            {formik.touched.otp && formik.errors.otp && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {formik.errors.otp}
              </Typography>
            )}

            <div
              className="form-field"
              style={{ textAlign: "left", marginTop: "1rem" }}
            >
              <Link href="/OtpVerification" underline="hover" variant="body2">
                Resend OTP
              </Link>
              <Button
                type="submit"
                variant="contained"
                style={{ float: "inline-end" }}
              >
                Verify
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default OtpVerification;
