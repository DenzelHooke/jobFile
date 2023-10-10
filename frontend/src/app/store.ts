import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '@/features/global/globalSlice';
import jobSlice from '@/features/jobs/jobSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    jobs: jobSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
