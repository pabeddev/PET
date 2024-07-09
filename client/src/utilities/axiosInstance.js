import axios from "axios"

const BASE_URL = process.env.REACT_APP_URL_API_DEV;

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});