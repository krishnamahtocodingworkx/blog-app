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

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

export const addBlogValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  coverImage: Yup.mixed().required("Cover image is required"),
  description: Yup.string()
    .min(50, "Description must be 50 characters")
    .required("Description is required"),
});
