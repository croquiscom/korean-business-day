import { expect, test } from 'vitest';
import { isHoliday } from '../src/index.js';

function parse(str: string) {
  const y = Number(str.substr(0, 4));
  const m = Number(str.substr(4, 2));
  const d = Number(str.substr(6, 2));
  return new Date(y, m - 1, d);
}

test('토요일인 경우', () => {
  expect(isHoliday(parse('20200509'))).toEqual(true);
  expect(isHoliday(parse('20200516'))).toEqual(true);
});

test('일요일인 경우', () => {
  expect(isHoliday(parse('20200510'))).toEqual(true);
  expect(isHoliday(parse('20200517'))).toEqual(true);
});

test('공휴일인 경우', () => {
  expect(isHoliday(parse('20200505'))).toEqual(true);
  expect(isHoliday(parse('20200815'))).toEqual(true);
});

test('평일인 경우', () => {
  expect(isHoliday(parse('20200504'))).toEqual(false);
  expect(isHoliday(parse('20200506'))).toEqual(false);
  expect(isHoliday(parse('20200507'))).toEqual(false);
  expect(isHoliday(parse('20200508'))).toEqual(false);
});
