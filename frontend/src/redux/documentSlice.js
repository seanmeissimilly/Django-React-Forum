import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND;

const documentApi = axios.create({
  baseURL: `${URL}/documents`,
});

//todo:  Lógica para listar los documents existentes.
export const documentList = createAsyncThunk(
  "documentList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await documentApi.get(`/doc/`, config);
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

//todo:  Lógica para buscar en los documents existentes.
export const documentSearch = createAsyncThunk(
  "documentSearch",
  async ({ q, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await documentApi.get(`/search/q?=${q}`, config);
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

//todo:  Lógica para listar los documents existentes.
export const documenttypesList = createAsyncThunk(
  "documenttypesList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await documentApi.get(`/types/`, config);
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

//todo:  Lógica para listar los documents existentes.
export const documentclassificationList = createAsyncThunk(
  "documentclassificationList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await documentApi.get(`/classification/`, config);
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

//todo: Lógica para listar un solo documents.
export const documentDetails = createAsyncThunk(
  "documentDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await documentApi.get(`/doc/${id}/`, config);
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

//todo: Lógica  para actualizar un document.
export const documentUpdate = createAsyncThunk(
  "documentUpdate",
  async (
    {
      id,
      title,
      author,
      data,
      description,
      documentclassification,
      documenttypes,
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
        formData.append("author", author);
        formData.append("description", description);
        formData.append("documentclassification", documentclassification);
        formData.append("documenttypes", documenttypes);
        formData.append("data", data);
        config.headers["Content-Type"] = "multipart/form-data";
        request = await documentApi.put(`/doc/${id}/`, formData, config);
      } else {
        config.headers["Content-Type"] = "application/json";

        request = await documentApi.put(
          `/doc/${id}/`,
          { title, author, description, documentclassification, documenttypes },
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
//todo: Lógica para eliminar un document.
export const documentDelete = createAsyncThunk(
  "documentDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await documentApi.delete(`/doc/${id}/`, config);
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

//todo: Lógica para añadir un document.
export const documentCreate = createAsyncThunk(
  "documentCreate",
  async (
    {
      title,
      author,
      data,
      description,
      documentclassification,
      documenttypes,
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
        formData.append("author", author);
        formData.append("description", description);
        formData.append("documentclassification", documentclassification);
        formData.append("documenttypes", documenttypes);
        formData.append("data", data);
        config.headers["Content-Type"] = "multipart/form-data";
        request = await documentApi.post(`/doc/`, formData, config);
      } else {
        config.headers["Content-Type"] = "application/json";

        request = await documentApi.post(
          `/doc/`,
          { title, author, description, documentclassification, documenttypes },
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

const documentInfoStorage = localStorage.getItem("documentInfo")
  ? JSON.parse(localStorage.getItem("documentInfo"))
  : {};

const initialState = {
  documentInfo: documentInfoStorage,
  documents: [],
  documenttypes: [],
  documentclassification: [],
  loading: false,
  error: false,
  success: false,
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(documentDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(documentDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.documentInfo = action.payload;
      state.success = true;
    });
    builder.addCase(documentDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documentList.pending, (state) => {
      state.loading = true;
      state.documents = [];
    });
    builder.addCase(documentList.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
      state.success = true;
    });
    builder.addCase(documentList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documentUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(documentUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.documentInfo = action.payload;
      state.success = true;
    });
    builder.addCase(documentUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documentDelete.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(documentDelete.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.documentInfo = {};
    });
    builder.addCase(documentDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documentCreate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(documentCreate.fulfilled, (state, action) => {
      state.loading = false;
      state.documentInfo = action.payload;
      state.success = true;
    });
    builder.addCase(documentCreate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documenttypesList.pending, (state) => {
      state.loading = true;
      state.documenttypes = [];
    });
    builder.addCase(documenttypesList.fulfilled, (state, action) => {
      state.loading = false;
      state.documenttypes = action.payload;
      state.success = true;
    });
    builder.addCase(documenttypesList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documentclassificationList.pending, (state) => {
      state.loading = true;
      state.documentclassification = [];
    });
    builder.addCase(documentclassificationList.fulfilled, (state, action) => {
      state.loading = false;
      state.documentclassification = action.payload;
      state.success = true;
    });
    builder.addCase(documentclassificationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(documentSearch.pending, (state) => {
      state.loading = true;
      state.documents = [];
    });
    builder.addCase(documentSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
      state.success = true;
    });
    builder.addCase(documentSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default documentSlice.reducer;
