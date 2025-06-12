import { loginApiServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const logoutService = {
  logout: async (token: string) => {
    return await loginApiServices.post(
      ENDPOINTS.LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
