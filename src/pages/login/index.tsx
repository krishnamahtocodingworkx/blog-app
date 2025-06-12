import * as React from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utils/validationSchema";
import { loginInitialValues } from "../../utils/data";
import "../../index.css";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { authServices } from "../../services/auth";
import { STRING } from "../../utils/string";
import { ROUTES } from "../../routes/routesName";
import LeftContainer from "../../components/LeftContainer";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await authServices.login(values);
        if (response.data && response.data.code === 200) {
          const token = response.data.data.token;
          console.log(token);
          dispatch(
            login({
              email: response.data.data.email,
              token: response.data.data.token,
            })
          );
          navigate("/home");
        } else {
          setErrors({ email: "Login failed. Please check your credentials." });
        }
      } catch (error: any) {
        setErrors({ email: error?.response?.data?.message || "Login failed." });
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
        <LeftContainer />

        {/* right-container  */}
        <Box
          sx={{
            p: "20px",
            m: "50px",
          }}
        >
          {/* Title Component  */}
          <Title />
          {/* signin heading  */}
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
            {STRING.loginHeading}
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

            {/* *************************form-field for password start************************************* */}
            <Box sx={{ mt: "16px" }}>
              {/* password-label  */}
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
              {/* password-TextField  */}
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "40px",
                  },
                }}
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder={STRING.passwordPlaceholder}
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
            </Box>
            {/* *************************form-field for password end************************************* */}

            {/* form-field for forgot-password and login-btn start */}
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
                to={ROUTES.forgotPassword}
                underline="hover"
                variant="body2"
                sx={{ p: "8px" }}
              >
                {STRING.forgotPassword}
              </MuiLink>
              {/* login-btn  */}
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
                Login
              </Button>
            </Box>
            {/* form-field for forgot-password and login-btn end */}
          </Box>
          {/* **********************************form-section end**********************************  */}
        </Box>
      </Container>
      {/* parent-container end  */}
    </React.Fragment>
  );
};

export default Login;
