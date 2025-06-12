import { loginApiServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const resetPasswordServices = {
  reset: async (id: string, password: string) => {
    return await loginApiServices.post(ENDPOINTS.RESET_PASSWORD, {
      id,
      password,
    });
  },
};
