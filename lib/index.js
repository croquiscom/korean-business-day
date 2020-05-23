"use strict";
exports.__esModule = true;
exports.getPreviousKoreanBusinessDayYmdByUtcDate = exports.getNextKoreanBusinessDayYmdByUtcDate = exports.getPreviousKoreanBusinessDayYmd = exports.getNextKoreanBusinessDayYmd = exports.isHoliday = void 0;
var year_holidays_1 = require("./year_holidays");
// 토, 일요일 정보는 포함하지 않음
var KOREAN_HOLIDAYS = {
    2019: year_holidays_1.HOLIDAYS_2019,
    2020: year_holidays_1.HOLIDAYS_2020
};
function getYmdByDate(date) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };
}
function getDateFromDayYmd(day_ymd) {
    if (!/^(2019|2020)(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(String(day_ymd))) {
        throw new Error("invalid day_ymd: " + day_ymd);
    }
    var day_m = ("0" + Math.floor(day_ymd / 100 % 100)).slice(-2);
    var day_d = ("0" + Math.floor(day_ymd % 100)).slice(-2);
    return new Date(Math.floor(day_ymd / 10000) + "-" + day_m + "-" + day_d + "T09:00:00+09:00");
}
function getBusinessDay(_a) {
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
        if (!KOREAN_HOLIDAYS[ymd.year]) {
            throw new Error("year " + ymd.year + " data not exists");
        }
        if (!KOREAN_HOLIDAYS[ymd.year][ymd.month]) {
            throw new Error("month " + ymd.month + " data not exists");
        }
        if (KOREAN_HOLIDAYS[ymd.year][ymd.month][ymd.day]) {
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
    date = new Date(date);
    date.setUTCHours(date.getUTCHours() + 9);
    var day = date.getDay();
    var ymd = getYmdByDate(date);
    var result = (KOREAN_HOLIDAYS[ymd.year][ymd.month][ymd.day] !== undefined);
    return (day === 0 || day === 6) || result;
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
        set_date_increased: true
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
        set_date_increased: false
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
        set_date_increased: true
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
        set_date_increased: false
    });
}
exports.getPreviousKoreanBusinessDayYmdByUtcDate = getPreviousKoreanBusinessDayYmdByUtcDate;
