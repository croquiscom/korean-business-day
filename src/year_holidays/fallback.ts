import { IYearHolidays } from './types';

const HOLIDAYS_FALLBACK: IYearHolidays = {
  1: {
    1: true, // 새해
  },
  2: {},
  3: {
    1: true, // 삼일절
  },
  4: {},
  5: {
    1: true, // 근로자의 날
    5: true, // 어린이날
  },
  6: {
    6: true, // 현충일
  },
  7: {},
  8: {
    15: true, // 광복절
  },
  9: {},
  10: {
    3: true, // 개천절
    9: true, // 한글날
  },
  11: {},
  12: {
    25: true, // 성탄절
  },
};

export { HOLIDAYS_FALLBACK };
