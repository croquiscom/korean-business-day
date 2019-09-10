import { HOLIDAYS_2019, HOLIDAYS_2020, IYearHolidays } from './year_holidays';

// 토, 일요일 정보는 포함하지 않음
const KOREAN_HOLIDAYS: { [year: number]: IYearHolidays } = {
  2019: HOLIDAYS_2019,
  2020: HOLIDAYS_2020,
};

function getYmdByDate(date: Date): { year: number, month: number, day: number } {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function getDateFromDayYmd(day_ymd: number) {
  const day_m = (`0${Math.floor(day_ymd / 100 % 100)}`).slice(-2);
  const day_d = (`0${Math.floor(day_ymd % 100)}`).slice(-2);
  return new Date(`${Math.floor(day_ymd / 10000)}-${day_m}-${day_d}T09:00:00+09:00`);
}

function getBusinessDay(date: Date, days_to_go: number, set_date_value: 1 | -1) {
  if (days_to_go < 1) {
    throw new Error(`second parameter value should be positive value`);
  }
  while (days_to_go) {
    date.setDate(date.getDate() + set_date_value);
    const day = date.getDay();
    if (day === 0 || day === 6) {
      continue;
    }
    const ymd = getYmdByDate(date);
    if (!KOREAN_HOLIDAYS[ymd.year]) {
      throw new Error(`year ${ymd.year} data not exists`);
    }
    if (!KOREAN_HOLIDAYS[ymd.year][ymd.month]) {
      throw new Error(`month ${ymd.month} data not exists`);
    }
    if (KOREAN_HOLIDAYS[ymd.year][ymd.month][ymd.day]) {
      continue;
    }
    days_to_go--;
  }
  const result = getYmdByDate(date);
  return result.year * 10000 + result.month * 100 + result.day;
}

export function getNextKoreanBusinessDayYmd(day_ymd: number, days_after: number): number {
  return getBusinessDay(getDateFromDayYmd(day_ymd), days_after, 1);
}

export function getPreviousKoreanBusinessDayYmd(day_ymd: number, days_before: number): number {
  return getBusinessDay(getDateFromDayYmd(day_ymd), days_before, -1);
}

export function getNextKoreanBusinessDayYmdByUtcDate(date: Date, days_after: number): number {
  date = new Date(date);
  date.setUTCHours(date.getUTCHours() + 9);
  return getBusinessDay(date, days_after, 1);
}

export function getPreviousKoreanBusinessDayYmdByUtcDate(date: Date, days_before: number): number {
  date = new Date(date);
  date.setUTCHours(date.getUTCHours() + 9);
  return getBusinessDay(date, days_before, -1);
}
