import api from "./api";
import { AxiosResponse } from "axios";
import {
  Login,
  LoginResponse,
  RegistrationResponse,
  VerifyResponse,
} from "../types/auth";

const login = (body: Login): Promise<AxiosResponse<LoginResponse>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return api.post(`auth/login`, body, config);
};

const registration = (
  body: Login
): Promise<AxiosResponse<RegistrationResponse>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return api.post(`auth/register`, body, config);
};

const verificate = (token: string): Promise<AxiosResponse<VerifyResponse>> => {
  return api.get(`auth/verificate/${token}`);
};

const auth = {
  login,
  registration,
  verificate,
};

export default auth;
