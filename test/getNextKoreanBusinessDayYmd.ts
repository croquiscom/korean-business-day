import { describe, expect, test } from 'vitest';
import { getNextKoreanBusinessDayYmd } from '../src/index.js';

test('day_ymd에서 days_after일 이후의 영업일 YMD를 구한다.', () => {
  expect(getNextKoreanBusinessDayYmd(20190531, 4)).toEqual(20190607);
});

test('"월"이 넘어가는 경우', () => {
  expect(getNextKoreanBusinessDayYmd(20190911, 17)).toEqual(20191010);
});

test('"해"가 넘어가는 경우', () => {
  expect(getNextKoreanBusinessDayYmd(20191220, 9)).toEqual(20200106);
});

describe('year', () => {
  test('2019', () => {
    expect(getNextKoreanBusinessDayYmd(20190531, 4)).toEqual(20190607);
    expect(getNextKoreanBusinessDayYmd(20190911, 17)).toEqual(20191010);
  });

  test('2020', () => {
    expect(getNextKoreanBusinessDayYmd(20200430, 4)).toEqual(20200508);
    expect(getNextKoreanBusinessDayYmd(20200911, 17)).toEqual(20201012);
  });

  test('2021', () => {
    expect(getNextKoreanBusinessDayYmd(20210430, 4)).toEqual(20210507);
    expect(getNextKoreanBusinessDayYmd(20210910, 17)).toEqual(20211012);
  });

  test('2022', () => {
    expect(getNextKoreanBusinessDayYmd(20220531, 4)).toEqual(20220608);
    expect(getNextKoreanBusinessDayYmd(20220915, 17)).toEqual(20221012);
  });

  test('2023', () => {
    expect(getNextKoreanBusinessDayYmd(20230531, 4)).toEqual(20230607);
    expect(getNextKoreanBusinessDayYmd(20230915, 17)).toEqual(20231017);
  });

  test('2024', () => {
    expect(getNextKoreanBusinessDayYmd(20240430, 4)).toEqual(20240508);
    expect(getNextKoreanBusinessDayYmd(20240911, 17)).toEqual(20241014);
  });

  test('2025', () => {
    expect(getNextKoreanBusinessDayYmd(20250430, 4)).toEqual(20250509);
    expect(getNextKoreanBusinessDayYmd(20250911, 17)).toEqual(20251013);
  });

  test('fallback year', () => {
    expect(getNextKoreanBusinessDayYmd(20500531, 4)).toEqual(20500607);
    expect(getNextKoreanBusinessDayYmd(20500915, 17)).toEqual(20501011);
  });
});

describe('errors', () => {
  test('days_after에 0이 입력된 경우', () => {
    try {
      getNextKoreanBusinessDayYmd(20190531, 0);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });

  test('days_after에 음수가 입력된 경우', () => {
    try {
      getNextKoreanBusinessDayYmd(20190531, -31);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`second parameter value should be positive value`);
    }
  });

  test('day_ymd에 유효하지 않은 "값"을 입력한 경우', () => {
    try {
      getNextKoreanBusinessDayYmd(2021, 1);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`invalid day_ymd: 2021`);
    }
  });

  test('day_ymd에 유효하지 않은 "년"을 입력한 경우', () => {
    try {
      getNextKoreanBusinessDayYmd(19990101, 1);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`invalid day_ymd: 19990101`);
    }
  });

  test('day_ymd에 유효하지 않은 "월"을 입력한 경우', () => {
    try {
      getNextKoreanBusinessDayYmd(20210001, 1);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`invalid day_ymd: 20210001`);
    }
  });

  test('day_ymd에 유효하지 않은 "일"을 입력한 경우', () => {
    try {
      getNextKoreanBusinessDayYmd(20190532, 1);
      throw new Error('must throw an error');
    } catch (e: any) {
      expect(e.message).toEqual(`invalid day_ymd: 20190532`);
    }
  });
});
