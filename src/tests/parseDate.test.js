import parseDate from '../utils/parseDate';

describe('Converting dates', () => {
  it("should return '20' for given '13/03/2000'", () => {
    const givenDate = '13/03/2000';
    const expectedDate = 20;

    const result = parseDate(givenDate);

    expect(result).toBe(expectedDate);
  });
});
