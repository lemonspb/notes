import axios, { AxiosRequestConfig } from "axios";
import storage from "../utils";
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers)
      config.headers.Authorization = `Bearer ${storage.get("token")}`;
    config.baseURL = import.meta.env.VITE_BASE_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      storage.remove("token");
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
