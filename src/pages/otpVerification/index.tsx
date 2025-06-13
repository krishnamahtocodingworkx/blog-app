import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Container, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import "../../index.css";
import LeftContainer from "../../components/LeftContainer";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { otpVerificationServices } from "../../services/otpVerification";
import { resendOTPService } from "../../services/resendOTP";
import { otpVerificationInitialValues } from "../../utils/data";
import { otpVerificationValidationSchema } from "../../utils/validationSchema";

const OtpVerification: React.FC = () => {
  const { email, id } = useSelector((state: RootState) => state.auth);
  const storedId = id || sessionStorage.getItem("userId");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleResendOtp = async () => {
    try {
      const response = await resendOTPService.resend(email || "");
      console.log("Resend OTP Response:", response.data);
    } catch (error) {
      console.error("Resend OTP Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: otpVerificationInitialValues,
    validationSchema: otpVerificationValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (!storedId) {
          setErrors({ otp: "User ID not found. Please try again." });
          return;
        }
        const response = await otpVerificationServices.verifyOtp({
          id: storedId,
          otp: values.otp,
        });
        console.log("OTP Verification Response:", response.data);
        if (response.data?.code === 200) {
          navigate("/reset-password");
        } else {
          setErrors({
            otp: response.data?.message || "OTP verification failed.",
          });
        }
      } catch (error: any) {
        setErrors({
          otp: error?.response?.data?.message || "OTP verification failed.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <React.Fragment>
      <Container
        disableGutters
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <LeftContainer />

        <Box
          sx={{
            p: "20px",
            m: "50px",
          }}
        >
          <Title />

          <Typography variant="h6" gutterBottom align="left">
            OTP Verification
          </Typography>

          <Typography variant="body1" gutterBottom align="left">
            We have sent a code to
          </Typography>

          <Typography variant="body1" gutterBottom align="left">
            {email}
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "60vh" }}
          >
            <MuiOtpInput
              sx={{ mt: 3 }}
              value={formik.values.otp}
              onChange={(value) => formik.setFieldValue("otp", value)}
              onBlur={() => formik.setFieldTouched("otp", true)}
              length={4}
              TextFieldsProps={{
                inputProps: {
                  style: {
                    backgroundColor: "rgba(230, 230, 230, 1)",
                    borderRadius: "10px",
                    width: "32px",
                  },
                  error: formik.touched.otp && Boolean(formik.errors.otp),
                  helperText: formik.touched.otp ? formik.errors.otp : "",
                },
              }}
            />

            {formik.touched.otp && formik.errors.otp && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {formik.errors.otp}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "50px",
              }}
            >
              <Button variant="text" onClick={handleResendOtp}>
                Resend OTP
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  float: "inline-end",
                  px: "50px",
                  py: "8px",
                  borderRadius: "10px",
                }}
              >
                Verify
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default OtpVerification;
