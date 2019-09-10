import { expect } from 'chai';
import { getNextKoreanBusinessDayYmd } from '../src';

describe('getNextKoreanBusinessDayYmd', () => {
  it('day_ymd에서 days_after일 이후의 영업일 YMD를 구한다.', () => {
    expect(getNextKoreanBusinessDayYmd(20190531, 4)).to.eql(20190607);
  });

  it('"월"이 넘어가는 경우', () => {
    expect(getNextKoreanBusinessDayYmd(20190911, 17)).to.eql(20191010);
  });

  it('"해"가 넘어가는 경우', () => {
    expect(getNextKoreanBusinessDayYmd(20191220, 9)).to.eql(20200106);
  });

  describe('errors', () => {
    it('days_after만큼 넘기는 중에 데이터가 없는 해로 넘어가는 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20201220, 9);
      } catch (e) {
        expect(e.message).to.eql('year 2021 data not exists');
      }
    });

    it('days_after에 0이 입력된 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20190531, 0);
      } catch (e) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });

    it('days_after에 음수가 입력된 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20190531, -31);
      } catch (e) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });
  });
});
