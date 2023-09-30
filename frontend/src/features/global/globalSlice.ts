import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  isError: Boolean;
  isSuccess: Boolean;
  message: string;
}

const initialState: GlobalState = {
  isError: false,
  isSuccess: false,
  message: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = true;
      state.message = action.payload;
    },
    setReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
});

export const { setError, setSuccess, setReset } = globalSlice.actions;
export default globalSlice.reducer;
