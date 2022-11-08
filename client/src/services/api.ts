import axios, { AxiosRequestConfig } from "axios";
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers)
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzNzQwY2FhYzcxZmUxMTMxNjlkMWEiLCJpYXQiOjE2Njc5MTE5NzEsImV4cCI6MTY2NzkxNTU3MX0.Lle-qbaJ0koplZr2rXVmA_svLsttlO_QnN-NgNKO4aQ";
    config.baseURL = import.meta.env.VITE_BASE_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default apiInstance;
