import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ComponentState } from 'react';
import loadDataFromApi, { Args } from '../../helpers';

export enum SortNewsOptions {
  PublishedAt = 'publishedAt',
  Relevancy = 'relevancy',
  Popularity = 'popularity',
}

const initialState = {
  searchValue: '',
  pageSize: 10,
  sortBy: SortNewsOptions.PublishedAt,
  pageNum: 1,
  isLoading: false,
  feed: {
    totalResults: 0,
    articles: [],
  },
};

export const requestFeedFromAPI = createAsyncThunk(
  'feed/fetchFeed',
  async (arg: Args) => {
    const response = await loadDataFromApi(arg);
    return response;
  },
);

export const feedSlice = createSlice({
  name: 'feedParameters',
  initialState,
  reducers: {
    setSearchValue: (state, action) => ({
      ...state,
      searchValue: action.payload,
    }),
    setPageSize: (state, action) => ({
      ...state,
      pageSize: action.payload,
    }),
    setSortBy: (state, action) => ({
      ...state,
      sortBy: action.payload,
    }),
    setPageNum: (state, action) => ({
      ...state,
      pageNum: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestFeedFromAPI.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(requestFeedFromAPI.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        feed: action.payload,
      }))
      .addCase(requestFeedFromAPI.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export const {
  setSearchValue, setPageSize, setSortBy, setPageNum,
} = feedSlice.actions;

export const selectFeedParameters = (state: ComponentState) => state.feedParameters;

export default feedSlice.reducer;
