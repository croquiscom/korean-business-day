import type { IYearHolidays } from './types.js';

const HOLIDAYS_FALLBACK: IYearHolidays = {
  1: {
    1: '신정',
  },
  2: {},
  3: {
    1: '삼일절',
  },
  4: {},
  5: {
    1: '근로자의 날',
    5: '어린이날',
  },
  6: {
    6: '현충일',
  },
  7: {
    17: '제헌절',
  },
  8: {
    15: '광복절',
  },
  9: {},
  10: {
    3: '개천절',
    9: '한글날',
  },
  11: {},
  12: {
    25: '성탄절',
  },
};

export { HOLIDAYS_FALLBACK };
