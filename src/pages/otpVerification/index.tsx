import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { CssBaseline, Container, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../index.css";
import Tutorial from "../../components/Tutorial";
import Title from "../../components/Title";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loginApiServices } from "../../services/AxiosClient";
import { ROUTES } from "../../routes/routesName";

const OtpVerification: React.FC = () => {
  const { email, id } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  // if (!id || id.length) {
  //   console.log("id :", id);
  //   navigate("/");
  //   // <Navigate to={ROUTES.login} />;
  // }
  const storedId = id || sessionStorage.getItem("userId");

  React.useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleResendOtp = async () => {
    try {
      const response = await loginApiServices.post("/api/v1/user/resend-otp", {
        email,
      });
      console.log("Resend OTP Response:", response.data);
    } catch (error) {
      console.error("Resend OTP Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{4}$/, "OTP must be exactly 4 digits"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (!storedId) {
          setErrors({ otp: "User ID not found. Please try again." });
          return;
        }
        const response = await loginApiServices.post(
          "/api/v1/user/verify-email",
          {
            id: storedId,
            otp: values.otp,
          }
        );
        console.log("Verify Email Response:", response.data);

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
      <CssBaseline />
      <Container
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tutorial />

        <div style={{ padding: "20px", margin: "50px" }}>
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

          <form onSubmit={formik.handleSubmit} style={{ width: "60vh" }}>
            <MuiOtpInput
              style={{ marginTop: "30px" }}
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <Button variant="text" onClick={handleResendOtp}>
                Resend OTP
              </Button>

              <Button
                type="submit"
                variant="contained"
                style={{
                  float: "inline-end",
                  padding: "8px 50px",
                  borderRadius: "10px",
                }}
              >
                Verify
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default OtpVerification;
