import axios from "axios"

const BASE_URL =
  process.env.REACT_APP_URL_API_PRODUCTION ||
  process.env.REACT_APP_URL_API_DEV ||
  process.env.REACT_APP_API_VERCEL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});