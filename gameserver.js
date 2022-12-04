<<<<<<< HEAD:completeApp.js
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/**
<<<<<<< HEAD
 * 서버에서 사용되는 상수 모음
=======
 * Created by wilso on 2018-02-03.
>>>>>>> 3b060cf ([22.11.14,백성욱](Feat) 로그인창 CSS 편집)
=======
/**
 * 서버에서 사용되는 상수 모음
>>>>>>> d3c8e1e ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
=======
/**
 * 서버에서 사용되는 상수 모음
>>>>>>> c1d7b4d ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
 */

const SERVER_PORT = 8000;
const REFRESH_RATE = 25;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const X_STARTING_POS = 500;
const Y_STARTING_POS = 200;
=======
const X_STARTING_POS = 100;
const Y_STARTING_POS = 100;
>>>>>>> 3b060cf ([22.11.14,백성욱](Feat) 로그인창 CSS 편집)
=======
const X_STARTING_POS = 500;
const Y_STARTING_POS = 200;
>>>>>>> d3c8e1e ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
=======
const X_STARTING_POS = 500;
const Y_STARTING_POS = 200;
>>>>>>> c1d7b4d ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
const PLAYER_SPEED = 10;
const STARTING_DIR = 'down';
const MONGO_REPO = "Account";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const PROJECTILE_SPEED = 10;
=======
>>>>>>> b3c46f4 ([22.11.15,전재호] 프론트엔드 수정, 로그인창 애니메이션)

=======
>>>>>>> 3b060cf ([22.11.14,백성욱](Feat) 로그인창 CSS 편집)
=======
const PROJECTILE_SPEED = 10;

>>>>>>> d3c8e1e ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
=======
const PROJECTILE_SPEED = 10;

>>>>>>> c1d7b4d ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
/*
const RPS = {
    PAPER: "Paper",
    SCISSOR: "Scissors",
    ROCK: "Rock"
};
*/
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
/**
 * Created by wilson on 2018-02-03.
 */
var Bullet = function (playerId,posX,posY,direction) {
    var bullet = {
        id: Math.random(),
        x: posX + 25,
        y: posY + 25,
        playerId: playerId,
        direction: direction,
        speed: 10,
        timer: 0,
        toRemove: false,
    };

    bullet.update = function(){
        bullet.updatePosition();
        if (bullet.timer++ > 100)
        bullet.toRemove = true;
    };

    bullet.updatePosition = function(){
    if (bullet.direction === 'right')
        bullet.x += bullet.speed;
    else if (bullet.direction === 'left')
        bullet.x -= bullet.speed;
    else if (bullet.direction === 'up')
        bullet.y -= bullet.speed;
    else if (bullet.direction === 'down')
        bullet.y += bullet.speed;
    };

    return bullet;
}
/**
 * Created by wilson on 2018-02-03.
 */
var Player = function (id, name, points) {
    var player = {
        x: X_STARTING_POS,
        y: Y_STARTING_POS,
        id: id,
        username: name,
        points: points,
        char: 'warrior',

        rightPress: false,
        leftPress: false,
        upPress: false,
        downPress: false,
        lastPosition: STARTING_DIR,

        speed: PLAYER_SPEED
    };

    player.updatePosition = function () {
        if (player.rightPress)
            player.x += player.speed;
        if (player.leftPress)
            player.x -= player.speed;
        if (player.upPress)
            player.y -= player.speed;
        if (player.downPress)
            player.y += player.speed;
    };

    player.addPoint = function () {
        player.points++;
    };

    player.shootBullet = function (){
        var bullet = Bullet(player.id,player.x,player.y,player.lastPosition);
        bulletList[bullet.id] = bullet;
    };

    return player;
};


>>>>>>> 3b060cf ([22.11.14,백성욱](Feat) 로그인창 CSS 편집)
=======
>>>>>>> d3c8e1e ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
=======
>>>>>>> c1d7b4d ([22.11.17,백성욱(feat) 윈도우 크기 조절 시 캐릭터 위 글씨 작아지는 문제 해결])
=======
>>>>>>> b472a18 ([22.11.20,백성욱](feat)분리형 로그인 UI)
=======
/**
 * 서버에서 사용되는 상수 모음
 */
>>>>>>> a880002 ([22.11.23,전재호] completeApp gulp에 Constants가 포함되지않는 이슈있음)
=======
//
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// 서버에서 사용되는 상수
//
<<<<<<< HEAD
>>>>>>> 07bc5e4 ([22.11.26,전재호](refector) completeApp에서, 직관적으로 gameserver로 서버메인앱 이름 변경):gameserver.js

