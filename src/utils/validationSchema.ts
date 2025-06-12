import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const otpVerificationValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{4}$/, "OTP must be exactly 4 digits"),
});
