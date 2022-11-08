import axios, { AxiosRequestConfig } from "axios";
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers)
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzNzQwY2FhYzcxZmUxMTMxNjlkMWEiLCJpYXQiOjE2Njc5Mzk1ODUsImV4cCI6MTY2Nzk0MzE4NX0.KSL0mh_xnvJjWC4saf3vVcfVjEVFztGlfoGM-N260D8";
    config.baseURL = import.meta.env.VITE_BASE_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default apiInstance;
