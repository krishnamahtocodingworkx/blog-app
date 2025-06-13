import { authAPIServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const addBlogService = {
  fetchBlogs: async () => {
    return await authAPIServices.post(ENDPOINTS.ADD_BLOG);
  },
};
