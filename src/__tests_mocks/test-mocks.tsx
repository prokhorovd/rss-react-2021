export const testData = {
  id: 'some id',
  author: 'Roland Hutchinson',
  content: 'Mercedes Benz is the first company in the world to receive approval for level 3 automated driving, beating the likes of Tesla and others.',
  description: 'Mercedes Benz is the first company in the world to receive approval for level 3 automated driving, beating the likes of Tesla and others.',
  publishedAt: '2021-12-10T10:45:11Z',
  source: {
    id: 'testID',
    name: 'Geeky Gadgets',
  },
  title: 'Mercedes gets level 3 automated driving approval',
  url: 'https://www.geeky-gadgets.com/mercedes-gets-level-3-automated-driving-approval-10-12-2021/',
  urlToImage: 'https://www.geeky-gadgets.com/wp-content/uploads/2021/12/Mercedes-level-3-automated-driving',
};
export const testSearchParameters = {
  pageNum: 1,
  pageSize: 10,
  searchValue: 'tesla',
  sortBy: 'publishedAt',
};

export const argsMockEmptyRequest = {
  searchValue: '',
  sortBy: 'publishedAt',
};

export const argsMockFirst100Results = {
  searchValue: 'apple',
  pageNum: 1,
  sortBy: 'publishedAt',
};

export const argsMockFirst100ResultsArgs = 'https://newsapi.org/v2/everything?q=apple&from=2021-12-4&sortBy=publishedAt&apiKey=f1eca3f7183846eea73575a543a71641&pageSize=100&page=1';

export const argsMockError = {
  searchValue: 'error',
  sortBy: 'publishedAt',
};

export const apiAnswerCaseOkMock = {
  status: 'ok',
  totalResults: 100,
  articles: [{}, {}, {}],
};

export const mockState = {
  searchValue: '',
  pageSize: 10,
  sortBy: 'publishedAt',
  pageNum: 1,
  isLoading: false,
  feed: {
    totalResults: 0,
    articles: [testData],
  },
};
