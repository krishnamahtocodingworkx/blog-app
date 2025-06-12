import { loginApiServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const otpVerificationServices = {
  verifyOtp: async (data: { id: string; otp: string }) => {
    return await loginApiServices.post(ENDPOINTS.OTP_VERIFICATION, data);
  },
};
