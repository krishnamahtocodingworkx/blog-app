import * as React from "react";
import divingActivities from "./bg/DivingActivites.png";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import "../index.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { useFormik } from "formik";
import * as Yup from "yup";

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
      <Container maxWidth="sm">
        <div className="form-container">
          <div className="form-field-container">
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              style={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "flex-start",
                position: "absolute",
                fontSize: "16px",
              }}
            >
              Diving Activities
            </Typography>
            <img
              height="500"
              src={divingActivities}
              style={{
                border: "5px solid red",
                borderRadius: "50% 10% 30% 30%",
                width: "100%",
              }}
              alt="divingActivitiesImg"
            />

            <div
              className="form-field"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 0,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  borderRadius: "22px",
                  padding: "8px 20px",
                }}
              >
                <ArrowBackIcon />
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{
                  borderRadius: "22px",
                  padding: "8px 50px",
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="form-container">
          <Typography variant="h5" gutterBottom align="left">
            Forgot Password?
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            <Link href="/resetPassword" underline="hover" variant="body2">
              You can reset your password here
            </Link>
          </Typography>
          <Divider />

          <form onSubmit={formik.handleSubmit} className="form-field-container">
            <div className="form-field">
              <Typography variant="subtitle1" gutterBottom>
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter email address"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>

            <div className="form-field" style={{ textAlign: "left" }}>
              <Link href="/" underline="hover" variant="body2">
                <KeyboardArrowLeftIcon />
                Back to Log in
              </Link>
              <Button
                type="submit"
                variant="contained"
                style={{ float: "inline-end" }}
              >
                Send OTP
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ForgotPassword;
