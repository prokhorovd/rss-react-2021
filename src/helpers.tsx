import { apiKey } from './data';

const loadDataFromApi = async (linkParamsObj) => {
  const {
    searchValue,
    pageSize,
    sortBy,
    pageNum,
  } = linkParamsObj;
  try {
    let address = `https://newsapi.org/v2/everything?q=${searchValue}`
      + `&from=2021-10-02&sortBy=${sortBy}&apiKey=${apiKey}`
      + `&pageSize=${pageSize}`;
    if (pageNum !== undefined) {
      address += `&page=${pageNum}`;
    }
    const req = new Request(address);
    const result = await fetch(req);
    return await result.json();
    // return data;
  } catch (e) {
    console.error('error has occurred: ', e);
  }
};

export default loadDataFromApi;
