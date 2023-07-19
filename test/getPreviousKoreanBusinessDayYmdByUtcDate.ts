import { expect } from 'chai';
import { getPreviousKoreanBusinessDayYmdByUtcDate } from '../src/index.js';

describe('getPreviousKoreanBusinessDayYmdByUtcDate', () => {
  it('day_ymd에서 days_before일 이전의 영업일 YMD를 구한다.', () => {
    expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31, 0, 0), 4)).to.eql(20190527);
    expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 5, 2, 15, 0), 4)).to.eql(20190528);
  });

  it('"월"이 이전으로 넘어가는 경우', () => {
    expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 9, 10), 17)).to.eql(20190911);
  });

  it('"해"가 이전으로 넘어가는 경우', () => {
    expect(getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2020, 0, 6), 9)).to.eql(20191220);
  });

  describe('errors', () => {
    it('days_before에 0이 입력된 경우', () => {
      try {
        getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), 0);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });

    it('days_before에 음수가 입력된 경우', () => {
      try {
        getPreviousKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), -31);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });
  });
});
