# 오픈소스 소프트웨어 프로젝트 4팀

# Magic Blocker

중앙서버 방식의 온라인 PvP 슈팅게임입니다.


# 사용된 모듈 및 라이브러리

- NodeJS (게임서버)
- ExpressJS (게임서버 라우터)
- socketIO (통신)
- p5.js (클라이언트 렌더링)
- gulp (빌드 자동화)
- forever.js (무중단 관리도구)

# 라이선스

MIT license

# 실행 

git clone을 받은 뒤, 게임서버를 실행하고, 웹브라우저로 localhost:8000 에 접속하면 게임을 플레이할 수 있습니다.
혹은, ``` http://43.200.4.220:8000/ ```
이 주소에 접속하시면 저희가 AWS를 이용해 서버에 올려놓은 게임에 접속하여 플레이 가능합니다.

### local에서 게임서버 실행 방법

1. https://nodejs.org/ko/download/ 에 들어가 본인 컴퓨터 버전에 맞게 node.js를 다운받아야 합니다.

2. 다운로드 받은 폴더에서 cmd 창을 열고 ``` npm install ``` 명령어를 이용해 node.js 모듈을 설치합니다.

3. 설치가 완료되었다면, ``` npm start ``` 명령어로 서버를 실행하고, 웹브라우저에서 localhost:8000 에 접속하여 게임을 플레이합니다.

### Ubuntu에서 게임서버 실행 방법
git clone [이 페이지의 주소]
sudo apt install nodejs
sudo apt install npm
sudo npm install nodemon
cd 2022-2-OSSProj-MagicBlocker-4
sudo npm install gulp
Server Started! localhost: 8000 가 뜨면 성공

서버가 작동하는 것을 확인하고 나면, forever 로 데몬으로 실행하도록 합니다.
npm install forever -g
forever start -w gameserver.js
forever list #list에 /usr/bin/node gameserver.js 가 뜨면 성공

설치한 웹서버의 IP주소 또는 도메인:8000 으로 접속하면 게임을 플레이 할 수 있습니다.

# 코드 예제 및 실제 적용 사례

### 코드 예제
서버를 실행하기 위한 app.js 코드

<img width="60%" src="https://user-images.githubusercontent.com/101885318/207306185-648ca272-125c-456b-9fb2-2bbee6971d22.png"/>

### 컴퓨터 버전 메인 화면
<img width="60%" src="https://user-images.githubusercontent.com/105405038/207366691-2e2bad70-e0cf-4c13-a300-2e08ae7af0a8.png"/>

### 컴퓨터 버전 플레이 화면
<img width="60%" src="https://user-images.githubusercontent.com/105405038/207366914-c52a67d2-0a64-4fe9-add3-71c1a94f92e4.png"/>

### 모바일 버전 메인 화면
<img width="25%" src="https://user-images.githubusercontent.com/105405038/207367249-9f256628-edb8-4ba2-aca4-7ca7f6937348.png"/>

### 모바일 버전 플레이 화면
<img width="25%" src="https://user-images.githubusercontent.com/105405038/207367350-29bc214e-b4d6-4d14-9a05-8ddf364772f0.png"/>

# 데모 영상 링크

https://youtu.be/KmoF2tQV6lw

# 레퍼런스

https://github.com/jojoee/blocker

https://github.com/bobboteck/JoyStick

# 연락처

- 전재호 -> email : sachim1379@gmail.com / TEL : 010-4821-1386 / Github : https://github.com/sprout88
- 류강현 -> email : fbrkdgus1101@gmail.com / TEL : 010-3817-8803 / Github : https://github.com/kh9486
- 백성욱 -> email : subaek0704@naver.com / TEL : 010-5195-6992 / Github : https://github.com/subaek0704

-----
