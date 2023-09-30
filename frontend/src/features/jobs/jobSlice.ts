import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface jobState {
  jobs: [];
}

const initialState: jobState = {
  jobs: [],
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
});
