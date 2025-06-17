import { authAPIServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const blogService = {
  fetchBlogs: async ({ page = 1, limit = 6 }) => {
    return await authAPIServices.get(
      `${ENDPOINTS.BLOGS}?page=${page}&limit=${limit}`
    );
  },
};
