# RoadMaker

로드메이커는 누구나 학습 로드맵을 만들고, 공유할 수 있는 플랫폼 입니다. 현재 전체 리팩토링 과정중에 있습니다.

![image](https://github.com/road-maker/road-maker-spring/assets/60874549/9bcc467d-9963-48c1-9e61-afb6722c7bff)

본 문서는 RoadMaker의 프론트엔드에 초점을 맞춰 작성됐습니다. [👉 백엔드 문서](https://github.com/road-maker/road-maker-spring)

## 목차
1. [프로젝트 개요](#overview)
2. [서비스 소개](#intro)
3. [화면 구성](#screen)
4. [커밋 컨벤션](#commit-convention)


<a id="overview"></a>
## 1. 프로젝트 개요

### 1.1. 기술 스택
- 기술: React, Tanstack Query, Styled components
- 라이브러리 : dagrejs, mantine, tiptap, axios
- 빌드, 배포: Github Actions

### 1.2. 팀원
- [강원영](https://github.com/onezerokakng)(팀장/BE)
- [표혜민](https://github.com/pyotato)(FE)
- [박주영](https://github.com/dearmysolitude)(BE)
- [전서인](https://github.com/Seo1n)(FE)
- [임희호](https://github.com/HH981010)(BE)

### 1.3. 시연 연상

<!--
[바로 가기](http://roadmaker.site)

- demo 계정: test@test.com
- demo 계정 비밀번호: test1234!
-->
- 시연 연상: https://youtu.be/RqMJgGFdEws?feature=shared

<a id="intro"></a>
## 2. 서비스 소개

프로그래머가 되고 싶어하는 사람들은 "로드맵"이나 "커리큘럼"이라는 키워드로 자료를 검색합니다.

이러한 정보가 모여있는 "[developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)" 리포지토리가 24만 개의 star를 받은 것은 이러한 수요를 잘 보여주는 예입니다.

하지만, 기존의 로드맵을 사용하다 보면 '나도 로드맵을 만들어보고 싶다내가 만든 로드맵을 다른 사람과 공유하고 싶다'는 생각이 들게 됩니다.

이런 필요성에 응답하여, "RoadMaker"를 개발하게 되었습니다.

RoadMaker는 사용자가 자신만의 개발 로드맵을 쉽게 만들고 공유할 수 있는 플랫폼입니다.

### 2.1. 주요 기능

1. 로드맵 자동 생성
   - GPT API를 이용하여 로드맵 초안을 자동 생성합니다.
2. 로드맵 참여 및 진행
   - 로드맵에 참여하고 진행도를 업데이트 할 수 있습니다.
3. 댓글 작성
   - 로드맵에 대해 궁금한 내용을 댓글을 달아 질문할 수 있습니다.
4. 검색 기능
   - 원하는 로드맵을 검색을 통해 찾을 수 있습니다.

<a id="screen"></a>
## 3. 화면 구성

1. 메인 화면
   - infinitescroll로 페이지를 스크롤할 경우 추가적으로 게시물을 볼 수 있도록 구현했습니다.
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/05e1c708-df8d-432a-b384-bee3b6ca248e"/>
2. 회원일 경우, 화면 우측 상단 [로드맵 생성] 버튼을 클릭 시, chatgpt api를 활용해 로드맵 템플릿을 자동 생성할 수 있는 키워드 입력 모달을 구현했습니다.
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/c0ea5085-edd4-4969-8fde-7c555710c788"/>
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/e3d97f26-d07f-447c-8493-faf79a3e3812"/>
3. 로드맵 생성 페이지
   - chatgpt api로 로드맵 탬플릿을 생성하고나사, 내용 수정이나 추가를 위한 에디터 페이지입니다.
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/51911354-ecb3-4036-a034-c9188bb2dab5"/>
4. 로드맵 노드의 상세내용을 수정할 수 있는 모달
   - tiptap 라이브러리를 활용해 마크다운 문법, 이미지, 링크등의 상세 내용들을 수정할 수 있습니다.
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/90f01fc3-99d3-4d79-8710-c3bf1ec5be49"/>
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/ce91b920-f3f2-4056-aa29-128a8f0ea7ca"/>
5. 로드맵 상세 페이지
   - 완성한 로드맵 게시물 화면입니다. 상세 내용은 drawer 형태로, 노드를 클릭 시 확인 가능합니다.
   - 진행상황을 클릭하면 노드 상태가 완료 상태로 반영됩니다.
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/8d146526-17c4-4fb5-9fad-9edf012fc382"/>
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/edfab319-8cdd-4b20-b0c9-a622246f28a4"/>
6. 로드맵 검색창
   - 키워드로 특정 로드맵을 검색할 수 있습니다. (예시: 자바스크립트)
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/2de8a697-dd46-4595-90af-7fd4639d46a8"/>
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/7264bd1e-5040-4e7c-906e-f128b6b51c7e"/>
7. 로드맵 댓글 모달
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/c1307687-c8ae-4ca6-aad3-3c7f123e2211"/>
   <img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/79835cff-3c4e-46d3-aa29-75b4de099f4f"/>
8. 마이페이지
     - 진행 중인 로드맵과 내가 만든 로드맵을 확인할 수 있는 페이지 입니다.
<img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/951077ab-cdf9-44dc-8116-2f1a6ad0513a"/>
<img width="813" alt="image" src="https://github.com/road-maker/road-maker-react-typescript/assets/102423086/53a48ca6-e077-46b0-ba5a-d7159f437d68"/>

[//]: # (<a id="poster"></a>)

[//]: # (## 5. 프로젝트 포스터)

[//]: # (![ROADMAKER POSTER]&#40;https://github.com/road-maker/road-maker-spring/assets/60874549/03e43fc1-e4ed-46ed-8330-d74cd11ff934&#41;)

<a id="commit-convention"></a>
## 4. 커밋 컨벤션

본 프로젝트에서는 AngularJS commit Convention을 채택했습니다.

> [#이슈 번호] 이슈 타입: 커밋 메시지

### 4.1. 타입 목록

Type | Description
-- | --
Feat | 새로운 기능 추가
Fix | 버그 수정 또는 typo
Refactor | 리팩토링
Design | CSS 등 사용자 UI 디자인 변경
Comment | 필요한 주석 추가 및 변경
Style | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우(함수/변수명 변경은 포함)
Test | 테스트(테스트 코드 추가/수정/삭제), 테스트 리팩토링
Perf | 성능 개선
Init | 프로젝트 초기 생성
Rename | 파일 혹은 폴더명을 수정하거나 옮기는 경우
Remove | 파일을 삭제하는 작업만 수행하는 경우
Docs | 문서 작업, 수정
Build | 빌드 관련 파일 수정
CI | CI 관련 설정 수정



