"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviousKoreanBusinessDayYmdByUtcDate = exports.getNextKoreanBusinessDayYmdByUtcDate = exports.getPreviousKoreanBusinessDayYmd = exports.getNextKoreanBusinessDayYmd = exports.isHoliday = void 0;
var index_js_1 = require("./year_holidays/index.js");
function getYmdByDate(date) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
}
function getDateFromDayYmd(day_ymd) {
    if (!/^20[0-9][0-9](0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(String(day_ymd))) {
        throw new Error("invalid day_ymd: ".concat(day_ymd));
    }
    var day_m = "0".concat(Math.floor((day_ymd / 100) % 100)).slice(-2);
    var day_d = "0".concat(Math.floor(day_ymd % 100)).slice(-2);
    return new Date("".concat(Math.floor(day_ymd / 10000), "-").concat(day_m, "-").concat(day_d, "T09:00:00+09:00"));
}
function getBusinessDay(_a) {
    var _b;
    var date = _a.date, days_to_go = _a.days_to_go, set_date_increased = _a.set_date_increased;
    if (days_to_go < 1) {
        throw new Error("second parameter value should be positive value");
    }
    while (days_to_go) {
        date.setDate(date.getDate() + (set_date_increased ? 1 : -1));
        var day = date.getDay();
        if (day === 0 || day === 6) {
            continue;
        }
        var ymd = getYmdByDate(date);
        var holiday_of_year = (_b = index_js_1.KOREAN_HOLIDAYS[ymd.year]) !== null && _b !== void 0 ? _b : index_js_1.HOLIDAYS_FALLBACK;
        var holiday_of_month = holiday_of_year[ymd.month];
        if (!holiday_of_month) {
            throw new Error("month ".concat(ymd.month, " data not exists"));
        }
        if (holiday_of_month[ymd.day]) {
            continue;
        }
        days_to_go--;
    }
    var result = getYmdByDate(date);
    return result.year * 10000 + result.month * 100 + result.day;
}
/**
 * 휴일 여부를 반환합니다.
 * @param date 살펴볼 날짜
 * @returns 휴일 여부
 */
function isHoliday(date) {
    var _a;
    date = new Date(date);
    date.setUTCHours(date.getUTCHours() + 9);
    var day = date.getDay();
    var ymd = getYmdByDate(date);
    var holiday_of_year = (_a = index_js_1.KOREAN_HOLIDAYS[ymd.year]) !== null && _a !== void 0 ? _a : index_js_1.HOLIDAYS_FALLBACK;
    var holiday_of_month = holiday_of_year[ymd.month];
    var result = (holiday_of_month === null || holiday_of_month === void 0 ? void 0 : holiday_of_month[ymd.day]) !== undefined;
    return day === 0 || day === 6 || result;
}
exports.isHoliday = isHoliday;
/**
 * YYYYMMDD 형태의 숫자를 입력으로 받아 영업일 기준 n일 후를 반환합니다.
 * @param day_ymd 기준일(YYYYMMDD 형태의 숫자)
 * @param days_after n일 후
 * @returns 다음 영업일(YYYYMMDD 형태의 숫자)
 */
function getNextKoreanBusinessDayYmd(day_ymd, days_after) {
    return getBusinessDay({
        date: getDateFromDayYmd(day_ymd),
        days_to_go: days_after,
        set_date_increased: true,
    });
}
exports.getNextKoreanBusinessDayYmd = getNextKoreanBusinessDayYmd;
/**
 * YYYYMMDD 형태의 숫자를 입력으로 받아 영업일 기준 n일 전을 반환합니다.
 * @param day_ymd 기준일(YYYYMMDD 형태의 숫자)
 * @param days_after n일 전
 * @returns 이전 영업일(YYYYMMDD 형태의 숫자)
 */
function getPreviousKoreanBusinessDayYmd(day_ymd, days_before) {
    return getBusinessDay({
        date: getDateFromDayYmd(day_ymd),
        days_to_go: days_before,
        set_date_increased: false,
    });
}
exports.getPreviousKoreanBusinessDayYmd = getPreviousKoreanBusinessDayYmd;
/**
 * UTC 시간대의 Date 인스턴스를 입력으로 받아 영업일 기준 n일 후를 반환합니다.
 * @param date 기준일(UTC 시각)
 * @param days_after n일 후
 * @returns 다음 영업일(YYYYMMDD 형태의 숫자)
 */
function getNextKoreanBusinessDayYmdByUtcDate(date, days_after) {
    date = new Date(date);
    date.setUTCHours(date.getUTCHours() + 9);
    return getBusinessDay({
        date: date,
        days_to_go: days_after,
        set_date_increased: true,
    });
}
exports.getNextKoreanBusinessDayYmdByUtcDate = getNextKoreanBusinessDayYmdByUtcDate;
/**
 * UTC 시간대의 Date 인스턴스를 입력으로 받아 영업일 기준 n일 전을 반환합니다.
 * @param date 기준일(UTC 시각)
 * @param days_after n일 전
 * @returns 이전 영업일(YYYYMMDD 형태의 숫자)
 */
function getPreviousKoreanBusinessDayYmdByUtcDate(date, days_before) {
    date = new Date(date);
    date.setUTCHours(date.getUTCHours() + 9);
    return getBusinessDay({
        date: date,
        days_to_go: days_before,
        set_date_increased: false,
    });
}
exports.getPreviousKoreanBusinessDayYmdByUtcDate = getPreviousKoreanBusinessDayYmdByUtcDate;
