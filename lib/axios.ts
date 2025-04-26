import axios from "axios";
import { auth } from "./firebase";
import { BASE_CONFIG } from "@/configs/baseConfig";

export default axios.create({
  baseURL: BASE_CONFIG.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: BASE_CONFIG.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use(
  async (config) => {
    if (!auth.currentUser) {
      return config;
    }

    const token = window.localStorage.getItem("compareLoanAccessToken");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
