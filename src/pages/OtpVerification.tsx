import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import divingActivities from "./bg/DivingActivities.png";
import vectorImg from "./bg/Vector.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
          {/* Dive-in heading start */}
          <Typography
            variant="h4"
            gutterBottom
            style={{
              position: "absolute",
              bottom: "30%",
              display: "flex",
              color: "#fff",
              margin: "16px",
              border: "1px solid white",
            }}
          >
            Ocean Adventures Await-Dive In!
          </Typography>
          {/* Dive-in heading end */}

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
          {/* ********************DiveBuddies image and heading start*******************  */}
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
            {/* importing from bg folder */}
            <img width="50" src={vectorImg} alt="DivingBuddiesLogoImg" />
            DiveBuddies
          </Typography>
          {/* ********************DiveBuddies image and heading end*******************  */}

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
            <MuiOtpInput
              style={{
                border: "1px solid black",
                padding: "5px",
                marginTop: "20px",
              }}
              value={formik.values.otp}
              onChange={(value) => formik.setFieldValue("otp", value)}
              onBlur={() => formik.setFieldTouched("otp", true)}
              length={4}
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
            </div>
          </form>
          {/* ********************************form-section end********************************  */}
        </div>
        {/* ************************right-container end**************************  */}
      </Container>
    </React.Fragment>
  );
};

export default OtpVerification;
