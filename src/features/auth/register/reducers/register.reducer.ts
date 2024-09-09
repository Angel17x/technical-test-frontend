import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@app/core/api/axios";
import { IRegister } from "../interfaces";
import { IUser } from "@app/shared/interfaces";


export const initialState: IRegister = {
  loading: false,
  modalShow: false,
  user: undefined,
  error: undefined,
}

export const registerThunk = createAsyncThunk(
  'auth/register', async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IUser>('/register', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      const { message } = error;
      if (!message) {
        return rejectWithValue('error login');
      }
      return rejectWithValue(error.message);
    }
});

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.modalShow = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
     .addCase(registerThunk.fulfilled, (state, action:PayloadAction<IUser>) => {
        state.loading = false;
        state.modalShow = true;
        state.user = action.payload;
        state.error = undefined;
      })
     .addCase(registerThunk.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.modalShow = true;
        state.error = action.payload;
      });
  }
});

export const { hideModal } = registerSlice.actions;

export default registerSlice.reducer;