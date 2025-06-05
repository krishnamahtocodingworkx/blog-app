import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "https://blog-book-nine.vercel.app/",
  timeout: 15000,
});

export default AxiosClient;
