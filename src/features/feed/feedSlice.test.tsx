import { AnyAction } from 'redux';
import reducer, {
  requestFeedFromAPI,
  SortNewsOptions,
  setSearchValue,
  setPageNum,
  setPageSize,
  setSortBy,
} from './feedSlice';

describe('createAsyncThunk', () => {
  it('creates the action types', () => {
    const thunkActionCreator = requestFeedFromAPI;
    expect(thunkActionCreator.fulfilled.type).toBe('feed/fetchFeed/fulfilled');
    expect(thunkActionCreator.pending.type).toBe('feed/fetchFeed/pending');
    expect(thunkActionCreator.rejected.type).toBe('feed/fetchFeed/rejected');
  });
});

describe('reducers:', () => {
  const previousState = {
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
  it('should return the initial state', () => {
    expect(reducer(previousState, {} as AnyAction)).toEqual({
      searchValue: '',
      pageSize: 10,
      sortBy: 'publishedAt',
      pageNum: 1,
      isLoading: false,
      feed: {
        totalResults: 0,
        articles: [],
      },
    });
  });
  it('should handle searchValue parameter update', () => {
    expect(reducer(previousState, setSearchValue('search value example'))).toEqual({
      searchValue: 'search value example',
      pageSize: 10,
      sortBy: 'publishedAt',
      pageNum: 1,
      isLoading: false,
      feed: {
        totalResults: 0,
        articles: [],
      },
    });
  });
  it('should handle pageSize parameter update', () => {
    expect(reducer(previousState, setPageSize(20))).toEqual({
      searchValue: '',
      pageSize: 20,
      sortBy: 'publishedAt',
      pageNum: 1,
      isLoading: false,
      feed: {
        totalResults: 0,
        articles: [],
      },
    });
  });
  it('should handle pageNum parameter update', () => {
    expect(reducer(previousState, setPageNum(2))).toEqual({
      searchValue: '',
      pageSize: 10,
      sortBy: 'publishedAt',
      pageNum: 2,
      isLoading: false,
      feed: {
        totalResults: 0,
        articles: [],
      },
    });
  });
  it('should handle sortBy parameter update', () => {
    expect(reducer(previousState, setSortBy(SortNewsOptions.Popularity))).toEqual({
      searchValue: '',
      pageSize: 10,
      sortBy: 'popularity',
      pageNum: 1,
      isLoading: false,
      feed: {
        totalResults: 0,
        articles: [],
      },
    });
  });
});
