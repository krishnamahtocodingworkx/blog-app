import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const loginApiServices = axios.create({
  baseURL: baseURL,
  timeout: 15000,
});

export const authAPIServices = axios.create({
  baseURL: "https://blog-book-nine.vercel.app/",
  timeout: 15000,
});
