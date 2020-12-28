![](https://images.velog.io/images/perfumellim/post/6cddbbfc-cc4a-47b3-bf29-022b0e6ce5d6/coderoasters.png)

# CodeRoasters**프로젝트 소개**

---
 ![](https://images.velog.io/images/perfumellim/post/395e8ee3-e801-4f6f-bac2-568587bc438e/roasters.png)

- 개인의 커피취향을 분석해주고, 판매하는 커피원두쇼핑몰 [drinktrade](https://www.drinktrade.com/).
- 짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.
- 개발은 초기 세팅부터 전부 구현했습니다. 제한된 시간상, 커피퀴즈페이지, 원두상품리스트페이지, 원두상세페이지, 로그인, 회원가입  일부페이지만 구현하였습니다.

## 개발 인원 및 기간

- 개발기간 : 20 / 11 / 02 ~ 20 / 11 / 13
- 개발 인원
- Frontend : 김보현(PM), 임향수, 조연정, 조혜미
- Backend : 김동현, 민경민

# 적용 기술 및 구현 기능

---

## **적용 기술**

- Front-End : React.js, sass
- Back-End : Node.js, Prisma, Jest, Docker
- Common : Google social login, RESTful API

## 구현기능

## **공통**

- Navbar(임향수)
- Cart(김보현)

### Q**uiz Page(임향수)**

- map과 filter 메서드를 이용해 컴포넌트 재사용 및 특정 데이터만 호출
- fetch 함수와 state를 이용해 사용자의 답변을 배열에 저장해  백엔드에게 전송
- URL parameters를 활용한 동적 라우팅 구현

### Login Page(조혜미)

- 구글 소셜 로그인 api호출하여 구현
- 로그인 및 회원가입 validation 구현
- 로그인, 회원가입 tabs menu 기능 구현

### ProductList Page(조연정)

- 상품 다양한 카테고리별 필터와 최신순,가격순, 신상품순 sorting  api호출하여 구현
- 필터,솔팅 반영하여 pagination 구현

### ProductDetails Page(김보현)

- 디테일 페이지, 장바구니 컴포넌트 구현 
- 동적라우팅을 이용하여 상세페이지로 이동기능 구현

# Reference

---

- 이 프로젝트는 [drinktrade](https://www.drinktrade.com/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
