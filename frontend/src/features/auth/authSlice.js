import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.registerUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.loginUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data;
        state.token = action.payload.data.token;

        localStorage.setItem("token", action.payload.data.token);
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
