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

const SERVER_PORT = 8000;
const REFRESH_RATE = 25;

const X_STARTING_POS = 500;
const Y_STARTING_POS = 200;
const PLAYER_SPEED = 10;
const STARTING_DIR = 'down';
const STARTING_CHAR = 'warrior';
const MONGO_REPO = "Account";
const PROJECTILE_SPEED = 10;
const COOL_TIME = 60;

/*
const RPS = {
    PAPER: "Paper",
    SCISSOR: "Scissors",
    ROCK: "Rock"
};
*/
/**
 * Player 클래스
 */
 function Player(id, name, points) {
    this.type = 'player';
    this.x = X_STARTING_POS;
    this.y = Y_STARTING_POS;
    this.id = id;
    this.username = name;
    this.points = points;
    this.char = STARTING_CHAR;
    this.direction = STARTING_DIR;

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
            
    };

    this.addPoint = function () {
        this.points++;
    };

    this.shootBullet = function (){
        if(this.isShoot&&this.cooldown===0){
            let bullet = new Projectile(this.id,this.x,this.y,this.direction);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }
        
    };
    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
    }
};
/**
 * 투사체 클래스
 */
 function Projectile(playerId,posX,posY,direction) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=PROJECTILE_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 100) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
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
/**
 * 게임 서버 메인앱
 */

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
         onConnect(socket,userData.username,0);
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

         renderPack.push({
            type:'player',
            x: player.x,
            y:player.y,
            direction:player.direction,
         })
         
         playerPack.push({
             x: player.x,
             y: player.y,
             username: player.username,
             points: player.points,
             cooldown:player.cooldown,
             direction: player.direction,
             char: player.char
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
                     if (player.id != bullet.playerId)
                     playerList[bullet.playerId].addPoint();
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
                 direction:bullet.direction
             });
             
             
         }
     }
     
     
 
     for (let i in socketList) { //모든 플레이어에게 socket 전송
         let socket = socketList[i];
         //socket.emit('renderInfo', playerPack, bulletPack);
         socket.emit('renderInfo', playerPack,bulletPack);
         
     }
     

 }, REFRESH_RATE);
 
 
 function toAllChat(line) { //채팅시스템
     for (let i in socketList)
         socketList[i].emit('addToChat', line);
 }
 
 function onConnect(socket, name, points) {
 
     let player = new Player(socket.id, name, points);
     playerList[socket.id] = player; //playerList는 id 여러개를 가지는 객체. player객체를 저장함
 
     socket.on('keyPress', function (data) {   //glitchy character movement
         //player.direction = data.direction;
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
             
         if (data.inputId === 'shoot'&& playerList[socket.id] != null)
             player.isShoot=data.state;

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