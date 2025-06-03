import * as React from "react";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../index.css";
import Tutorial from "../../components/Tutorial";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Logging in with", values);
    },
  });

  return (
    <React.Fragment>
      <CssBaseline />
      {/* parent-container start  */}
      <Container
        style={{
          // border: "1px solid black",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* left-container */}
        <Tutorial />

        {/* right-container  */}
        <div
          style={{
            // border: "1px solid black",
            padding: "20px",
            margin: "50px",
          }}
        >
          {/* Title Component  */}
          <Title />
          {/* signin heading  */}
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
            Sign In to your account
          </Typography>
          {/* ********************************form-section start********************************  */}
          <form onSubmit={formik.handleSubmit} style={{ width: "60vh" }}>
            {/* *************************form-field for email start*******************************  */}
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
              {/* email-TextField  */}
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
            {/* ****************************form-field for email end ***************************************  */}

            {/* *************************form-field for password start************************************* */}
            <div
              style={{
                // border: "1px solid black",
                marginTop: "16px",
              }}
            >
              {/* password-label  */}
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
              {/* password-TextField  */}
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
                placeholder="Enter Password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
            </div>
            {/* *************************form-field for password end************************************* */}

            {/* form-field for forgot-password and login-btn start */}
            <div
              style={{
                // border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              {/* forgot-password link  */}
              <Link
                href="/forgotPassword"
                underline="hover"
                variant="body2"
                style={{ padding: "8px" }}
              >
                Forgot password?
              </Link>
              {/* login-btn  */}
              <Button
                onClick={() => {
                  navigate("/home");
                }}
                type="submit"
                variant="contained"
                style={{
                  float: "inline-end",
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
              >
                Login
              </Button>
            </div>
            {/* form-field for forgot-password and login-btn end */}
          </form>
          {/* **********************************form-section end**********************************  */}
        </div>
      </Container>
      {/* parent-container end  */}
    </React.Fragment>
  );
};

export default Login;
