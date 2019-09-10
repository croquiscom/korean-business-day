// 토, 일요일 정보는 포함하지 않음
const KOREAN_HOLIDAYS: { [year: number]: { [month: number]: { [day: number]: boolean } } } = {
  2019: {
    1: {
      1: true, // 신정
    },
    2: {
      4: true, // 설날 연휴
      5: true, // 설날
      6: true, // 설날 연휴
    },
    3: {
      1: true, // 삼일절
    },
    4: {

    },
    5: {
      5: true, // 어린이날
      6: true, // 어린이날 대체휴일
      12: true, // 부처님 오신날
    },
    6: {
      6: true, // 현충일
    },
    7: {

    },
    8: {
      15: true, // 광복절
    },
    9: {
      12: true, // 추석 연휴
      13: true, // 추석
      14: true, // 추석 연휴
    },
    10: {
      3: true, // 개천절
      9: true, // 한글날
    },
    11: {

    },
    12: {
      25: true, // 크리스마스
    },
  },
  2020: {
    1: {
      1: true, // 신정
      24: true, // 설날 연휴
      25: true, // 설날
      26: true, // 설날 연휴
      27: true, // 대체 휴일
    },
    2: {

    },
    3: {
      1: true, // 삼일절
    },
    4: {
      15: true, // 21대 국회의원 선거일
      30: true, // 부처님 오신날
    },
    5: {
      5: true, // 어린이날
    },
    6: {
      6: true, // 현충일
    },
    7: {

    },
    8: {
      15: true, // 광복절
    },
    9: {
      30: true, // 추석 연휴
    },
    10: {
      1: true, // 추석
      2: true, // 추석 연휴
      3: true, // 개천절
      9: true, // 한글날
    },
    11: {
    },
    12: {
      25: true, // 성탄절
    },
  },
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
