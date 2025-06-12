import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const blogBaseURL = process.env.REACT_APP_BLOG_API_BASE_URL;

export const loginApiServices = axios.create({
  baseURL: baseURL,
  timeout: 15000,
});

export const authAPIServices = axios.create({
  baseURL: blogBaseURL,
  timeout: 15000,
});
