import axios, { AxiosRequestConfig } from "axios";
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers)
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzNzQwY2FhYzcxZmUxMTMxNjlkMWEiLCJpYXQiOjE2Njc5ODQ3NjUsImV4cCI6MTY2ODAyMDc2NX0.TTglWAcxFmKZue-gM2qcZe3wjp-RdYOWra-N2JDDMBg";
    config.baseURL = import.meta.env.VITE_BASE_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default apiInstance;