=======
>>>>>>> 164a3cf ([22.11.28,전재호](refector 전체 코드 클래스 화 완료)
=======
// 서버에서 사용되는 상수
//
>>>>>>> c39ff9d ([22.11.28,백성욱](feat) 창 크기에 따라 캐릭터, 불렛 사이즈 변경)
=======
// 서버에서 사용되는 상수
//
>>>>>>> c06a646 ([22.11.28,전재호](feat) 새로운 스프라이트 추가(스킬 및 직업 설계 위해 두개 이상 추가함))
=======
// 서버에서 사용되는 상수
//
>>>>>>> 02279bb ([22.12.05,전재호](feat) 이름없이 접속했을때 사용자(id)가 뜨도록 수정)
=======
// 서버에서 사용되는 상수
//
>>>>>>> 9200ee8 ([22.12.05,전재호](fix) 체력 추가, 다른 직업의 bullet image가 보이는 오류 fix)
=======
// 서버에서 사용되는 상수
//
>>>>>>> 40bd454 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
=======
// 서버에서 사용되는 상수
//
>>>>>>> 6ead583 ([22.12.05,전재호](feat) 초록 빨강 색깔로 살았는지 죽었는지 확인가능한 기능 추가, 플레이어리스트 overflow)
 const SERVER_PORT = 8000;
 const REFRESH_RATE = 25;
 
 const X_STARTING_POS = 30;
 const Y_STARTING_POS = 30;
 const PLAYER_SPEED = 10;
 const STARTING_DIR = 'down';
 const STARTING_CHAR = 'warrior';
 const MONGO_REPO = "Account";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 const PROJECTILE_SPEED = 10;
=======
 const BULLET_SPEED = 20;
>>>>>>> 589cd40 ([22.12.05,전재호] 캐릭터 선택을 클라이언트의 client_data와 서버의 pack에 전달하고, 캐릭터와 총알을 client_data의 char에 맞게 렌더링. char은 직업명)
 const COOL_TIME = 60;
=======
=======
>>>>>>> 40bd454 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
=======
>>>>>>> 6ead583 ([22.12.05,전재호](feat) 초록 빨강 색깔로 살았는지 죽었는지 확인가능한 기능 추가, 플레이어리스트 overflow)
 const BULLET_SPEED = 20;

 const COOL_TIME = 20;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ae06adc ([22.12.05,전재호])(feat) ghost관전기능 추가, hit함수 오류 fix)
=======
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;
const MAP_PAD = 100;
>>>>>>> 7ea989a ([22.12.05,전재호](feat) 모바일과 pc에서 동일하게 보이도록 캔버스를 정사각형으로 수정)
//
<<<<<<< HEAD
=======
>>>>>>> 4c8b77a ([22.11.28,전재호](remove) 레거시 코드 제거)
=======
>>>>>>> c39ff9d ([22.11.28,백성욱](feat) 창 크기에 따라 캐릭터, 불렛 사이즈 변경)
=======
 const BULLET_SPEED = 20;
 const COOL_TIME = 30;
//
>>>>>>> c06a646 ([22.11.28,전재호](feat) 새로운 스프라이트 추가(스킬 및 직업 설계 위해 두개 이상 추가함))
=======
>>>>>>> 93beecf ([22.12.05,전재호](feat) ui선택창에 저작권을 회피하는 이름 추가)
=======
 const BULLET_SPEED = 20;
 const COOL_TIME = 60;
//
>>>>>>> 02279bb ([22.12.05,전재호](feat) 이름없이 접속했을때 사용자(id)가 뜨도록 수정)
=======
>>>>>>> ccf679c ([22.12.05,전재호](feat) UI위치 수정, 조작법 삭제, placeholder 폰트 키움, 선택한 캐릭터 보여주는 기능 추가)
=======
 const BULLET_SPEED = 20;
 const COOL_TIME = 20;
