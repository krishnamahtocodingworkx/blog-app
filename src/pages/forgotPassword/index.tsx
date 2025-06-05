import * as React from "react";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/slices/authSlice";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useFormik } from "formik";
import * as Yup from "yup";
import Tutorial from "../../components/Tutorial";
import Title from "../../components/Title";

type Props = {};

const ForgotPassword: React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      // sessionStorage.setItem("email", values.email);
      dispatch(setEmail(values.email));
      navigate("/otp-verification");
    },
  });
  return (
    <React.Fragment>
      <CssBaseline />
      {/* *****************************parent-container start*************************  */}
      <Container
        style={{
          // border: "1px solid black",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* left-container  */}
        <Tutorial />

        {/* ************************right-container start**************************  */}
        <div
          style={{
            // border: "1px solid black",
            padding: "20px",
            margin: "50px",
          }}
        >
          {/* DiveBuddiesTitle Component */}
          <Title />

          {/* ******************forgot-password heading start*******************  */}
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            style={{
              // border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            Forgot Password?
          </Typography>
          {/* ******************forgot-password heading end******************  */}

          {/* ****************************reset password link start*******************************  */}
          <Typography variant="body2" gutterBottom align="left">
            You can reset your password here
          </Typography>
          {/* ****************************reset password link end*******************************  */}

          {/* ********************************form-section start********************************  */}
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "60vh", marginTop: "30px" }}
          >
            {/* ***************************form-field for email start************************* */}
            <div
              style={
                {
                  // border: "1px solid black",
                }
              }
            >
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
                // border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <MuiLink
                component={RouterLink}
                to="/"
                underline="hover"
                variant="body2"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <KeyboardArrowLeftIcon />
                Back to Log in
              </MuiLink>
              {/* sendOTP-btn  */}
              <Button
                type="submit"
                variant="contained"
                style={{
                  float: "inline-end",
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
                disabled={!(formik.isValid && formik.dirty)}
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
