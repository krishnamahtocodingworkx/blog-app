export const loginInitialValues = {
  email: "",
  password: "",
};

export const forgotPasswordInitialValues = {
  email: "",
};

export const otpVerificationInitialValues = {
  otp: "",
};

export const resetPasswordInitialValues = {
  password: "",
  confirmPassword: "",
};

export const addBlogInitialValues = {
  title: "",
  coverImage: null as File | null,
  description: "",
  author: "",
  sections: [
    {
      heading: "",
      content: "",
      image: null as File | null,
      imagePreview: "",
    },
  ],
};
