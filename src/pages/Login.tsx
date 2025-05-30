import * as React from "react";
import divingActivities from "./bg/DivingActivites.png";
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
  Divider,
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
      <Container
        style={{
          border: "1px solid black",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
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
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img src={vectorImg} alt="vectorImg" />
            DiveBuddies
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              margin: "20px",
              gap: "20px",
            }}
          >
            Sign In to your account
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

            <div className="form-field">
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
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
            </div>

            <div
              className="form-field"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                href="/forgotPassword"
                underline="hover"
                variant="body2"
                style={{ marginTop: "18px" }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                variant="contained"
                style={{
                  float: "inline-end",
                  padding: "8px 50px",
                  marginTop: "10px",
                }}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
