import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      console.log("Resetting password with", values.password);
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
        }}>
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
        <div style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "20px",
          margin: "50px",
        }}>
          {/* *****************DiveBuddies image and heading start************************* */}
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
          {/* *****************DiveBuddies image and heading end************************* */}

          {/* **************************resetPassword heading start**************************/}
          <Typography variant="h5" gutterBottom align="left"
            style={{
              border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}>
            Reset Password
          </Typography>
          {/* **************************resetPassword heading end**************************/}

          {/* **************************Enter New Password heading start**************************/}
          <Typography variant="body1" gutterBottom align="left"
            style={{ border: "1px solid black" }}>
            Enter the new password to secure your account
          </Typography>
          {/* **************************Enter New Password heading end**************************/}

          {/* ******************************form-section start********************************* */}
          <form onSubmit={formik.handleSubmit} style={{
            width: "60vh"
          }}>
            {/* ********************form-field section start********************* */}
            {/* new-password field start */}
            <div style={{ border: "1px solid black", marginTop: "16px", }}>
              {/* new-password label  */}
              <Typography variant="subtitle1" gutterBottom>
                New Password
              </Typography>
              {/* TextField for new password input  */}
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            {/* new-password field end */}

            {/* confirm-password field start  */}
            <div className="form-field">
              {/* confirm-password label  */}
              <Typography variant="subtitle1" gutterBottom>
                Confirm Password
              </Typography>
              {/* TextField for confirm-password input  start */}
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                variant="outlined"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                border: "1px solid black",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "8px",
                marginTop: "20px",
              }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
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