//
>>>>>>> 9200ee8 ([22.12.05,전재호](fix) 체력 추가, 다른 직업의 bullet image가 보이는 오류 fix)
=======
>>>>>>> ff4ac33 ([22.12.05,전재호](feat) 접속자 표시 기능 추가)
=======
//
>>>>>>> 40bd454 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
=======
>>>>>>> 502e498 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
=======
//
>>>>>>> 6ead583 ([22.12.05,전재호](feat) 초록 빨강 색깔로 살았는지 죽었는지 확인가능한 기능 추가, 플레이어리스트 overflow)
//Bullet.js
//투사체 클래스
 function Bullet(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    this.damage=20;
    damage=this.damage;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        player.hp -= damage;
    }
}
//
//Player.js
//플레이어 클래스
 function Player(id, name, char) {
    this.type = 'player';
    //게임 시작 시 고정된 위치에서 플레이어가 소환
    //this.x = X_STARTING_POS;
    //this.y = Y_STARTING_POS;
    this.x = Math.random()*1000;
    this.y = Math.random()*500;
    this.id = id;
    this.username = name;
    this.char = char;//bullet에게 전달. bullet을 쏜 주인이 누구인지 가리킴
    this.direction = STARTING_DIR;
    this.hp=100;
    this.isalive=true;
    isalive = this.isalive;


    this.cooldown = 0;

    this.rightPress = false;
    this.leftPress=false;
    this.downPress=false;
    this.upPress=false;
    this.isShoot=false;
    
    this.speed=PLAYER_SPEED;
    
    this.updatePosition = function () {
        
        if (this.rightPress){
            this.x += this.speed;
            this.direction='right';
            //console.log('right!!!')
        }                
        else if (this.leftPress){
            this.x -= this.speed;
            this.direction='left';
            //console.log('left!!!')
        }   
        else if (this.upPress){
            this.y -= this.speed;
            this.direction='up';
            //console.log('up!!!')
        }
        else if (this.downPress){
            this.y += this.speed;
            this.direction='down';
            //console.log('down!!!')
        }
        if(this.x<0){
            this.x+=this.speed;
        }
        if(this.x>MAP_WIDTH-MAP_PAD){
            this.x-=this.speed;
        }
        if(this.y<0){
            this.y+=this.speed;
        }
        if(this.y>MAP_HEIGHT-MAP_PAD){
            this.y-=this.speed;
        }
    };


    this.shootBullet = function (){
        if(this.isShoot&&this.cooldown===0&&this.isalive===true){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,this.char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }

        /*류강현 클래스 투사체 코드 
        if(this.isShoot&&this.cooldown===0&&char=="ako"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="ashe"){
            let bullet = new Ashe(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="buzzi"){
            let bullet = new Buzzi(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="dad"){
            let bullet = new Dad(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="ezreal"){
            let bullet = new Ezreal(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="kitty"){
            let bullet = new Kitty(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="monk"){
            let bullet = new Monk(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="pepe"){
            let bullet = new Pepe(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="santa"){
            let bullet = new Santa(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="soldier"){
            let bullet = new Soldier(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="zed"){
            let bullet = new Zed(this.id,this.x,this.y,this.direction,host_char);

        if(this.isShoot&&this.cooldown===0){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,this.char);
<<<<<<< HEAD
>>>>>>> 9200ee8 ([22.12.05,전재호](fix) 체력 추가, 다른 직업의 bullet image가 보이는 오류 fix)
=======
>>>>>>> ae06adc ([22.12.05,전재호])(feat) ghost관전기능 추가, hit함수 오류 fix)
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }
        */
        
        
        
    };

    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
    }

<<<<<<< HEAD
<<<<<<< HEAD

};
//
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> ae06adc ([22.12.05,전재호])(feat) ghost관전기능 추가, hit함수 오류 fix)
    this.die = function(){
        this.isalive=false;
        this.char='ghost';
    }
<<<<<<< HEAD
=======

>>>>>>> ae06adc ([22.12.05,전재호])(feat) ghost관전기능 추가, hit함수 오류 fix)
};
//
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 9200ee8 ([22.12.05,전재호](fix) 체력 추가, 다른 직업의 bullet image가 보이는 오류 fix)
=======
=======
>>>>>>> 502e498 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
// 서버에서 사용되는 상수
//
 const SERVER_PORT = 8000;
 const REFRESH_RATE = 25;
 
 const X_STARTING_POS = 30;
 const Y_STARTING_POS = 30;
 const PLAYER_SPEED = 10;
 const STARTING_DIR = 'down';
 const STARTING_CHAR = 'warrior';
 const MONGO_REPO = "Account";
 const BULLET_SPEED = 20;

 const COOL_TIME = 20;

//
<<<<<<< HEAD
>>>>>>> ff4ac33 ([22.12.05,전재호](feat) 접속자 표시 기능 추가)
=======
>>>>>>> 40bd454 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
=======
>>>>>>> 502e498 ([22.12.05,전재호](feat) 불필요한 참조관계 제거하고 상수화)
=======
>>>>>>> 6ead583 ([22.12.05,전재호](feat) 초록 빨강 색깔로 살았는지 죽었는지 확인가능한 기능 추가, 플레이어리스트 overflow)
//Ako.js
//직업 클래스

