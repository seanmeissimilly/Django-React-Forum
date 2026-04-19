import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND;

const Api = axios.create({
  baseURL: `${URL}`,
});

//Todo: Lógica para traer el captcha.
export const getCaptcha = createAsyncThunk(
  "getCaptcha",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await Api.get(`/captcha/`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

const initialState = {
  captcha_url: {},
  loading: false,
  error: false,
  success: false,
};

export const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCaptcha.pending, (state) => {
      state.loading = true;
      state.captcha_url = {};
    });
    builder.addCase(getCaptcha.fulfilled, (state, action) => {
      state.loading = false;
      state.captcha_url = action.payload.captcha_image_url;
      state.success = true;
    });
    builder.addCase(getCaptcha.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default captchaSlice.reducer;
