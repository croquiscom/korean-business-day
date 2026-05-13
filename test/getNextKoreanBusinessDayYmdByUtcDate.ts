import { describe, expect, test } from 'vitest';
import { getNextKoreanBusinessDayYmdByUtcDate } from '../src/index.js';

test('day_ymd에서 days_after일 이후의 영업일 YMD를 구한다.', () => {
  expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31, 0, 0), 4)).toEqual(20190607);
  expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 5, 2, 15, 0), 4)).toEqual(20190610);
});

test('"월"이 넘어가는 경우', () => {
  expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 8, 11), 17)).toEqual(20191010);
});

test('"해"가 넘어가는 경우', () => {
  expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 11, 20), 9)).toEqual(20200106);
});

describe('errors', () => {
  test('days_after에 0이 입력된 경우', () => {
    try {
      getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), 0);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });

  test('days_after에 음수가 입력된 경우', () => {
    try {
      getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), -31);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });
});
