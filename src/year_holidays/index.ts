import { HOLIDAYS_2019 } from './2019.js';
import { HOLIDAYS_2020 } from './2020.js';
import { HOLIDAYS_2021 } from './2021.js';
import { HOLIDAYS_2022 } from './2022.js';
import { HOLIDAYS_2023 } from './2023.js';
import { HOLIDAYS_2024 } from './2024.js';
import { IYearHolidays } from './types.js';

// 토, 일요일 정보는 포함하지 않음
export const KOREAN_HOLIDAYS: Record<number, IYearHolidays | undefined> = {
  2019: HOLIDAYS_2019,
  2020: HOLIDAYS_2020,
  2021: HOLIDAYS_2021,
  2022: HOLIDAYS_2022,
  2023: HOLIDAYS_2023,
  2024: HOLIDAYS_2024,
};

export { HOLIDAYS_FALLBACK } from './fallback.js';
