import { expect } from 'chai';
import { getNextKoreanBusinessDayYmd } from '../src/index.js';

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

  describe('year', () => {
    it('2019', () => {
      expect(getNextKoreanBusinessDayYmd(20190531, 4)).to.eql(20190607);
      expect(getNextKoreanBusinessDayYmd(20190911, 17)).to.eql(20191010);
    });

    it('2020', () => {
      expect(getNextKoreanBusinessDayYmd(20200430, 4)).to.eql(20200508);
      expect(getNextKoreanBusinessDayYmd(20200911, 17)).to.eql(20201012);
    });

    it('2021', () => {
      expect(getNextKoreanBusinessDayYmd(20210430, 4)).to.eql(20210507);
      expect(getNextKoreanBusinessDayYmd(20210910, 17)).to.eql(20211012);
    });

    it('2022', () => {
      expect(getNextKoreanBusinessDayYmd(20220531, 4)).to.eql(20220608);
      expect(getNextKoreanBusinessDayYmd(20220915, 17)).to.eql(20221012);
    });

    it('2023', () => {
      expect(getNextKoreanBusinessDayYmd(20230531, 4)).to.eql(20230607);
      expect(getNextKoreanBusinessDayYmd(20230915, 17)).to.eql(20231016);
    });

    it('fallback year', () => {
      expect(getNextKoreanBusinessDayYmd(20500531, 4)).to.eql(20500607);
      expect(getNextKoreanBusinessDayYmd(20500915, 17)).to.eql(20501011);
    });
  });

  describe('errors', () => {
    it('days_after에 0이 입력된 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20190531, 0);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });

    it('days_after에 음수가 입력된 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20190531, -31);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`second parameter value should be positive value`);
      }
    });

    it('day_ymd에 유효하지 않은 "값"을 입력한 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(2021, 1);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`invalid day_ymd: 2021`);
      }
    });

    it('day_ymd에 유효하지 않은 "년"을 입력한 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(19990101, 1);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`invalid day_ymd: 19990101`);
      }
    });

    it('day_ymd에 유효하지 않은 "월"을 입력한 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20210001, 1);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`invalid day_ymd: 20210001`);
      }
    });

    it('day_ymd에 유효하지 않은 "일"을 입력한 경우', () => {
      try {
        getNextKoreanBusinessDayYmd(20190532, 1);
        throw new Error('must throw an error');
      } catch (e: any) {
        expect(e.message).to.eql(`invalid day_ymd: 20190532`);
      }
    });
  });
});
