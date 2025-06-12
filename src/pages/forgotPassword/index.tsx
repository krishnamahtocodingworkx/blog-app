import * as React from "react";
import "../../index.css";
import { useDispatch } from "react-redux";
import { setEmail, setId } from "../../redux/slices/authSlice";
import { loginApiServices } from "../../services/AxiosClient";
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
import { ENDPOINTS } from "../../utils/endPoints";
import { forgotPasswordValidationSchema } from "../../utils/validationSchema";
import { forgotPasswordInitialValues } from "../../utils/data";
import { STRING } from "../../utils/string";
import { ROUTES } from "../../routes/routesName";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: forgotPasswordInitialValues,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await loginApiServices.post(
          ENDPOINTS.FORGOT_PASSWORD,
          { email: values.email }
        );
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: 0,
        m: 0,
        bgcolor: "#f5f5f5",
      }}
    >
      {/* left-container */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: { md: 400, lg: 440, xl: 480 },
          minWidth: 320,
          maxWidth: 480,
          height: "100vh",
          bgcolor: "#fff",
          boxShadow: 2,
          flexShrink: 0,
        }}
      >
        <Tutorial />
      </Box>

      {/* right-container */}
      <Box
        sx={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, md: 8 },
          py: { xs: 4, md: 8 },
          bgcolor: "#fff",
        }}
      >
        <Title />
        <Typography
          variant="h6"
          gutterBottom
          align="left"
          sx={{
            width: "100%",
            maxWidth: 400,
            fontWeight: 600,
            mb: 2.5,
          }}
        >
          {STRING.forgotPassword}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          align="left"
          sx={{ width: "100%", maxWidth: 400 }}
        >
          {STRING.resetPasswordInfo || "You can reset your password here"}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: { xs: 0, sm: 2 },
            p: { xs: 2, sm: 4 },
            mt: 3,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Email Address
            </Typography>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 6,
            }}
          >
            <MuiLink
              component={RouterLink}
              to={ROUTES.login}
              underline="hover"
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <KeyboardArrowLeftIcon />
              Back to Log in
            </MuiLink>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: "10px",
                fontWeight: 600,
              }}
              disabled={!(formik.isValid && formik.dirty)}
            >
              Send OTP
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
