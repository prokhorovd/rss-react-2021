import { configureStore } from '@reduxjs/toolkit';
import feedParametersReducer from '../features/feed/feedSlice';

export default configureStore({
  reducer: {
    feedParameters: feedParametersReducer,
  },
});
