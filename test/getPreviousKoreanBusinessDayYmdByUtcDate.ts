import { describe, expect, test } from 'vitest';
import { getPreviousKoreanBusinessDayYmdByUtcDate } from '../src/index.js';

test('day_ymd에서 days_before일 이전의 영업일 YMD를 구한다.', () => {
  expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31, 0, 0), 4)).toEqual(20190527);
  expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 5, 2, 15, 0), 4)).toEqual(20190528);
});

test('"월"이 이전으로 넘어가는 경우', () => {
  expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 9, 10), 17)).toEqual(20190911);
});

test('"해"가 이전으로 넘어가는 경우', () => {
  expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2020, 0, 6), 9)).toEqual(20191220);
});

describe('errors', () => {
  test('days_before에 0이 입력된 경우', () => {
    try {
      getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), 0);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });

  test('days_before에 음수가 입력된 경우', () => {
    try {
      getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), -31);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });
});
