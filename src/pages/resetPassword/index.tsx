import * as React from "react";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/slices/authSlice";
import Tutorial from "../../components/Tutorial";
import Title from "../../components/Title";
import { loginApiServices } from "../../services/AxiosClient";

const ResetPassword: React.FC = () => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { id } = useSelector((state: RootState) => state.auth);
  const storedId = id || sessionStorage.getItem("userId");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (!storedId) {
          setErrors({ password: "User ID not found. Please try again." });
          return;
        }
        const response = await loginApiServices.post(
          "/api/v1/user/reset-password",
          {
            id: storedId,
            password: values.password,
          }
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
        {/* left-container component */}
        <Tutorial />

        {/* ************************right-container start**************************  */}
        <div
          style={{
            // border: "1px solid black",
            padding: "20px",
            margin: "50px",
          }}
        >
          {/* DiveBuddiesHead Component*/}
          <Title />

          {/* **************************resetPassword heading start**************************/}
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            style={{
              // border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            Reset Password
          </Typography>
          {/* **************************resetPassword heading end**************************/}

          {/* **************************Enter New Password heading start**************************/}
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            style={
              {
                // border: "1px solid black"
              }
            }
          >
            Enter the new password to secure your account
          </Typography>
          {/* **************************Enter New Password heading end**************************/}

          {/* ******************************form-section start********************************* */}
          <form
            onSubmit={formik.handleSubmit}
            style={{
              width: "60vh",
            }}
          >
            {/* ********************form-field section start********************* */}
            {/* new-password field start */}
            <div
              style={{
                // border: "1px solid black",
                marginTop: "16px",
              }}
            >
              {/* new-password label  */}
              <Typography variant="subtitle1" gutterBottom>
                New Password
              </Typography>
              {/* TextField for new password input  */}
              <TextField
                sx={{
                  // Root class for the input field
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
            </div>
            {/* new-password field end */}

            {/* confirm-password field start  */}
            <div style={{ paddingTop: "30px" }}>
              {/* confirm-password label  */}
              <Typography variant="subtitle1" gutterBottom>
                Confirm Password
              </Typography>
              {/* TextField for confirm-password input  start */}
              <TextField
                sx={{
                  // Root class for the input field
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
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
                  },
                }}
              />
              {/* TextField for confirm-password input end */}
            </div>
            {/* confirm-password field end  */}

            {/* save-btn start */}
            <div
              style={{
                // border: "1px solid black",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "8px",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Save
              </Button>
            </div>
            {/* save-btn end */}

            {/* ********************form-field section end********************* */}
          </form>
          {/* ******************************form-section end********************************* */}
        </div>
        {/* ************************right-container end**************************  */}
      </Container>
      {/* *****************************parent-container end*************************  */}
    </React.Fragment>
  );
};

export default ResetPassword;
