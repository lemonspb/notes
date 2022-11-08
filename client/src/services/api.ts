import axios, { AxiosRequestConfig } from "axios";
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers)
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzNzQwY2FhYzcxZmUxMTMxNjlkMWEiLCJpYXQiOjE2Njc5MTYxMjQsImV4cCI6MTY2NzkxOTcyNH0.Yi7fh53X91FS_HEIwi2yS3mu0CiSrmd4pM4j-wKD3Xo";
    config.baseURL = import.meta.env.VITE_BASE_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default apiInstance;
