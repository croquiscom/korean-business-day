import { describe, expect, test } from 'vitest';
import { getKoreanHolidaysInRange } from '../src/index.js';

test('단일 연도 범위', () => {
  expect(getKoreanHolidaysInRange(20260101, 20260131)).toEqual([{ date: '2026-01-01', name: '신정', ymd: 20260101 }]);
});

test('월 경계 범위', () => {
  expect(getKoreanHolidaysInRange(20260215, 20260305)).toEqual([
    { date: '2026-02-16', name: '설날 연휴', ymd: 20260216 },
    { date: '2026-02-17', name: '설날', ymd: 20260217 },
    { date: '2026-02-18', name: '설날 연휴', ymd: 20260218 },
    { date: '2026-03-01', name: '삼일절', ymd: 20260301 },
    { date: '2026-03-02', name: '삼일절 대체공휴일', ymd: 20260302 },
  ]);
});

test('연도 경계 범위', () => {
  expect(getKoreanHolidaysInRange(20251225, 20260105)).toEqual([
    { date: '2025-12-25', name: '성탄절', ymd: 20251225 },
    { date: '2026-01-01', name: '신정', ymd: 20260101 },
  ]);
});

test('주말과 겹친 공휴일도 포함', () => {
  // 2026-05-24(일) 부처님오신날, 5-25(월) 대체공휴일 모두 포함
  expect(getKoreanHolidaysInRange(20260523, 20260525)).toEqual([
    { date: '2026-05-24', name: '부처님오신날', ymd: 20260524 },
    { date: '2026-05-25', name: '부처님오신날 대체공휴일', ymd: 20260525 },
  ]);
});

test('공휴일이 없는 범위', () => {
  expect(getKoreanHolidaysInRange(20260105, 20260131)).toEqual([]);
});

test('동일한 from/to', () => {
  expect(getKoreanHolidaysInRange(20260101, 20260101)).toEqual([{ date: '2026-01-01', name: '신정', ymd: 20260101 }]);
});

test('데이터가 없는 연도는 HOLIDAYS_FALLBACK 사용', () => {
  // 2027년은 KOREAN_HOLIDAYS에 없으므로 fallback의 신정(1/1, 금요일) 반환
  expect(getKoreanHolidaysInRange(20270101, 20270101)).toEqual([{ date: '2027-01-01', name: '신정', ymd: 20270101 }]);
});

describe('errors', () => {
  test('from_ymd가 to_ymd보다 큰 경우', () => {
    expect(() => getKoreanHolidaysInRange(20260201, 20260101)).toThrowError(
      'from_ymd should not be greater than to_ymd',
    );
  });

  test('invalid from_ymd', () => {
    expect(() => getKoreanHolidaysInRange(2026, 20260101)).toThrowError('invalid day_ymd: 2026');
  });

  test('invalid to_ymd', () => {
    expect(() => getKoreanHolidaysInRange(20260101, 20261301)).toThrowError('invalid day_ymd: 20261301');
  });
});
