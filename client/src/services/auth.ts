import api from "./api";
import { AxiosResponse } from "axios";
import { Login, LoginResponse } from "../types/auth";

const login = (body: Login): Promise<AxiosResponse<LoginResponse>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return api.post(`auth/login`, body, config);
};

const registration = (body: Login): Promise<AxiosResponse<LoginResponse>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return api.post(`auth/register`, body, config);
};

const auth = {
  login,
  registration,
};

export default auth;
