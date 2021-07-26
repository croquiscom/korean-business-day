import { HOLIDAYS_2019 } from './2019';
import { HOLIDAYS_2020 } from './2020';
import { HOLIDAYS_2021 } from './2021';

interface IYearHolidays {
  [month: number]: { [day: number]: boolean };
}

export { IYearHolidays, HOLIDAYS_2019, HOLIDAYS_2020, HOLIDAYS_2021 };