function Ako(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
<<<<<<< HEAD
//
//Ashe.js
//직업 클래스

function Ashe(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Buzzi.js
//직업 클래스

function Buzzi(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Dad.js
//직업 클래스

function Dad(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Ezreal.js
//직업 클래스

function Ezreal(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Kitty.js
//직업 클래스

function Kitty(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Monk.js
//직업 클래스

function Monk(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Pepe.js
//직업 클래스

function Pepe(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Santa.js
//직업 클래스

function Santa(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Soldier.js
//직업 클래스

function Soldier(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Zed.js
//직업 클래스

function Zed(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED+150;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 1) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
<<<<<<< HEAD
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
=======
=======
>>>>>>> ccf679c ([22.12.05,전재호](feat) UI위치 수정, 조작법 삭제, placeholder 폰트 키움, 선택한 캐릭터 보여주는 기능 추가)
// 서버에서 사용되는 상수
//
 const SERVER_PORT = 8000;
 const REFRESH_RATE = 25;
 
 const X_STARTING_POS = 30;
 const Y_STARTING_POS = 30;
 const PLAYER_SPEED = 10;
 const STARTING_DIR = 'down';
 const STARTING_CHAR = 'warrior';
 const MONGO_REPO = "Account";
 const BULLET_SPEED = 20;
 const COOL_TIME = 60;
<<<<<<< HEAD
>>>>>>> 93beecf ([22.12.05,전재호](feat) ui선택창에 저작권을 회피하는 이름 추가)
=======
//
//Ashe.js
//직업 클래스

function Ashe(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
=======
>>>>>>> ae06adc ([22.12.05,전재호])(feat) ghost관전기능 추가, hit함수 오류 fix)
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Buzzi.js
//직업 클래스

function Buzzi(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Dad.js
//직업 클래스

function Dad(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Ezreal.js
//직업 클래스

function Ezreal(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Kitty.js
//직업 클래스

function Kitty(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Monk.js
//직업 클래스

function Monk(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Pepe.js
//직업 클래스

function Pepe(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Santa.js
//직업 클래스

function Santa(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Soldier.js
//직업 클래스

function Soldier(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
//
//Zed.js
//직업 클래스

function Zed(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };
}
>>>>>>> 9200ee8 ([22.12.05,전재호](fix) 체력 추가, 다른 직업의 bullet image가 보이는 오류 fix)
//
=======
>>>>>>> 02279bb ([22.12.05,전재호](feat) 이름없이 접속했을때 사용자(id)가 뜨도록 수정)
=======
//
>>>>>>> ccf679c ([22.12.05,전재호](feat) UI위치 수정, 조작법 삭제, placeholder 폰트 키움, 선택한 캐릭터 보여주는 기능 추가)
//onConnect.js
//
function onConnect(socket, userData) {
 
    let player = new Player(socket.id,userData.username,userData.char);
    playerList[socket.id] = player; //playerList는 id 여러개를 가지는 객체. player객체를 저장함

    socket.on('keyPress', function (data) {   //glitchy character movement

        //player.direction = data.direction;
        //키보드 조작
        if (data.inputId === 'right'){
           player.rightPress = data.state;
            //player.direction = 'right';
        }else if (data.inputId === 'left'){
           player.leftPress = data.state;
            //player.direction='left';
        }else if (data.inputId === 'up'){
           player.upPress = data.state;
            //player.direction='up';
        }else if (data.inputId === 'down'){
           player.downPress = data.state;
            //player.direction='down';
        }
        
        //모바일 조이스틱은 취소버튼이 없기때문에, 키보드와 다른 event로 움직임 고정현상을 방지하였다.
        if (data.inputId === 'joy_right'){
           player.leftPress=false;
           player.upPress=false;
           player.downPress=false;
           player.rightPress = data.state;
            //player.direction = 'right';
        }else if (data.inputId === 'joy_left'){
           player.rightPress=false;
           player.upPress=false;
           player.downPress=false;
           player.leftPress = data.state;
            //player.direction='left';
        }else if (data.inputId === 'joy_up'){
           player.leftPress=false;
           player.rightPress=false;
           player.downPress=false; 
           player.upPress = data.state;
            //player.direction='up';
        }else if (data.inputId === 'joy_down'){
           player.leftPress=false;
           player.upPress=false;
           player.rightPress=false; 
           player.downPress = data.state;
            //player.direction='down';
        }else if (data.inputId==='joy_stop'){
           player.leftPress=false;
           player.upPress=false;
           player.rightPress=false; 
           player.downPress =false;
        }

        if (data.inputId === 'shoot'&& playerList[socket.id] != null){
           player.isShoot=data.state;
           if(player.isShoot){
               setTimeout(()=>{player.isShoot=false},50);//모바일은 버튼업이 없기때문에, 공격을 토글하는 코드
           }
        }
   
            
       });

    socket.on('sendMsgToServer', function (data) {
        let playerName = ("" + player.username);
        toAllChat(playerName + ': ' + data);
    });

    socket.on('kms', function () {
        if (playerList[socket.id] != null) {
            delete playerList[socket.id];
        }
    });

    socket.on('revive', function () {
        if (playerList[socket.id] == null) {
            playerList[socket.id] = player;
        }
    });

    socket.on('charUpdate', function (data) {
        player.char = data.charName;
    });
}
//
//toAllChat.js
//
function toAllChat(line) { //채팅시스템
    for (let i in socketList)
        socketList[i].emit('addToChat', line);
}
//
// 게임 서버 메인 앱
//
let express = require('express');
const ThenPromise = require('promise');
 let app = express();
 let server = require('http').Server(app);
 let io = require('socket.io')(server, {});
 
 let promise = require('promise');
 
 app.get('/', function (req, res) {
     res.sendFile(__dirname + '/client/index.html');
 });
 
 app.use('/client', express.static(__dirname + '/client'));
 
 server.listen(process.env.PORT || SERVER_PORT);
 
 console.log('Server Started! localhost: ' + SERVER_PORT);
 
 //전역 객체 리스트. 서버에서 접속자, 플레이어, 투사체 객체를 보관하고, pop push함
 let socketList = {};
 let playerList = {};
 let bulletList = {};
 
 
 io.sockets.on('connection', function (socket) {
 
     socket.id = Math.random();
     socketList[socket.id] = socket;
     console.log("Socket " + socket.id + " has connected");
 
     socket.on('signIn',function (userData){
         onConnect(socket,userData);
     });
 
     socket.on('disconnect', function () {
         if (socketList[socket.id] != null) {
             delete socketList[socket.id];
             console.log(socket.id + " has disconnected");
         }
         let player = playerList[socket.id];
         if (player != null) {
 
             toAllChat(player.username + " has disconnected.");
 
             let query = {
                 username: player.username
             };
             delete playerList[socket.id];
         }
     });
 });
 
 setInterval(function () {

    let renderPack = [];

    let playerPack = [];
 
     for (let i in playerList) {
         let player = playerList[i];

         player.updatePosition();
         player.shootBullet();
         player.updateCooldown();

         /*
         renderPack.push({
            type:'player',
            x: player.x,
            y:player.y,
            direction:player.direction,
         })
         */
         
         playerPack.push({
             x: player.x,
             y: player.y,
             username: player.username,
             cooldown:player.cooldown,
             direction: player.direction,
             char: player.char,
             hp:player.hp,
             isalive:player.isalive,
         });
         
         
     }
 
     let bulletPack = [];
 
     for (let i in bulletList) {
 
         if (bulletList[i].toRemove === true) {
             delete bulletList[i];
         }
         else{
             let bullet = bulletList[i];
             bullet.update();
             
             for (let i in playerList) {
                 let player = playerList[i];
                 
                 if (bullet.x > player.x && bullet.x < player.x + 50 && bullet.y > player.y && bullet.y < player.y + 60){
                     if (player.id != bullet.playerId){
                        //playerList[bullet.playerId].addPoint();   
                        bullet.hit(player);
                     }
                     
                 }
                 if(player.hp<0){
                    player.die();
                 }
             }
             /*
             renderPack.push({
                type:'bullet',
                x: bullet.x,
                y:bullet.y,
                direction:bullet.direction,
             })
             */
            
             bulletPack.push({
                 x: bullet.x,
                 y: bullet.y,
                 playerId: bullet.playerId,
                 direction:bullet.direction,
                 char:bullet.char
             });
             
             
         }
     }
     
     
 
     for (let i in socketList) { //모든 플레이어에게 socket 전송
         let socket = socketList[i];
         //socket.emit('renderInfo', playerPack, bulletPack);
         socket.emit('renderInfo', playerPack,bulletPack);
         
     }
    
 }, REFRESH_RATE);
 
 
 
 
 