import { authAPIServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

export const blogPageService = {
  fetchBlogs: async (page = 1) => {
    return await authAPIServices.get(`${ENDPOINTS.BLOGS_PAGE}?page=${page}`);
  },
};
