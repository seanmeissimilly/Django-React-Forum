import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND;

const suggestionsApi = axios.create({
  baseURL: `${URL}/suggestions`,
});

//todo:  Lógica para listar las sugerencias existentes.
export const suggestionList = createAsyncThunk(
  "suggestionsList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.get(`/`, config);
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

//todo: Lógica para listar uns sola sugerencia.
export const suggestionDetails = createAsyncThunk(
  "suggestionsDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.get(`/${id}/`, config);
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

//todo: Lógica  para actualizar una sugerencia.
export const suggestionUpdate = createAsyncThunk(
  "suggestionsUpdate",
  async ({ id, title, body, resolved, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.put(
        `/${id}/`,
        { title, body, resolved },
        config
      );

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
//todo: Lógica para eliminar una sugerencia.
export const suggestionDelete = createAsyncThunk(
  "suggestionsDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.delete(`/${id}/`, config);
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

//todo: Lógica para añadir una sugerencia.
export const suggestionCreate = createAsyncThunk(
  "suggestionsCreate",
  async ({ title, body, resolved, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.post(
        `/`,
        { title, body, resolved },
        config
      );

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

const suggestionInfoStorage = localStorage.getItem("suggestionInfo")
  ? JSON.parse(localStorage.getItem("suggestionInfo"))
  : {};

const initialState = {
  suggestionInfo: suggestionInfoStorage,
  suggestions: [],
  loading: false,
  error: false,
  success: false,
};

export const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(suggestionDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(suggestionDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestionInfo = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionList.pending, (state) => {
      state.loading = true;
      state.suggestions = [];
    });
    builder.addCase(suggestionList.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestions = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(suggestionUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestionInfo = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionDelete.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(suggestionDelete.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.suggestionInfo = {};
    });
    builder.addCase(suggestionDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionCreate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(suggestionCreate.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestionInfo = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionCreate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default suggestionSlice.reducer;
