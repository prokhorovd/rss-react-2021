import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loadDataFromApi, { Args } from '../../helpers';

const initialState = {
  searchValue: '',
  pageSize: 10,
  sortBy: 'publishedAt',
  pageNum: 1,
  status: 'idle',
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
    setSearchValue: (state, action) => {
      return {
        ...state,
        searchValue: action.payload,
      };
    },
    setPageSize: (state, action) => {
      return {
        ...state,
        pageSize: action.payload,
      };
    },
    setSortBy: (state, action) => {
      return {
        ...state,
        sortBy: action.payload,
      };
    },
    setPageNum: (state, action) => {
      return {
        ...state,
        pageNum: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestFeedFromAPI.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(requestFeedFromAPI.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'idle',
          feed: action.payload,
        };
      })
      .addCase(requestFeedFromAPI.rejected, (state) => {
        return {
          ...state,
          status: 'idle',
        };
      });
  },
});

export const {
  setSearchValue, setPageSize, setSortBy, setPageNum,
} = feedSlice.actions;

export const selectFeedParameters = (state) => state.feedParameters;

export default feedSlice.reducer;
