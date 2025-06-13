import { authAPIServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const blogService = {
  fetchBlogs: async (url?: string) => {
    return await authAPIServices.get(ENDPOINTS.BLOGS);
  },
};
