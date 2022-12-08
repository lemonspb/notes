import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Auth from "../services/auth";
import { Login } from "../types/auth";
import storage from "../utils";

export const login = createAsyncThunk(
  "auth/login",
  async (payload: Login, thunkAPI) => {
    try {
      const response = await Auth.login(payload);
      if (response.data) {
        window.history.pushState({}, "", "/main");
        return response.data;
      }
    } catch (e) {
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
