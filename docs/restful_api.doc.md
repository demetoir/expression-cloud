## 참고 자료

https://restfulapi.net/content-negotiation/
https://spoqa.github.io/2013/06/11/more-restful-interface.html
https://searchapparchitecture.techtarget.com/definition/RESTful-API
https://github.com/RestCheatSheet/api-cheat-sheet#api-design-cheat-sheet

https://www.restapitutorial.com/

https://hersengarage.nl/rest-api-design-as-a-craft-not-an-art-a3fd97ed3ef4

https://blog.feathersjs.com/design-patterns-for-modern-web-apis-1f046635215

https://stoplight.io/blog/api-design-patterns-for-rest-web-services/

https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/

https://florimond.dev/blog/articles/2018/08/restful-api-design-13-best-practices-to-make-your-users-happy/

https://www.merixstudio.com/blog/best-practices-rest-api-development/

https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9

https://medium.com/hashmapinc/rest-good-practices-for-api-design-881439796dc9

## restful api 공통 요구사항

경로 는 명사일것
복수형태일것
Content-Type 을 지정

적절한 STATUS code

페이지 네이션은 쿼리에 넣기
get method 검색 조건은 쿼리안에 넣기
get method 받을 놈의 필드 제한은 쿼리에 넣기

주소는 소문자일것
kebab case

Last-Modified 헤더 표시하기

캐시정책관련 문서 읽어보기

마자막 path는 동사를 허용??
마지막 에 / 금지
언도스코어 금지

파일확장자 사용 금지

무상태 일것

인증은 oauth2.0으로 구현

캐시가능할것 -> 이거는 좀 더 찾아보기

HTTPS일것

관련 보안 이슈 조사하기
https://restfulapi.net/security-essentials/

파일업로드 일때는 어떻게 보낼것인가?
