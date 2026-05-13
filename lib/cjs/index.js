"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHoliday = isHoliday;
exports.getNextKoreanBusinessDayYmd = getNextKoreanBusinessDayYmd;
exports.getPreviousKoreanBusinessDayYmd = getPreviousKoreanBusinessDayYmd;
exports.getNextKoreanBusinessDayYmdByUtcDate = getNextKoreanBusinessDayYmdByUtcDate;
exports.getPreviousKoreanBusinessDayYmdByUtcDate = getPreviousKoreanBusinessDayYmdByUtcDate;
exports.getKoreanHolidaysInRange = getKoreanHolidaysInRange;
var index_js_1 = require("./year_holidays/index.js");
function getYmdByDate(date) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
}
function validateDayYmd(day_ymd) {
    if (!/^20[0-9][0-9](0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(String(day_ymd))) {
        throw new Error("invalid day_ymd: ".concat(day_ymd));
    }
}
function getDateFromDayYmd(day_ymd) {
    validateDayYmd(day_ymd);
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
/**
 * 지정된 기간 내의 공휴일 목록을 반환합니다.
 * 데이터가 없는 연도는 HOLIDAYS_FALLBACK을 참고합니다.
 * @param from_ymd 시작일(YYYYMMDD 형태의 숫자, 포함)
 * @param to_ymd 종료일(YYYYMMDD 형태의 숫자, 포함)
 * @returns 공휴일 목록 (날짜 오름차순)
 */
function getKoreanHolidaysInRange(from_ymd, to_ymd) {
    var _a;
    validateDayYmd(from_ymd);
    validateDayYmd(to_ymd);
    if (from_ymd > to_ymd) {
        throw new Error("from_ymd should not be greater than to_ymd");
    }
    var result = [];
    var from_year = Math.floor(from_ymd / 10000);
    var to_year = Math.floor(to_ymd / 10000);
    for (var year = from_year; year <= to_year; year++) {
        var holidays_of_year = (_a = index_js_1.KOREAN_HOLIDAYS[year]) !== null && _a !== void 0 ? _a : index_js_1.HOLIDAYS_FALLBACK;
        for (var month = 1; month <= 12; month++) {
            var holidays_of_month = holidays_of_year[month];
            if (!holidays_of_month) {
                continue;
            }
            for (var day_str in holidays_of_month) {
                var name = holidays_of_month[Number(day_str)];
                if (name == null) {
                    continue;
                }
                var day = Number(day_str);
                var ymd = year * 10000 + month * 100 + day;
                if (ymd < from_ymd || ymd > to_ymd) {
                    continue;
                }
                var day_m = "0".concat(month).slice(-2);
                var day_d = "0".concat(day).slice(-2);
                result.push({ date: "".concat(year, "-").concat(day_m, "-").concat(day_d), name: name, ymd: ymd });
            }
        }
    }
    result.sort(function (a, b) { return a.ymd - b.ymd; });
    return result;
}
