import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './questionSlice/questionSlice';

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
  devTools: false,
});