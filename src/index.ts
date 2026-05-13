import { HOLIDAYS_FALLBACK, KOREAN_HOLIDAYS } from './year_holidays/index.js';

export interface IKoreanHoliday {
  date: string;
  name: string;
  ymd: number;
}

function getYmdByDate(date: Date): { year: number; month: number; day: number } {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function validateDayYmd(day_ymd: number) {
  if (!/^20[0-9][0-9](0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(String(day_ymd))) {
    throw new Error(`invalid day_ymd: ${day_ymd}`);
  }
}

function getDateFromDayYmd(day_ymd: number) {
  validateDayYmd(day_ymd);
  const day_m = `0${Math.floor((day_ymd / 100) % 100)}`.slice(-2);
  const day_d = `0${Math.floor(day_ymd % 100)}`.slice(-2);
  return new Date(`${Math.floor(day_ymd / 10000)}-${day_m}-${day_d}T09:00:00+09:00`);
}

function getBusinessDay({
  date,
  days_to_go,
  set_date_increased,
}: {
  date: Date;
  days_to_go: number;
  set_date_increased: boolean;
}) {
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
    const holiday_of_year = KOREAN_HOLIDAYS[ymd.year] ?? HOLIDAYS_FALLBACK;
    const holiday_of_month = holiday_of_year[ymd.month];
    if (!holiday_of_month) {
      throw new Error(`month ${ymd.month} data not exists`);
    }
    if (holiday_of_month[ymd.day]) {
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
  const holiday_of_year = KOREAN_HOLIDAYS[ymd.year] ?? HOLIDAYS_FALLBACK;
  const holiday_of_month = holiday_of_year[ymd.month];
  const result = holiday_of_month?.[ymd.day] !== undefined;
  return day === 0 || day === 6 || result;
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

/**
 * 지정된 기간 내의 공휴일 목록을 반환합니다.
 * 데이터가 없는 연도는 HOLIDAYS_FALLBACK을 참고합니다.
 * @param from_ymd 시작일(YYYYMMDD 형태의 숫자, 포함)
 * @param to_ymd 종료일(YYYYMMDD 형태의 숫자, 포함)
 * @returns 공휴일 목록 (날짜 오름차순)
 */
export function getKoreanHolidaysInRange(from_ymd: number, to_ymd: number): IKoreanHoliday[] {
  validateDayYmd(from_ymd);
  validateDayYmd(to_ymd);
  if (from_ymd > to_ymd) {
    throw new Error(`from_ymd should not be greater than to_ymd`);
  }

  const result: IKoreanHoliday[] = [];
  const from_year = Math.floor(from_ymd / 10000);
  const to_year = Math.floor(to_ymd / 10000);

  for (let year = from_year; year <= to_year; year++) {
    const holidays_of_year = KOREAN_HOLIDAYS[year] ?? HOLIDAYS_FALLBACK;
    for (let month = 1; month <= 12; month++) {
      const holidays_of_month = holidays_of_year[month];
      if (!holidays_of_month) {
        continue;
      }
      for (const day_str in holidays_of_month) {
        const name = holidays_of_month[Number(day_str)];
        if (name == null) {
          continue;
        }
        const day = Number(day_str);
        const ymd = year * 10000 + month * 100 + day;
        if (ymd < from_ymd || ymd > to_ymd) {
          continue;
        }
        const day_m = `0${month}`.slice(-2);
        const day_d = `0${day}`.slice(-2);
        result.push({ date: `${year}-${day_m}-${day_d}`, name, ymd });
      }
    }
  }

  result.sort((a, b) => a.ymd - b.ymd);
  return result;
}
