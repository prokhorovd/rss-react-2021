import loadDataFromApi, { defineStartNewsDateForTesting } from './helpers';
import {
  apiAnswerCaseOkMock,
  argsMockEmptyRequest,
  argsMockError,
  argsMockFirst100Results,
  argsMockFirst100ResultsArgs,
} from './__tests_mocks/test-mocks';

global.fetch = jest.fn((args) => {
  if (args === argsMockFirst100ResultsArgs) {
    return Promise.resolve({
      json: () => Promise.resolve(apiAnswerCaseOkMock),
    });
  }
  return Promise.reject(new Error('error text'));
}) as jest.Mock;

describe('helper functions:', () => {
  describe('defineStartNewsDate function:', () => {
    const { defineStartNewsDate } = defineStartNewsDateForTesting;
    const generatedDate = defineStartNewsDate();
    it('should generate string, that have format YYYY-MM-DD', () => {
      expect(typeof defineStartNewsDate()).toBe('string');
      const dateTest = /\d{4}-\d{1,2}-\d{1,2}/i.test(generatedDate);
      expect(dateTest).toBeTruthy();
    });
    it('should generate date today or earlier', () => {
      const dateToTest = new Date(generatedDate);
      const today = Date.now();
      expect(today - dateToTest.getMilliseconds()).toBeGreaterThan(0);
    });
  });
  describe('loadDataFromApi function:', () => {
    it('should return {"articles": [], "totalResults": 0} if search request is empty', async () => {
      const data = await loadDataFromApi(argsMockEmptyRequest);
      expect(data).toEqual({ articles: [], totalResults: 0 });
    });
    it('should return result if provided with searchValue and sortBy arguments', async () => {
      const data = await loadDataFromApi(argsMockFirst100Results);
      expect(data).toEqual(apiAnswerCaseOkMock);
    });
    it('should return error if something wrong with arguments or API', async () => {
      const data = await loadDataFromApi(argsMockError);
      expect(data).toBeInstanceOf(Error);
    });
  });
});
