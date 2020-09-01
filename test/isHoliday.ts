import { expect } from 'chai';
import { isHoliday } from '../src';

function parse(str: string) {
  const y = Number(str.substr(0, 4));
  const m = Number(str.substr(4, 2));
  const d = Number(str.substr(6, 2));
  return new Date(y, m - 1, d);
}

describe('isHoliday', () => {
  it('토요일인 경우', () => {
    expect(isHoliday(parse('20200509'))).to.eql(true);
    expect(isHoliday(parse('20200516'))).to.eql(true);
  });

  it('일요일인 경우', () => {
    expect(isHoliday(parse('20200510'))).to.eql(true);
    expect(isHoliday(parse('20200517'))).to.eql(true);
  });

  it('공휴일인 경우', () => {
    expect(isHoliday(parse('20200505'))).to.eql(true);
    expect(isHoliday(parse('20200815'))).to.eql(true);
  });

  it('평일인 경우', () => {
    expect(isHoliday(parse('20200504'))).to.eql(false);
    expect(isHoliday(parse('20200506'))).to.eql(false);
    expect(isHoliday(parse('20200507'))).to.eql(false);
    expect(isHoliday(parse('20200508'))).to.eql(false);
  });
});
