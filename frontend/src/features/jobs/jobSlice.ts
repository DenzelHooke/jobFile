import { CreateJobDto } from '@/app/types/jobs';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface jobState {
  jobs: [];
  canRefetch: true | false;
  search_value: string | false;
  selectedJob: string | null;
  currentFilter: string;
}

const initialState: jobState = {
  jobs: [],
  canRefetch: false,
  search_value: false,
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
    setSearchValue: (state, action) => {
      if (action.payload.length < 1) {
        state.search_value = false;
        return;
      }

      state.search_value = action.payload;
    },
    sortCompanyFilter: (state) => {
      state.jobs.sort((a: CreateJobDto, b: CreateJobDto) => {
        const aName = a.company.toLowerCase();
        const bName = b.company.toLowerCase();

        if (aName > bName) {
          return 1;
        }
        if (aName < bName) {
          return -1;
        }

        return 0;
      });
    },
    sortPosFilter: (state) => {
      state.jobs.sort((a: CreateJobDto, b: CreateJobDto) => {
        const aName = a.title.toLowerCase();
        const bName = b.title.toLowerCase();

        if (aName > bName) {
          return 1;
        }
        if (aName < bName) {
          return -1;
        }

        return 0;
      });
    },
    setRefetch: (state, action) => {
      state.canRefetch = action.payload;
    },
  },
});

export const {
  setJobs,
  setSelectedJob,
  resetSelectedJob,
  setCurrentFilter,
  setSearchValue,
  sortCompanyFilter,
  sortPosFilter,
  setRefetch,
} = jobSlice.actions;
export default jobSlice.reducer;
