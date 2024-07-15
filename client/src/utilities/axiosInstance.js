import axios from "axios"

const BASE_URL = process.env.REACT_APP_URL_API_DEV;

console.log('URL BASE: ', BASE_URL)

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});