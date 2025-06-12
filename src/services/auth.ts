import { loginApiServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const authServices = {
  login: async (values: { email: string; password: string }) => {
    return await loginApiServices.post(ENDPOINTS.LOGIN, {
      email: values.email,
      password: values.password,
    });
  },
};
