
const { sumOfElements } = require('../app');

describe('sumOfElements', () => {
    it('returns the sum of elements in an array', () => {
      const result = sumOfElements([4, 5, 6, 7, 8]);
      expect(result).toBe(30);
    });
  
    it('returns 0 for an empty array', () => {
      const result = sumOfElements([]);
      expect(result).toBe(0);
    });
  
    it('works with negative numbers', () => {
      const result = sumOfElements([-2, -3, 5]);
      expect(result).toBe(0);
    });
});