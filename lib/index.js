"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 토, 일요일 정보는 포함하지 않음
const KOREAN_HOLIDAYS = {
    2019: {
        1: {
            1: true,
        },
        2: {
            4: true,
            5: true,
            6: true,
        },
        3: {
            1: true,
        },
        4: {},
        5: {
            5: true,
            6: true,
            12: true,
        },
        6: {
            6: true,
        },
        7: {},
        8: {
            15: true,
        },
        9: {
            12: true,
            13: true,
            14: true,
        },
        10: {
            3: true,
            9: true,
        },
        11: {},
        12: {
            25: true,
        },
    },
    2020: {
        1: {
            1: true,
            24: true,
            25: true,
            26: true,
            27: true,
        },
        2: {},
        3: {
            1: true,
        },
        4: {
            15: true,
            30: true,
        },
        5: {
            5: true,
        },
        6: {
            6: true,
        },
        7: {},
        8: {
            15: true,
        },
        9: {
            30: true,
        },
        10: {
            1: true,
            2: true,
            3: true,
            9: true,
        },
        11: {},
        12: {
            25: true,
        },
    },
};
function getYmdByDate(date) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
}
function getDateFromDayYmd(day_ymd) {
    const day_m = (`0${Math.floor(day_ymd / 100 % 100)}`).slice(-2);
    const day_d = (`0${Math.floor(day_ymd % 100)}`).slice(-2);
    return new Date(`${Math.floor(day_ymd / 10000)}-${day_m}-${day_d}T09:00:00+09:00`);
}
function getBusinessDay(date, days_to_go, set_date_value) {
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
function getNextKoreanBusinessDayYmd(day_ymd, days_after) {
    return getBusinessDay(getDateFromDayYmd(day_ymd), days_after, 1);
}
exports.getNextKoreanBusinessDayYmd = getNextKoreanBusinessDayYmd;
function getPreviousKoreanBusinessDayYmd(day_ymd, days_before) {
    return getBusinessDay(getDateFromDayYmd(day_ymd), days_before, -1);
}
exports.getPreviousKoreanBusinessDayYmd = getPreviousKoreanBusinessDayYmd;
function getNextKoreanBusinessDayYmdByUtcDate(date, days_after) {
    date = new Date(date);
    date.setUTCHours(date.getUTCHours() + 9);
    return getBusinessDay(date, days_after, 1);
}
exports.getNextKoreanBusinessDayYmdByUtcDate = getNextKoreanBusinessDayYmdByUtcDate;
function getPreviousKoreanBusinessDayYmdByUtcDate(date, days_before) {
    date = new Date(date);
    date.setUTCHours(date.getUTCHours() + 9);
    return getBusinessDay(date, days_before, -1);
}
exports.getPreviousKoreanBusinessDayYmdByUtcDate = getPreviousKoreanBusinessDayYmdByUtcDate;
