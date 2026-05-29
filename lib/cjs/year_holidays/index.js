"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOLIDAYS_FALLBACK = exports.KOREAN_HOLIDAYS = void 0;
const _2019_js_1 = require("./2019.js");
const _2020_js_1 = require("./2020.js");
const _2021_js_1 = require("./2021.js");
const _2022_js_1 = require("./2022.js");
const _2023_js_1 = require("./2023.js");
const _2024_js_1 = require("./2024.js");
const _2025_js_1 = require("./2025.js");
const _2026_js_1 = require("./2026.js");
// 토, 일요일 정보는 포함하지 않음
exports.KOREAN_HOLIDAYS = {
    2019: _2019_js_1.HOLIDAYS_2019,
    2020: _2020_js_1.HOLIDAYS_2020,
    2021: _2021_js_1.HOLIDAYS_2021,
    2022: _2022_js_1.HOLIDAYS_2022,
    2023: _2023_js_1.HOLIDAYS_2023,
    2024: _2024_js_1.HOLIDAYS_2024,
    2025: _2025_js_1.HOLIDAYS_2025,
    2026: _2026_js_1.HOLIDAYS_2026,
};
var fallback_js_1 = require("./fallback.js");
Object.defineProperty(exports, "HOLIDAYS_FALLBACK", { enumerable: true, get: function () { return fallback_js_1.HOLIDAYS_FALLBACK; } });
