import axios, { AxiosRequestConfig } from "axios";
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers)
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzNzQwY2FhYzcxZmUxMTMxNjlkMWEiLCJpYXQiOjE2Njc5MzU5MzAsImV4cCI6MTY2NzkzOTUzMH0.0aNTmDq5Q2WokMA53A7Gl7Tc6pz-WgRWHaJEla0kLXE";
    config.baseURL = import.meta.env.VITE_BASE_URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default apiInstance;
