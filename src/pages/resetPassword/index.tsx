import * as React from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Tutorial from "../../components/Tutorial";
import Title from "../../components/Title";
import { resetPasswordServices } from "../../services/resetPassword";
import { resetPasswordInitialValues } from "../../utils/data";
import { resetPasswordValidationSchema } from "../../utils/validationSchema";
import "../../index.css";

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { id } = useSelector((state: RootState) => state.auth);

  const storedId = id || sessionStorage.getItem("userId");

  const formik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (!storedId) {
          setErrors({ password: "User ID not found. Please try again." });
          return;
        }
        const response = await resetPasswordServices.reset(
          storedId,
          values.password
        );
        console.log("Reset Password Response:", response.data);
        if (response.data && response.data.code === 200) {
          navigate("/home");
        } else {
          setErrors({ password: response.data.message || "Reset failed." });
        }
      } catch (error: any) {
        setErrors({
          password: error?.response?.data?.message || "Reset failed.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <React.Fragment>
      {/* *****************************parent-container start*************************  */}
      <Container
        disableGutters
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* left-container component */}
        <Tutorial />

        {/* ************************right-container start**************************  */}
        <Box
          sx={{
            p: "20px",
            m: "50px",
          }}
        >
          {/* DiveBuddiesHead Component*/}
          <Title />

          {/* **************************resetPassword heading start**************************/}
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: "20px",
            }}
          >
            Reset Password
          </Typography>
          {/* **************************resetPassword heading end**************************/}

          {/* **************************Enter New Password heading start**************************/}
          <Typography variant="body1" gutterBottom align="left">
            Enter the new password to secure your account
          </Typography>
          {/* **************************Enter New Password heading end**************************/}

          {/* ******************************form-section start********************************* */}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: "60vh",
            }}
          >
            {/* ********************form-field section start********************* */}
            {/* new-password field start */}
            <Box sx={{ mt: "16px" }}>
              {/* new-password label  */}
              <Typography variant="subtitle1" gutterBottom>
                New Password
              </Typography>
              {/* TextField for new password input  */}
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "40px",
                  },
                }}
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            {/* new-password field end */}

            {/* confirm-password field start  */}
            <Box sx={{ pt: "30px" }}>
              {/* confirm-password label  */}
              <Typography variant="subtitle1" gutterBottom>
                Confirm Password
              </Typography>
              {/* TextField for confirm-password input  start */}
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "40px",
                  },
                }}
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                variant="outlined"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* TextField for confirm-password input end */}
            </Box>
            {/* confirm-password field end  */}

            {/* save-btn start */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: "8px",
                mt: "20px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: "50px",
                  py: "8px",
                  borderRadius: "10px",
                }}
              >
                Save
              </Button>
            </Box>
            {/* save-btn end */}

            {/* ********************form-field section end********************* */}
          </Box>
          {/* ******************************form-section end********************************* */}
        </Box>
        {/* ************************right-container end**************************  */}
      </Container>
      {/* *****************************parent-container end*************************  */}
    </React.Fragment>
  );
};

export default ResetPassword;
