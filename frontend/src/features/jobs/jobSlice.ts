import { CreateJobDto } from '@/app/types/jobs';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface jobState {
  jobs: [];
  selectedJob: string | null;
  currentFilter: string;
}

const initialState: jobState = {
  jobs: [],
  selectedJob: null,
  currentFilter: '',
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
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

export const { setJobs, setSelectedJob, resetSelectedJob, setCurrentFilter } =
  jobSlice.actions;
export default jobSlice.reducer;
