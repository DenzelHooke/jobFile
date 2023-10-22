import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  isError: Boolean;
  isSuccess: Boolean;
  message: string;
  isModal: Boolean;
  modalType: string;
  isUser: Boolean;
}

const initialState: GlobalState = {
  isError: false,
  isSuccess: false,
  message: '',
  isModal: false,
  modalType: '',
  isUser: false,
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
    setModal: (state, action) => {
      state.isModal = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    isUser: (state) => {
      state.isUser = true;
    },
    isNotUser: (state) => {
      // console.log('Setting user to false  ');
      state.isUser = false;
    },
    resetAllGlobalState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.isModal = false;
      state.modalType = '';
    },
  },
});

export const {
  setModal,
  setModalType,
  setError,
  setSuccess,
  setReset,
  isUser,
  isNotUser,
  resetAllGlobalState,
} = globalSlice.actions;
export default globalSlice.reducer;
