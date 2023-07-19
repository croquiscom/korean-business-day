import { IYearHolidays } from './types.js';

export const HOLIDAYS_2022: IYearHolidays = {
  1: {
    1: true, // 새해
    31: true, // 설날 연휴
  },
  2: {
    1: true, // 설날
    2: true, // 설날 연휴
  },
  3: {
    1: true, // 삼일절
    9: true, // 20대 대통령 선거
  },
  4: {},
  5: {
    1: true, // 근로자의 날
    5: true, // 어린이날
    8: true, // 부처님 오신날
  },
  6: {
    1: true, // 제8회 전국동시지방선거
    6: true, // 현충일
  },
  7: {},
  8: {
    15: true, // 광복절
  },
  9: {
    9: true, // 추석 연휴
    10: true, // 추석 연휴
    11: true, // 추석 연휴
    12: true, // 추석 대체공휴일
  },
  10: {
    3: true, // 개천절
    9: true, // 한글날
    10: true, // 한글날 대체공휴일
  },
  11: {},
  12: {
    25: true, // 성탄절
  },
};
