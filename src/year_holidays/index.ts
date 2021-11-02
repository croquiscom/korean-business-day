import { IYearHolidays } from './types';
import { HOLIDAYS_2019 } from './2019';
import { HOLIDAYS_2020 } from './2020';
import { HOLIDAYS_2021 } from './2021';
import { HOLIDAYS_2022 } from './2022';

// 토, 일요일 정보는 포함하지 않음
export const KOREAN_HOLIDAYS: { [year: number]: IYearHolidays } = {
  2019: HOLIDAYS_2019,
  2020: HOLIDAYS_2020,
  2021: HOLIDAYS_2021,
  2022: HOLIDAYS_2022,
};
