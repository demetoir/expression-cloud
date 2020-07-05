# Expression Could

[![Build Status](https://travis-ci.com/demetoir/expressionCloud.svg?branch=master)](https://travis-ci.com/demetoir/expressionCloud)

# 대략적인 서비스 스케치

- 텍스트 수식을 이미지나 뭐든 익스포트 가능함
- 엑셀처럼 값입력하면 바로바로 값이 나옴
- 입력 출력은 임포트, 익스포트 해야함
- 변수명으로 표시되다가 실제 값들어간것도 표시 가능하도록
- 수식을 한글로 출력 할수 있어야함 (추가사)
- 기본적인 수식 처리는 math.js, mathjax 같은 모듈로 처리한ㄷ
- 이세상의 모든 수식을 공유하는것이 목표
- 수식을 리포처럼 포크 가능해야함
- 수식 언어 js, latex, Mathematica 로 입력하면 수식 이미지가 보여야함
- 수식에 색상 들어가야함
- 수식을 여러개 가지는 콜렉션
- 팀으로 한다면 수식이나 이런거 권한 넘겨주기 기능
- 공개 라던가 공유라던가
- 엑셀 에서 로우 선택되면 수식의 변수가 실제 값이 들어간것도 표시하
- 관리자 페이지는 나중에..
- 계산식 문법에 대한 검증해야함
- 다양한 데이터 타입, excel, csv, json 같은거 임포트, 익스포트 가능
- 비회원 유저도 가능하도록 만든다
- 수식 구분을 위한 태그 기능

# Tech stack

## FE

- [*] nuxt.js(vue.js)
- [*] jest
- [*] typescript
- [*] webpack
- [*] ant design
- [ ] math.js
- [ ] mathjax
- [ ] awesome spreed sheet module

## BE

- [*] nest.js
- [*] typescript
- [*] typeorm
- [*] jest

## 테스트 환경

- [*] jest
- [*] sqlite

## 개발 환경

- [*] storage by docker
  - [*] mysql
  - [ ] redis
  - [ ] mongo

## 배포 환경

- [ ] storage on aws

  - [ ] RDS
  - [ ] S3
  - [ ] elasticCache

- [ ] beanstalk vs ecs vs KUBERNETES
- [ ] lambda???
- [ ] docker
  - [ ] node runtime
  - [ ] nginx

## ci/cd

- [*] travis-ci
- [*] git hook
  - [*] lint fix
  - [*] prettier
- [ ] github action vs aws code deploy
  - https://velog.io/@q00/Github-action-aws-ecs-Github-CICD-55k38sf8ik
