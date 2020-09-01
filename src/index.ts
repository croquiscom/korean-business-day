import { HOLIDAYS_2019, HOLIDAYS_2020, HOLIDAYS_2021, IYearHolidays } from './year_holidays';

// 토, 일요일 정보는 포함하지 않음
const KOREAN_HOLIDAYS: { [year: number]: IYearHolidays } = {
  2019: HOLIDAYS_2019,
  2020: HOLIDAYS_2020,
  2021: HOLIDAYS_2021,
};

function getYmdByDate(date: Date): { year: number, month: number, day: number } {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function getDateFromDayYmd(day_ymd: number) {
  if (!/^(2019|2020|2021)(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(String(day_ymd))) {
    throw new Error(`invalid day_ymd: ${day_ymd}`);
  }
  const day_m = (`0${Math.floor(day_ymd / 100 % 100)}`).slice(-2);
  const day_d = (`0${Math.floor(day_ymd % 100)}`).slice(-2);
  return new Date(`${Math.floor(day_ymd / 10000)}-${day_m}-${day_d}T09:00:00+09:00`);
}

function getBusinessDay(
  { date, days_to_go, set_date_increased }:
    { date: Date, days_to_go: number, set_date_increased: boolean },
) {
  if (days_to_go < 1) {
    throw new Error(`second parameter value should be positive value`);
  }
  while (days_to_go) {
    date.setDate(date.getDate() + (set_date_increased ? 1 : -1));
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

/**
 * 휴일 여부를 반환합니다.
 * @param date 살펴볼 날짜
 * @returns 휴일 여부
 */
export function isHoliday(date: Date): boolean {
  date = new Date(date);
  date.setUTCHours(date.getUTCHours() + 9);
  const day = date.getDay();
  const ymd = getYmdByDate(date);
  const result = (KOREAN_HOLIDAYS[ymd.year][ymd.month][ymd.day] !== undefined);
  return (day === 0 || day === 6) || result;
}

/**
 * YYYYMMDD 형태의 숫자를 입력으로 받아 영업일 기준 n일 후를 반환합니다.
 * @param day_ymd 기준일(YYYYMMDD 형태의 숫자)
 * @param days_after n일 후
 * @returns 다음 영업일(YYYYMMDD 형태의 숫자)
 */
export function getNextKoreanBusinessDayYmd(day_ymd: number, days_after: number): number {
  return getBusinessDay({
    date: getDateFromDayYmd(day_ymd),
    days_to_go: days_after,
    set_date_increased: true,
  });
}

/**
 * YYYYMMDD 형태의 숫자를 입력으로 받아 영업일 기준 n일 전을 반환합니다.
 * @param day_ymd 기준일(YYYYMMDD 형태의 숫자)
 * @param days_after n일 전
 * @returns 이전 영업일(YYYYMMDD 형태의 숫자)
 */
export function getPreviousKoreanBusinessDayYmd(day_ymd: number, days_before: number): number {
  return getBusinessDay({
    date: getDateFromDayYmd(day_ymd),
    days_to_go: days_before,
    set_date_increased: false,
  });
}

/**
 * UTC 시간대의 Date 인스턴스를 입력으로 받아 영업일 기준 n일 후를 반환합니다.
 * @param date 기준일(UTC 시각)
 * @param days_after n일 후
 * @returns 다음 영업일(YYYYMMDD 형태의 숫자)
 */
export function getNextKoreanBusinessDayYmdByUtcDate(date: Date, days_after: number): number {
  date = new Date(date);
  date.setUTCHours(date.getUTCHours() + 9);
  return getBusinessDay({
    date,
    days_to_go: days_after,
    set_date_increased: true,
  });
}

/**
 * UTC 시간대의 Date 인스턴스를 입력으로 받아 영업일 기준 n일 전을 반환합니다.
 * @param date 기준일(UTC 시각)
 * @param days_after n일 전
 * @returns 이전 영업일(YYYYMMDD 형태의 숫자)
 */
export function getPreviousKoreanBusinessDayYmdByUtcDate(date: Date, days_before: number): number {
  date = new Date(date);
  date.setUTCHours(date.getUTCHours() + 9);
  return getBusinessDay({
    date,
    days_to_go: days_before,
    set_date_increased: false,
  });
}
