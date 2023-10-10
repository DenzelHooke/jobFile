import { CreateJobDto } from '@/app/types/jobs';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface jobState {
  jobs: [];
  selectedJob: CreateJobDto | null;
}

const initialState: jobState = {
  jobs: [],
  selectedJob: null,
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    resetSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
});

export const { setJobs, setSelectedJob, resetSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
