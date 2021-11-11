import { apiKey } from './data';

export interface Args {
  searchValue: string,
  pageSize: number,
  sortBy: string,
  pageNum?: number,
  id?: string
}

const loadDataFromApi = async (args: Args) => {
  const {
    searchValue,
    pageSize,
    sortBy,
    pageNum,
  } = args;
  try {
    if (searchValue !== '') {
      let address = `https://newsapi.org/v2/everything?q=${searchValue}`
        + `&from=2021-10-15&sortBy=${sortBy}&apiKey=${apiKey}`
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
