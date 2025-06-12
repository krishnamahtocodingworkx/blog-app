import * as React from "react";
import "../../index.css";
import { useDispatch } from "react-redux";
import { setEmail, setId } from "../../redux/slices/authSlice";
import {
  Container,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Box,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useFormik } from "formik";
import Tutorial from "../../components/Tutorial";
import Title from "../../components/Title";
import { forgotPasswordValidationSchema } from "../../utils/validationSchema";
import { forgotPasswordInitialValues } from "../../utils/data";
import { STRING } from "../../utils/string";
import { ROUTES } from "../../routes/routesName";
import { forgotPasswordServices } from "../../services/forgotPasswordServices";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: forgotPasswordInitialValues,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await forgotPasswordServices.sendOtp(values.email);
        const id = response.data?.data?.id || response.data?.data?._id;
        if (id) {
          dispatch(setEmail(values.email));
          dispatch(setId(id));
          sessionStorage.setItem("userId", id);
          navigate(ROUTES.otpVerification);
        } else {
          setErrors({ email: response.data?.message || "Failed to send OTP." });
        }
      } catch (error: any) {
        setErrors({
          email: error?.response?.data?.message || "Failed to send OTP.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <React.Fragment>
      {/* parent-container start  */}
      <Container
        disableGutters
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* left-container */}
        <Tutorial />

        {/* right-container  */}
        <Box
          sx={{
            p: "20px",
            m: "50px",
          }}
        >
          {/* Title Component  */}
          <Title />
          {/* forgot password heading  */}
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: "20px",
            }}
          >
            {STRING.forgotPassword}
          </Typography>
          {/* info text */}
          <Typography
            variant="body2"
            gutterBottom
            align="left"
            sx={{
              mb: 2,
            }}
          >
            {STRING.resetPasswordInfo || "You can reset your password here"}
          </Typography>
          {/* ********************************form-section start********************************  */}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "60vh" }}
          >
            {/* *************************form-field for email start*******************************  */}
            <Box sx={{ mb: 2 }}>
              {/* email-label  */}
              <Typography variant="subtitle1" gutterBottom>
                Email Address
              </Typography>
              {/* email-TextField  */}
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "40px",
                  },
                }}
                fullWidth
                placeholder={STRING.emailPlaceholder}
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            {/* ****************************form-field for email end ***************************************  */}

            {/* form-field for back-to-login and send-otp-btn start */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "50px",
              }}
            >
              <MuiLink
                component={RouterLink}
                to={ROUTES.login}
                underline="hover"
                variant="body2"
                sx={{
                  p: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <KeyboardArrowLeftIcon sx={{ mr: 0.5 }} />
                Back to Log in
              </MuiLink>
              {/* send-otp-btn  */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: "50px",
                  py: "8px",
                  borderRadius: "10px",
                  float: "inline-end",
                }}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Send OTP
              </Button>
            </Box>
            {/* form-field for back-to-login and send-otp-btn end */}
          </Box>
          {/* **********************************form-section end**********************************  */}
        </Box>
      </Container>
      {/* parent-container end  */}
    </React.Fragment>
  );
};

export default ForgotPassword;
