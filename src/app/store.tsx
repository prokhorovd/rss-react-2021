import { configureStore } from '@reduxjs/toolkit';
import feedParametersReducer from '../features/feedParameters/feedParametersSlice';

export default configureStore({
  reducer: {
    feedParameters: feedParametersReducer,
  },
});
