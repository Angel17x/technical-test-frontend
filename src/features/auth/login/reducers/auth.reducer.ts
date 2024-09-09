import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@app/core/api/axios";
import { IAuth, ILogin } from "../interfaces";

const initialState: IAuth = {
  loading: false,
  modalShow: false,
  authenticated: false,
  token: undefined,
  error: undefined,
}

export const authThunk = createAsyncThunk('auth/login', async (user: ILogin, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<{ token: string }>('/auth/login', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.token;
  } catch (error: any) {
    console.log(error);
    const { message } = error;
    if (!message) {
      return rejectWithValue('error login');
    }
    return rejectWithValue(error.message);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.modalShow = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.pending, (state) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(authThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.authenticated = true;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(authThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.authenticated = false;
        state.modalShow = true;
        state.token = undefined;
        state.error = action.payload;
      });
  }
});

export const { hideModal } = authSlice.actions;

export default authSlice.reducer;