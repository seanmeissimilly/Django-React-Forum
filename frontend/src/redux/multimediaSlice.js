import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND;

const multimediaApi = axios.create({
  baseURL: `${URL}/multimedia`,
});

//todo:  Lógica para listar los multimedias existentes.
export const multimediaList = createAsyncThunk(
  "multimediaList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await multimediaApi.get(`/mmt/`, config);
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
//todo:  Lógica para listar los clasificaciones multimedias existentes.
export const multimediaclassificationList = createAsyncThunk(
  "multimediaclassificationList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await multimediaApi.get(`/classification/`, config);
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

//todo: Lógica para listar un solo multimedias.
export const multimediaDetails = createAsyncThunk(
  "multimediaDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await multimediaApi.get(`/mmt/${id}/`, config);
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

//todo: Lógica  para actualizar un multimedia.
export const multimediaUpdate = createAsyncThunk(
  "multimediaUpdate",
  async (
    {
      id,
      title,
      data,
      description,
      multimediaclassification,
      external_url,
      token,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let request;
      if (data) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("external_url", "");
        formData.append("is_local", true);
        formData.append("multimediaclassification", multimediaclassification);
        formData.append("data", data);
        config.headers["Content-Type"] = "multipart/form-data";
        request = await multimediaApi.put(`/mmt/${id}/`, formData, config);
      } else {
        config.headers["Content-Type"] = "application/json";

        request = await multimediaApi.put(
          `/mmt/${id}/`,
          {
            title,
            description,
            multimediaclassification,
            is_local: false,
            external_url,
            data: null,
          },
          config
        );
      }

      return request;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);
//todo: Lógica para eliminar un multimedia.
export const multimediaDelete = createAsyncThunk(
  "multimediaDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await multimediaApi.delete(`/mmt/${id}/`, config);
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

//todo: Lógica para añadir un multimedia.
export const multimediaCreate = createAsyncThunk(
  "multimediaCreate",
  async (
    { title, data, description, multimediaclassification, external_url, token },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let request;
      if (data) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("multimediaclassification", multimediaclassification);
        formData.append("data", data);
        config.headers["Content-Type"] = "multipart/form-data";
        request = await multimediaApi.post(`/mmt/`, formData, config);
      } else {
        config.headers["Content-Type"] = "application/json";

        request = await multimediaApi.post(
          `/mmt/`,
          {
            title,
            description,
            multimediaclassification,
            is_local: false,
            external_url,
          },
          config
        );
      }

      return request;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

const multimediaInfoStorage = localStorage.getItem("multimediaInfo")
  ? JSON.parse(localStorage.getItem("multimediaInfo"))
  : {};

const initialState = {
  multimediaInfo: multimediaInfoStorage,
  multimedias: [],
  multimediaclassification: [],
  loading: false,
  error: false,
  success: false,
};

export const multimediaSlice = createSlice({
  name: "multimedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(multimediaDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(multimediaDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.multimediaInfo = action.payload;
      state.success = true;
    });
    builder.addCase(multimediaDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(multimediaList.pending, (state) => {
      state.loading = true;
      state.multimedias = [];
    });
    builder.addCase(multimediaList.fulfilled, (state, action) => {
      state.loading = false;
      state.multimedias = action.payload;
      state.success = true;
    });
    builder.addCase(multimediaList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(multimediaUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(multimediaUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.multimediaInfo = action.payload;
      state.success = true;
    });
    builder.addCase(multimediaUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(multimediaDelete.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(multimediaDelete.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.multimediaInfo = {};
    });
    builder.addCase(multimediaDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(multimediaCreate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(multimediaCreate.fulfilled, (state, action) => {
      state.loading = false;
      state.multimediaInfo = action.payload;
      state.success = true;
    });
    builder.addCase(multimediaCreate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(multimediaclassificationList.pending, (state) => {
      state.loading = true;
      state.multimediaclassification = [];
    });
    builder.addCase(multimediaclassificationList.fulfilled, (state, action) => {
      state.loading = false;
      state.multimediaclassification = action.payload;
      state.success = true;
    });
    builder.addCase(multimediaclassificationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default multimediaSlice.reducer;
