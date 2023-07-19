"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOLIDAYS_FALLBACK = exports.KOREAN_HOLIDAYS = void 0;
var _2019_1 = require("./2019");
var _2020_1 = require("./2020");
var _2021_1 = require("./2021");
var _2022_1 = require("./2022");
var _2023_1 = require("./2023");
// 토, 일요일 정보는 포함하지 않음
exports.KOREAN_HOLIDAYS = {
    2019: _2019_1.HOLIDAYS_2019,
    2020: _2020_1.HOLIDAYS_2020,
    2021: _2021_1.HOLIDAYS_2021,
    2022: _2022_1.HOLIDAYS_2022,
    2023: _2023_1.HOLIDAYS_2023,
};
var fallback_1 = require("./fallback");
Object.defineProperty(exports, "HOLIDAYS_FALLBACK", { enumerable: true, get: function () { return fallback_1.HOLIDAYS_FALLBACK; } });
