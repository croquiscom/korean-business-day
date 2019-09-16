import { expect } from 'chai';
import { getNextKoreanBusinessDayYmdByUtcDate } from '../src';

describe('getNextKoreanBusinessDayYmdByUtcDate', () => {
  it('day_ymd에서 days_after일 이후의 영업일 YMD를 구한다.', () => {
    expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31, 0, 0), 4)).to.eql(20190607);
    expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 5, 2, 15, 0), 4)).to.eql(20190610);
  });

  it('"월"이 넘어가는 경우', () => {
    expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 8, 11), 17)).to.eql(20191010);
  });

  it('"해"가 넘어가는 경우', () => {
    expect(getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 11, 20), 9)).to.eql(20200106);
  });

  describe('errors', () => {
    it('days_after만큼 넘기는 중에 데이터가 없는 해로 넘어가는 경우', () => {
      try {
        getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 11, 20), 9);
      } catch (e) {
        expect(e.message).to.eql('year 2021 data not exists');
      }
    });

    it('days_after에 0이 입력된 경우', () => {
      try {
        getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), 0);
      } catch (e) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });

    it('days_after에 음수가 입력된 경우', () => {
      try {
        getNextKoreanBusinessDayYmdByUtcDate(new Date(2019, 4, 31), -31);
      } catch (e) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });
  });
});
