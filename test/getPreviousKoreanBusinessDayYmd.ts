import { describe, expect, test } from 'vitest';
import { getPreviousKoreanBusinessDayYmd } from '../src/index.js';

test('day_ymd에서 days_before일 이후의 영업일 YMD를 구한다.', () => {
  expect(getPreviousKoreanBusinessDayYmd(20190607, 4)).toEqual(20190531);
});

test('"월"이 이전으로 넘어가는 경우', () => {
  expect(getPreviousKoreanBusinessDayYmd(20191010, 17)).toEqual(20190911);
});

test('"해"가 이전으로 넘어가는 경우', () => {
  expect(getPreviousKoreanBusinessDayYmd(20200106, 9)).toEqual(20191220);
});

describe('errors', () => {
  test('days_before에 0이 입력된 경우', () => {
    try {
      getPreviousKoreanBusinessDayYmd(20190531, 0);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });

  test('days_before에 음수가 입력된 경우', () => {
    try {
      getPreviousKoreanBusinessDayYmd(20190531, -31);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });
});
