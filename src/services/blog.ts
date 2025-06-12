import { authAPIServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const blogService = {
  fetchBlogs: async () => {
    return await authAPIServices.get(ENDPOINTS.BLOGS);
  },
};
