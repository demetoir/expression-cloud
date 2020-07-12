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
https://itnext.io/bulk-with-restfull-apis-7c5e6be84ed3
https://developers.shopware.com/developers-guide/rest-api/examples/article/
https://medium.com/paypal-engineering/batch-an-api-to-bundle-multiple-paypal-rest-operations-6af6006e002
http://apostolidis.me/bulk-operations/

https://florimond.dev/blog/articles/2018/08/restful-api-design-13-best-practices-to-make-your-users-happy/

https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

https://blog.restcase.com/5-basic-rest-api-design-guidelines/

## restful api 공통 요구사항

- 주소 형식

  - origin 주소는 api.domain
  - version number 는 int type
  - full url example
    - ex) put api.expression_cloud.com/v1/users/123/profile_image
  - 주소는 소문자일것
  - kebab case
    - ex) updated-at
  - 경로는 명사일것
  - collection 이름은 복수형
    - ex) /users/1234
  - flatten url

    - bad GET: /authors/12/articles/
    - good GET: /articles/?author_id=12

  - resource 에 action 을 줘야하는경우

    - ex)

    ```
    expression 의 공유 옵션을 변경하는경우 두가지 생각할수있다.

    ??? /expressions/{expressionId}/actions/share

    -> 이경우는 메소드를 뭐로 줘야하나..put? patch? post?

    ===
    patch /expressions/{expressionId}/setting
    -> 이경우는 리소스 데이터에 접근하기 때문에 위와 동

    ```

  - 마지막 에 / 금지
    ex) 잘못된 형식: /expression/1234/

  - 파일확장자 사용 금지
    ex) 잘못된 형식: /users/1234/profile_image.jpg

* query parameter 형식

  - 검색시 옵션 종류는 filter, sort, pagination 이 3종류뿐이므로 모든 리소스에 대한 검색은 이 3가지 옵션의 조합으로 만들면된다
  - 검색 기본 옵션은 query 로 처
    - offset
    - limit
    - sort
      - ...?sort=id:desc
  - pretty=true

  - get method 검색 조건은 q parameter 로 처리

    - ex) ....?q=name+

  - get method 받을 놈의 필드 제한은 쿼리에 넣기
    - field=users.id,users.content,....
    - https://docs.oracle.com/en/cloud/saas/commerce-cloud/occ-developer/rest-api-query-parameters.html

* 헤더

  - Last-Modified 헤더 표시하기
  - Content-Type 을 지정
  - 적절한 STATUS code

* 캐싱

  - 캐시정책관련 문서 읽어보기
  - 캐시가능할것 -> 이거는 좀 더 찾아보기
  - etag vs last modified

* 보안

  - HTTPS일것
  - 인증은 oauth2.0으로 구현
  - 관련 보안 이슈 조사하기
  - https://restfulapi.net/security-essentials/

* 파일업로드시
  - resource의 하위 url로 설정
    - ex) post /users/1234/profile_image
* REST
  - 무상태

- bulk or batch operation 처리

  - 일단 여러개 처리하는경우 url 주소 부터 정하는게 다양함
    - ex)
      /async/bulk/v1/users
      /v1/users/bulk
  - 헤더에서 넣는놈도 있다..

  - one fail all fail or one fail ignore 둘중 하나 선택해야
  - 에러처리가 개별로 되어야한다
  - 그냥 지원 안하는것이 더 좋을지
  - post 로 보내고, body에 메소드 까지 따로 따로 넣는 방법도 있다
    - https://docs.oracle.com/en/cloud/saas/applications-common/20b/farca/op-hcmrestapi-scim-bulk-post.html
  - 어쨌든 이경우 처리가 길기 때문에 비동기 처리해야
  - 배치 처리시 크기 제한도 고려해야

options???
head???

## resource model and endpoint

### teams

get /teams
post /teams
get /teams/{teamId}
put /teams/{teamId}
delete /teams/{teamId}
patch /teams/{teamId}

### collections

get /collections
post /collections
get /collections/{collectionId}
put /collections/{collectionId}
delete /collections/{collectionId}
patch /collections/{collectionId}

### notices

get /notices
post /notices
get /notices/{noticeId}
patch /notices/{noticeId}
delete /notices/{noticeId}

post /notices/{noticeId}/actions/read
post /notices/{noticeId}/actions/undo-read

### expressions

get /expressions
post /expressions
get /expressions/{expressionId}
put /expressions/{expressionId}
patch /expressions/{expressionId}
delete /expressions/{expressionId}

post /expressions/{expressionId}/actions/fork
post /expressions/{expressionId}/actions/like
post /expressions/{expressionId}/actions/undo-like

get /expressions/{expressionId}/setting
put /expressions/{expressionId}/setting
patch /expressions/{expressionId}/setting

임베디드 리소스면 그냥 집어넣는게 더 좋을듯

### images

type by user profile, expression thumbnail, team profile image

get /images
post /images
get /images/{imageId}
put /images/{imageId}
patch /images/{imageId}
delete /images/{imageId}

리소스가 상속관계라면 그냥 하나로 통일하고 type 으로 처리하는것이 더 좋을듯

post /users/{userId}/actions/like
post /users/{userId}/actions/undo-like

get /users/{userId}/setting
put /users/{userId}/setting
patch /users/{userId}/setting

### comments

get /comments
post /comments
get /comments/{commentId}
put /comments/{commentId}
patch /comments/{commentId}
delete /comments/{commentId}

### vectors

get /vectors
post /vectors
get /vectors/{vectorId}
put /vectors/{vectorId}
patch /vectors/{vectorId}
delete /vectors/{vectorId}

### scalars

get /scalars
post /scalars
get /scalars/{scalarId}
put /scalars/{scalarId}
patch /scalars/{scalarId}
delete /scalars/{scalarId}

### histories

type= scalar, vector

get /histories
get /histories/{historyId}

### tags

get /tags
post /tags
get /tags/{tagId}
put /tags/{tagId}
patch /tags/{tagId}
delete /tags/{tagId}

### auth

post /auth/login
post /auth/sign-in
get /auth/who-am-i
get /auth/token

## body scheme

{
meta:{

    },
    data:{

    },
    errorCode:1234,
    error: "error",
    message: ""

}

## query scheme

fields
q
include
offset
limit
order
