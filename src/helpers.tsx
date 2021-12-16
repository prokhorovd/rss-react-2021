import { apiKey } from './data';

export interface Args {
  searchValue: string | null,
  pageSize?: number,
  sortBy: string | null,
  pageNum?: number,
  id?: string | null,
}

const defineStartNewsDate = () => {
  // change daysCount to change search period
  const daysCount = 15;
  const today = new Date();
  const startDateInMs = today.setDate(today.getDate() - daysCount);
  const startDate = new Date(startDateInMs);
  return `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
};

const loadDataFromApi = async (args: Args) => {
  const {
    searchValue,
    pageSize = 100,
    sortBy,
    pageNum,
  } = args;
  try {
    if (searchValue !== '') {
      let address = `https://newsapi.org/v2/everything?q=${searchValue}`
        + `&from=${defineStartNewsDate()}&sortBy=${sortBy}&apiKey=${apiKey}`
        + `&pageSize=${pageSize}`;
      if (pageNum) {
        address += `&page=${pageNum}`;
      }
      const req = new Request(address);
      const result = await fetch(req);
      return await result.json();
    }
  } catch (e) {
    console.error('error has occurred: ', e);
  }
  return {
    totalResults: 0,
    articles: [],
  };
};

export default loadDataFromApi;
