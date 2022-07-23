import {numberWithCommas} from '../Functions';

describe('numberWithCommas tests', () => {
  it('should return passed number with commas after every three digits', () => {
    expect(numberWithCommas(1000)).toBe('1,000');
  });
});
