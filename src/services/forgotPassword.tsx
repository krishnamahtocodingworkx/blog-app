import { loginApiServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const forgotPasswordServices = {
  sendOtp: async (email: string) => {
    return await loginApiServices.post(ENDPOINTS.FORGOT_PASSWORD, { email });
  },
};
