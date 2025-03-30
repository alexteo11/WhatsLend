import axios from "axios";
import { auth } from "./firebase";
import { getIdToken } from "firebase/auth";

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  async (config) => {
    if (!auth.currentUser) {
      return config;
    }

    const token = await getIdToken(auth.currentUser);

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
