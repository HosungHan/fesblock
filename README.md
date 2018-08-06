# FES BLOCK

> 서비스는 https://fesblock.herokuapp.com 에서 확인하실 수 있습니다.

## 프로젝트 목표

토큰 이코노미 기반의 게시판을 만들어 학회원들이 토큰을 인센티브로 다양한 정보를 공유할 수 있다.

## 서비스 기능

### 1. 로그인/학회원 인증

* 사용자는 구글 인증을 통해 계정 등록할 수 있다.
* 로그인 후 학회 기수 및 이름을 입력하면 미리 등록된 학회원 이메일로 인증메일이 발송된다.
* 인증메일에 링크를 클릭하면 인증이 완료된다.
* 인증이 완료된 학회원은 일정량의 토큰을 지급받는다.

### 2. 게시판 이용

## 기술 스택

### Front-end

* React, Redux
* axios
* web3js
* CSS Framework
  * [react-materialize](https://github.com/react-materialize/react-materialize)

### Back-end

* Solidity
* Nodejs, Express, MongoDB
* Passportjs
* Mongoose
* [mLab](https://mlab.com/)

### Deploy

* [heroku](https://www.heroku.com/)
