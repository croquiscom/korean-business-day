[![npm version](https://badge.fury.io/js/korean-business-day.svg)](https://badge.fury.io/js/korean-business-day)
![test](https://github.com/croquiscom/korean-business-day/workflows/test/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/croquiscom/korean-business-day/badge.svg?branch=main)](https://coveralls.io/github/croquiscom/korean-business-day?branch=main)

korean-business-day는 영업일(한국 기준) 계산을 도와주는 모듈입니다.

## 함수 목록

### getNextKoreanBusinessDayYmd

YYYYMMDD 형태의 숫자를 입력으로 받아 영업일 기준 n일 후를 반환합니다.

반환값은 YYYYMMDD 형태의 날짜(숫자형)입니다.

### getPreviousKoreanBusinessDayYmd

YYYYMMDD 형태의 숫자를 입력으로 받아 영업일 기준 n일 전을 반환합니다.

반환값은 YYYYMMDD 형태의 날짜(숫자형)입니다.

### getNextKoreanBusinessDayYmdByUtcDate

UTC 시간대의 Date 인스턴스를 입력으로 받아 영업일 기준 n일 후를 반환합니다.

반환값은 YYYYMMDD 형태의 날짜(숫자형)입니다.

### getPreviousKoreanBusinessDayYmdByUtcDate

UTC 시간대의 Date 인스턴스를 입력으로 받아 영업일 기준 n일 전을 반환합니다.

반환값은 YYYYMMDD 형태의 날짜(숫자형)입니다.

### isHoliday

주어진 시각(UTC 시간대)의 휴일 여부를 반환합니다.

## 작업 순서

1. 소스를 수정하고 테스트 코드를 작성합니다.
2. `npm test`로 동작 여부를 확인합니다.
3. release workflow를 사용해 모듈을 배포합니다.

# 라이브러리 이력

[GitHub Releases](https://github.com/croquiscom/korean-business-day/releases)에서 이력을 확인할 수 있습니다.

# 라이선스

MIT licenses. [LICENSE](https://github.com/croquiscom/korean-business-day/blob/main/LICENSE)를 참고하세요.
