import _axios from "axios";
import { auth } from "./firebase";
import { BASE_CONFIG } from "@/configs/baseConfig";
import { StatusCodes } from "@/constants/http-status-codes";
import { toast } from "sonner";
import md5 from "md5";

const generateHash = (nonce: number) => {
  return md5(`secret_key=${BASE_CONFIG.HASH_SECRET_KEY}&nonce=${nonce}`);
};

const axios = _axios.create({
  baseURL: BASE_CONFIG.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  async (config) => {
    const nonce = new Date().getTime();
    config.headers.nonce = nonce;
    config.headers.hash = generateHash(nonce);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;

export const authAxios = _axios.create({
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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const nonce = new Date().getTime();
    config.headers.nonce = nonce;
    config.headers.hash = generateHash(nonce);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === StatusCodes.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const role = window.localStorage.getItem("compareLoanUserRole");
      const refreshToken = window.localStorage.getItem(
        "compareLoanRefreshToken",
      );

      try {
        const response = await axios.get<{ data: string }>(
          `${BASE_CONFIG.BASE_API_URL}/auth/${role}/refreshAccesssToken`,
          {
            headers: {
              "x-refresh-token": refreshToken,
            },
          },
        );

        const accessToken = response.data.data;
        window.localStorage.setItem("compareLoanAccessToken", accessToken);

        return authAxios(originalRequest);
      } catch (error) {
        await auth.signOut();
        toast.error("Session expired. Please log in again.");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
