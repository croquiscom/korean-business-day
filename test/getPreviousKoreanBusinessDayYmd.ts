import { expect } from 'chai';
import { getPreviousKoreanBusinessDayYmd } from '../src';

describe('getPreviousKoreanBusinessDayYmd', () => {
  it('day_ymd에서 days_before일 이후의 영업일 YMD를 구한다.', () => {
    expect(getPreviousKoreanBusinessDayYmd(20190607, 4)).to.eql(20190531);
  });

  it('"월"이 이전으로 넘어가는 경우', () => {
    expect(getPreviousKoreanBusinessDayYmd(20191010, 17)).to.eql(20190911);
  });

  it('"해"가 이전으로 넘어가는 경우', () => {
    expect(getPreviousKoreanBusinessDayYmd(20200106, 9)).to.eql(20191220);
  });

  describe('errors', () => {
    it('days_before만큼 넘기는 중에 데이터가 없는 해로 넘어가는 경우', () => {
      try {
        getPreviousKoreanBusinessDayYmd(20190111, 9);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql('year 2018 data not exists');
      }
    });

    it('days_before에 0이 입력된 경우', () => {
      try {
        getPreviousKoreanBusinessDayYmd(20190531, 0);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });

    it('days_before에 음수가 입력된 경우', () => {
      try {
        getPreviousKoreanBusinessDayYmd(20190531, -31);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });
  });
});
