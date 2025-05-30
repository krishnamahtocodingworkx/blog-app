import * as React from "react";
import divingActivities from "./bg/DivingActivities.png";
import vectorImg from "./bg/Vector.png";
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
        {/* ***************************left-container start**********************  */}
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            position: "relative",
            borderRadius: "10px",
            padding: "20px",
            margin: "50px",
          }}
        >
          {/* *************************diving-activities heading start**********************************  */}
          <div
            style={{
              border: "1px solid black",
              padding: "16px",
              position: "absolute",
              borderRadius: "0 16px 16px 16px",
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{
                border: "1px solid black",
                borderRadius: "16px",
                padding: "16px 30px",
                fontSize: "16px",
              }}
            >
              Diving Activities
            </Typography>
          </div>
          {/* ****************************diving-activities heading end*************************************  */}

          {/* ********************diving-activitiesImage start*************************  */}
          <img
            width="100%"
            src={divingActivities}
            alt="divingActivitiesImg"
            style={{ borderTopRightRadius: "5%" }}
          />
          {/* ********************diving-activitiesImage end*************************  */}

          {/* *********************************back-btn start******************************  */}
          <div
            style={{
              border: "1px solid black",
              position: "absolute",
              display: "flex",
              bottom: "18px",
              padding: "18px",
              borderRadius: "18px 18px 18px 0",
              backgroundColor: "#fff",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                border: "1px solid black",
                backgroundColor: "#fff",
                color: "black",
                borderRadius: "10px",
                padding: "8px",
                fontSize: "32px",
                cursor: "pointer",
              }}
            >
              <ArrowBackIcon />
            </Button>
          </div>
          {/* *********************************back-btn end******************************  */}

          {/* *********************************forward-btn start***********************************  */}
          <div
            style={{
              border: "1px solid black",
              position: "absolute",
              display: "flex",
              bottom: "18px",
              right: "18px",
              padding: "18px",
              borderRadius: "18px 18px 0 18px",
              backgroundColor: "#fff",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "8px 50px",
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </div>
          {/* *********************************forward-btn end***********************************  */}
        </div>
        {/* ***************************left-container end**********************  */}

        {/* ************************right-container start**************************  */}
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "20px",
            margin: "50px",
          }}
        >
          {/* DiveBuddies image and heading  */}
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            style={{
              fontWeight: "bold",
              border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            <img width="50" src={vectorImg} alt="vectorImg" />
            DiveBuddies
          </Typography>
          {/* forgot-password heading  */}
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
          {/* reset password link  */}
          <Typography variant="h6" gutterBottom align="left">
            <Link href="/resetPassword" underline="hover" variant="body2">
              You can reset your password here
            </Link>
          </Typography>
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

            {/* back-to login */}
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
