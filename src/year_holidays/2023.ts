import { IYearHolidays } from './types.js';

export const HOLIDAYS_2023: IYearHolidays = {
  1: {
    1: true, // 새해
    21: true, // 설날 연휴
    22: true, // 설날
    23: true, // 설날 연휴
    24: true, // 대체공휴일
  },
  2: {},
  3: {
    1: true, // 삼일절
  },
  4: {},
  5: {
    1: true, // 근로자의 날
    5: true, // 어린이날
    27: true, // 부처님 오신날
    29: true, // 부처님 오신날 대체공휴일
  },
  6: {
    6: true, // 현충일
  },
  7: {},
  8: {
    15: true, // 광복절
  },
  9: {
    28: true, // 추석 연휴
    29: true, // 추석
    30: true, // 추석 연휴
  },
  10: {
    2: true, // 추석 임시공휴일
    3: true, // 개천절
    9: true, // 한글날
  },
  11: {},
  12: {
    25: true, // 성탄절
  },
};
