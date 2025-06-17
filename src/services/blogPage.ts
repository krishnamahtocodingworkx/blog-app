import { authAPIServices } from "./AxiosClient";
import { ENDPOINTS } from "../utils/endPoints";

// params ----    baseurl?pageNo=1&limit=10&search=react&sortBy=createdAt&sortOrder=1&filter=gender&filterValue=male
export const blogPageService = {
  fetchBlogs: async (page = 1, limit = 10) => {
    return await authAPIServices.get(
      `${ENDPOINTS.BLOGS_PAGE}?page=${page}&limit=${limit}`
    );
  },
};
