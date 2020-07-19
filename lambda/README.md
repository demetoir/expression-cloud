# aws lambda function directory

# 삽질 logging

- serverless 가입
- serverless dash board 에서 app 생성

- 마이페이지 eploy profile 로가서 전용 프로필 따로 생성
- 프로필에 aws connection 으로 연결하기

  - 그러면 빠른 aws 빠른 스택 생성하기에서 탬플릿으로 만들기 창뜸
  - 그리고 밑에 The following resource(s) require capabilities: [AWS::IAM::Role] 체크박스 선택하기 후만들기
  - 조금 기다리면 다만들어진다

- 프로필에서 safeguards 설정하기

  - 다음 설정을 warning 옵션으로 추가함
    - allowed-function-names
    - no-secret-env-vars
    - allowed-regions
    - allowed-runtimes
    - allowed-stages
    - no-wild-iam-role-statements
    - require-cfn-role
  - 나머지는 나중에하고

- 다되면 app 페이지,
- notification 으로 가서 이메일 넣는다
- app setting, stage로 가서 deploy profile을 아까 만든 놈으로 변경한다

- deploy remove로 배포 중단해야 깔끔하게 삭제된다. aws 람다, s3 등등...

- 강제 삭제 할려면 cloud formation 가서 스택을 삭제해야함. 이경우에는 버킷은 따로 지워줘야함

- 대시보드의 ci/cd 설정가서 리포 선택, 리전 선택, 이거는 서비스 마다 다해줘야함

- node.js dependency 처리는 serverless-plugin-include-dependencies 으로 처리

- 레이어 추가해서 하는 방식은 deploy 시 필요한 놈만 가져오도록 해야함
- /layer 폴더 하나 만들어서 package.json, lock 파 복붙 한뒤 prod mode 로 node_module 설치하고, package 지우는 과정을 빌드에 추가해야함
- 이거 할려면 레이어 동일하면 안올라가게 만드는거랑, 패키지 파일 버전 체크도 하도록 만들어야함


- 배포시 사용되는 aws IAM 은 이정도 해도 배포, 실행, 로깅은 잘된다 
    - AmazonAPIGatewayInvokeFullAccess
    - AmazonAPIGatewayPushToCloudWatchLogs
    - AWSLambdaBasicExecutionRole
    - RDS???
    - S3???
- 추가적으로 s3랑 RDS 권한 필요한지 봐야한다

# tech stack

- node 12
- serverless
- aws lambda

# todo

- [ ] dot env 설정하
- [*] 배포 설정
- [*] layer 설정 및 자동 업로드
- [ ] 권한 설정하기
    - AmazonAPIGatewayInvokeFullAccess
    - AmazonAPIGatewayPushToCloudWatchLogs
    - AWSLambdaBasicExecutionRole
    - RDS???
- [ ] api gateway enpoint 설정하기 설정
- [ ] VPC 설정하기
- [ ] 로컬 e2e test
- [ ] 플러그인 알아보기
- [ ] prettier lint git hook 설정하기

# serverless framework

app/service/function 이런 구조로 되어있음

app = expression cloud
service = [
email-sending,
image-resizing,
]

이런식으로 나눠서 하라는 의도네

# todo

- [ ] layer 설정하는거 실습하기
- [ ] layer 설정하는거 실습하기

# 그외크 고려한 서버리스 프레임워크

Apex
Chalice
Claudia.js
Sparta
Zappa

# reference

https://www.slideshare.net/awskorea/aws-aws-devday2018
https://velopert.com/3549
https://www.megazone.com/techblog_20200424_opensource-24-open-source-tools-for-the-serverless-developer-part-1/

# cli

```shell script
# service 추가시에는것 serverless 대시보드 참조할

#deploy
npx serverless deploy

# open dashboard in browser
npx serverless dashboard

# invoke function at local
npx serverless invoke local -f hello -p ./mocks/sample-mocks.json

# undo deploy
npx serverless remove
```
