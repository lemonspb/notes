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

const auth = {
  login,
};

export default auth;
