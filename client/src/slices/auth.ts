import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Auth from "../services/auth";
import { Login } from "../types/auth";
import storage from "../utils";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (payload: Login, thunkAPI) => {
    try {
      const response = await Auth.login(payload);
      if (response.data) {
        toast.success("вы успешно зашли");
        return response.data;
      } else {
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 403) {
        toast.error("Пользователь не веретефицирован");
      } else {
        toast.error("Не верные данные");
      }
    } finally {
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (payload: Login, thunkAPI) => {
    try {
      const response = await Auth.registration(payload);
      if (response.data) {
        toast.success(
          "Пользователь создан перейдите по ссылке в  указанной почте для завершения регистрации "
        );
        return response.data;
      }
    } catch (e) {
      toast.error("Такой пользователь уже существует.");
    } finally {
    }
  }
);

export const verificate = createAsyncThunk(
  "auth/verificate",
  async (payload: string, thunkAPI) => {
    try {
      const response = await Auth.verificate(payload);
      if (response.data) {
        toast.success("Пользователь веретефецирован.");

        return response.data;
      }
    } catch (e) {
    } finally {
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storage.get("token"),
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const token = action.payload?.token;
      if (token) {
        state.token = token;
        storage.set("token", token);
      }
    });
  },
});

export default authSlice;
