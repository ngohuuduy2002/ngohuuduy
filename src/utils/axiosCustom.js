import axios from "axios";
import { STATUS } from "../appConst";
const baseURL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL,
});
instance.interceptors.request.use(
  function (config) {
    const jwt = localStorage.getItem("access_token");
    if (config.url !== "/oauth/token") {
      const token = `Bearer ${jwt}`;
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.status === STATUS.UNAUTHORIZED_ERROR ||
        error.response.status === STATUS.FORBIDDEN_ERROR)
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default instance;
