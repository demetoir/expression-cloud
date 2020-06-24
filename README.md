# Expression Could

[![Build Status](https://travis-ci.com/demetoir/expressionCloud.svg?branch=master)](https://travis-ci.com/demetoir/expressionCloud)

# 개발환경

vue dev server
nest dev server
docker for mysql and redis, mongo

# 배포환경

deploy to aws
docker deploy
beanstalk
rds
elastic cache
s3
route 53
node 12
vpc
ALB..???
lambda

# ci/cd flow

https://velog.io/@q00/Github-action-aws-ecs-Github-CICD-55k38sf8ik

마스터 pr시에만 테스트

master 로 머지시 배포

git action

lint api test api build api js
lint app test app build app js

send built api to beanstalk
send built app to s3
send nginx conf to .ebextensions

# 대략적인 스케치

math.js
https://jsbin.com/ciwocakaba/edit?html,output
js 에서 수식을 바로 연산가능함
일단 계산식은 간단한 사칙연산에 회계 기호 정도로 지원하는걸로 생각하고
변수 명 치환시켜서 하면 될것같은데..?

간단한 계산클라에서 해도 된다. 그런데 이러면 너무 프론트잖아
벡엔드할려면 API 만들기 가능해야한다.
수식을 이쁘게 찍을수 있어야함
한글 수식은 만들기 까다롭네...
이거 정도면 만들수 있을듯 하다.
mathjax 로 수식

팀으로 초대 및 공유
프로젝트 권한 넘기기 가능해야함

간단한 계산은 람다에 넘겨서 하면된다
서비스의 목표닌 복잡한 수식을 코드로 옮기기 쉽도록 만드는것
주어진 인풋과 아웃풋을 검증 할수 있도록 만들어야함
수식으로 쓴거를 코드로 바꿧을댸 동일한 동작이 되는 지 검증하기
인풋 아웃풋은 범위를 지정해서 랜덤으로 넣거나 지정한 값을 검증하도록 해야함
흠,,, 그래프 그리는것도 필요한가?

계산식은 여러가지로 출력가능해야한다. 이미지나 pdf 나 아니면 latex 같은거
흠...
여러가지 언어를 지원해야하나?

프론트는 SPA 를 기본으로 만들기
서버사이드 랜더링 가능해야함

코드에서 수식으로 변환
수식에서 코드로 변환
이런거 가능하면 좋을텐데

관리자 페이지 있어야한다.
관리자 페이지는 react 에 서버사이드 랜더링 방식으로 만들면 된다.

로그는 몽고디비에넣고
검색 기능있어야한다

## 서비스 계산식 스펙

js, latex, Mathematica 언어 편집 가능
계산식 저장 수정삭제
계산식 문법 검증
계산식 입력 및 출력 테이블 보기 및 데이터 저장
데이터 입력 및 출력 FROM excel, csv, json ....
HTTP API
관리자 페이지

## frontend

vue.js
nuxt.js
jest
typescript
webpack
디자인은 엔트 디자인을 사용
vue excel or spreed sheet module

## backend

nest.js
typescript
yarn
mocha
typeorm

- REST like http api
- api doc 자동생성
- 모니터링 알아보기

## 인프라

aws ec2, rds, code Deploy

- docker

## DB

test sqlite
dev mysql
prod aws aroras

aws elasticCache redis
docker redis
