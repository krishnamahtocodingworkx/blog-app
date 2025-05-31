import * as React from "react";
import divingActivities from "./bg/DivingActivities.png";
import vectorImg from "./bg/Vector.png";
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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

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
      {/* parent-container  */}
      <Container
        style={{
          border: "1px solid black",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* left-container  */}
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
          {/* diving-activities heading  */}
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
          {/* left-image  */}
          <img
            width="100%"
            src={divingActivities}
            alt="divingActivitiesImg"
            style={{ borderTopRightRadius: "5%" }}
          />
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

          {/* back-btn  */}
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
          {/* forward-btn  */}
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
        </div>

        {/* right-container  */}
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
          {/* signin heading  */}
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
            Sign In to your account
          </Typography>
          {/* ********************************form-section start********************************  */}
          <form onSubmit={formik.handleSubmit} style={{ width: "60vh" }}>
            {/* *************************form-field for email start*******************************  */}
            <div
              style={{
                border: "1px solid black",
              }}
            >
              {/* email-label  */}
              <Typography variant="subtitle1" gutterBottom>
                Email Address
              </Typography>
              {/* email-TextField  */}
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
            {/* ****************************form-field for email end ***************************************  */}

            {/* *************************form-field for password start************************************* */}
            <div
              style={{
                border: "1px solid black",
                marginTop: "16px",
              }}
            >
              {/* password-label  */}
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
              {/* password-TextField  */}
              <TextField
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
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                marginTop: "20px",
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
    </React.Fragment>
  );
};

export default Login;
