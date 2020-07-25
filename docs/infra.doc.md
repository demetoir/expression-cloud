# infra

# 개발 Infra

- 개발용 로컬 DB 인 postgresQL과 redis는 도커로 만든거 사용
- 이미지 같은 s3는 docker 로 할지 아니면 localstack을 이용해서 구성할지 결정 필요

## 배포 Infra

- 계정하나 프리티어 예산 안에서 가능한 정도로 구성
- 사이드프로젝트의 취지를 생각하면 serverless 구성과, docker 기반의 배포(ECS or EKS)가 목적
- 예산을 생각했을때 상시배포용으로는 serverless 로 구
- 도커 기반의 배포는 실습 정도로 생각
- DB는 Mysql정도만 생각

### 상시 배포용 serverless Infra 설정

- 상시 배포는 api server 와 랜더링 서버는 serverless 프레임워크를 이용
- lambda 이용시 DB connection pool issue 때문에 RDS Proxy 를 추가로 구성
- api gateway도 설정하기
- travis-ci 기반으로 CI/CD 구

### 상시 배포용 공통 설정

- RDS - mysql - free tier
- RDS - serverless 를 사용하려고 했으나. 프리티어로 제공하기 않고, public acess 가 불가능하기 떄문에 사용하지 않음
- RDS proxy
- Elasticache - redis
- s3
- cloud front
- route 53
- VPC

## 도커 기반의 배포

- ECS or EKS 기반으로 배포
- docker compose 기반으로 설정
- ALB 설정
- aws 배포 서비스나, 외부 ci/cd 툴을 사용
- 도커 이미지의 경우 ECR 저장용량 프리티어가 그다지 크지 않음, 그러니 그냥 ECR말고 Dockerhub를 이용하여 구성
