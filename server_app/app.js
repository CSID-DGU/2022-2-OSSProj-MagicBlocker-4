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
 //
 //