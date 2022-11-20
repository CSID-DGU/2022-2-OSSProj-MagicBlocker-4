console.log('로딩중');
setTimeout(function(){
    console.log('로딩완료');
    var socket = io();

var signDiv = document.getElementById('signDiv');
var signDivUser = document.getElementById('signDiv-user');
var signDivPass = document.getElementById('signDiv-pass');
var signDivSignIn = document.getElementById('signDiv-signIn');
var signDivSignUp = document.getElementById('signDiv-signUp');
//var kmsButton = document.getElementById('kms-button');
//var reviveButton = document.getElementById('revive-button');
//var timeStamp = document.getElementById('timeStamp');
var playerListDisplay = document.getElementById('player-list');

let accessButton = document.getElementById('access');

var charImg = new Image();
//charImg.src = 'client/sprites/warrior.png';

//상하좌우의 플레이어 이미지가 다르므로, 상하좌우가 붙어있는 200*60px 의 캐릭터 이미지를 잘라서 씀
//imgFrameIndex를 기준으로 canvas가 이미지를 상하좌우를 기준으로 잘라서 가져옴
//크기를 70으로 키우고, 정사각형으로 바꾸었음.
var imgFrameIndex = 100;
var imgWidth = 100;
var imgHeight = 100;


accessButton.onclick = function(){
  //alert("access!");
  //socket.emit('access');
  signDiv.style.display='none';
  gameDiv.style.display='inline-block';

  socket.emit('signIn', { username: signDivUser.value.trim()});
};
/*
kmsButton.onclick = function () {
    socket.emit('kms');
};
*/
/*
reviveButton.onclick = function () {
    socket.emit('revive');
};
*/

/* 채팅방 기능
var chatText = document.getElementById('chat-text');
var chatForm = document.getElementById('chat-form');
var chatInput = document.getElementById('chat-input');
*/

var canvas = document.getElementById('myCanvas').getContext("2d"); 
//게임화면 캔버스 크기를 window크기에 맞춰서 자동변환.
canvas.canvas.width = window.innerWidth;
canvas.canvas.height = window.innerHeight;
//게임화면 크기를 조절하면, 이벤트가 발생해서, 이벤트가 발생했을 때만 다시 캔버스 크기를 조정한다(윈도우 크기로)
//브라우저 크기를 늘렸다 줄이면 캔버스크기가 맞게 변화한다.(Auto Scaling)
window.addEventListener("resize",()=>{
    canvas.canvas.width = window.innerWidth;
    canvas.canvas.height = window.innerHeight;
    canvas.font = '30px Arial';
});


//canvas로 렌더링작업(이미지 불러오기 등)을 하려면 getContext를 2d로 지정해야한다.
//p5.js 로 교체하고나면 필요없는 코드.
canvas.font = '30px Arial';

/*
socket.on('addToChat', function (data) {
    chatText.innerHTML += '<div>' + data + '</div>';
    chatText.scrollTop = chatText.scrollHeight;
});

function inTextField(event) {
    var elem = event.target || event.srcElement;
    if (elem.nodeType == 3)
        elem = elem.parentNode;

    return (elem.tagName == "TEXTAREA" ||
        (elem.tagName == "INPUT" && (elem.getAttribute("type") == "text")));
}
/*
chatForm.onsubmit = function (event) {
    event.preventDefault();
    if (chatInput.value.substring(0, 1) === "/")
        socket.emit('sendCommandToServer', chatInput.value.substring(1, chatInput.value.length));

    socket.emit('sendMsgToServer', chatInput.value);

    chatInput.value = '';
};
*/


socket.on('renderInfo', function (playerData,bulletData) {

    canvas.clearRect(0, 0, window.innerWidth, window.innerHeight); //이전표시 애니메이션의 자취가 남지않게 캔버스를 초기화

    playerListDisplay.innerHTML = '';

    for (var player of playerData) {
        canvas.fillText(player.username + ": " + player.points, player.x, player.y);
        playerListDisplay.innerHTML += '<div>' + player.username + ': ' + player.points + '</div>';

        drawChar(player);
    }

    for (var bullet of bulletData){
        drawBullet(bullet);
    }
});


/*
socket.on('Time', function () {
    var date = Date().slice(4, 24);
    timeStamp.innerHTML = date;
});
*/

document.onkeydown = function (event) {
    //if (!inTextField(event)) //채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
        if (event.keyCode === 68) //d
            socket.emit('keyPress', { inputId: 'right', state: true});
        else if (event.keyCode === 83)  //s
            socket.emit('keyPress', { inputId: 'down', state: true});
        else if (event.keyCode === 65) //a
            socket.emit('keyPress', { inputId: 'left', state: true});
        else if (event.keyCode === 87) //w
            socket.emit('keyPress', { inputId: 'up', state: true});
        else if (event.keyCode === 75) //k
            socket.emit('keyPress', { inputId: 'shoot', state: true});
    }
//};
document.onkeyup = function (event) {
    //if (!inTextField(event)) {//채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
        if (event.keyCode === 68) //d
            socket.emit('keyPress', { inputId: 'right', state: false });
        else if (event.keyCode === 83)  //s
            socket.emit('keyPress', { inputId: 'down', state: false });
        else if (event.keyCode === 65) //a
            socket.emit('keyPress', { inputId: 'left', state: false });
        else if (event.keyCode === 87) //w
            socket.emit('keyPress', { inputId: 'up', state: false });
        else if (event.keyCode === 75) //k
            socket.emit('keyPress', { inputId: 'shoot', state: false });
    }
//};

function drawChar(player) {

    var playersImg = new Image();
    //playersImg.src ='/client/sprites/' + player.char + '.png';
    playersImg.src='/client/sprites/knight.png';
    //playersImg.src='/client/sprites/amongus.png';

    switch (player.lastPosition) {
        case 'down':
            canvas.drawImage(playersImg, 0, 0, imgWidth, imgHeight, player.x, player.y, imgWidth, imgHeight);
            break;
        case 'up':
            canvas.drawImage(playersImg, imgFrameIndex, 0, imgWidth, imgHeight, player.x, player.y, imgWidth, imgHeight);
            break;
        case 'left':
            canvas.drawImage(playersImg, imgFrameIndex * 2, 0, imgWidth, imgHeight, player.x, player.y, imgWidth, imgHeight);
            break;
        case 'right':
            canvas.drawImage(playersImg, imgFrameIndex * 3, 0, imgWidth, imgHeight, player.x, player.y, imgWidth, imgHeight);
            break;
    }
}

function drawBullet(bullet){
    var bulletImg = new Image();
    //bulletImg.src = 'client/sprites/bullet.png';
    bulletImg.src = 'client/sprites/bullet_knight.png';

    //canvas.drawImage(bulletImg, 0, 0, imgWidth, imgHeight, bullet.x, bullet.y, imgWidth, imgHeight); //원본코드(bullet방향고려x)
    //player의 발사방향에 따라 bullet 이미지 다르게 표시
    
    switch(bullet.direction){
        case 'down':
            canvas.drawImage(bulletImg, 0, 0, imgWidth, imgHeight, bullet.x, bullet.y, imgWidth, imgHeight);
            break;
        case 'up':
            canvas.drawImage(bulletImg, imgFrameIndex, 0, imgWidth, imgHeight, bullet.x, bullet.y, imgWidth, imgHeight);
            break;
        case 'left':
            canvas.drawImage(bulletImg, imgFrameIndex * 2, 0, imgWidth, imgHeight, bullet.x, bullet.y, imgWidth, imgHeight);
            break;
        case 'right':
            canvas.drawImage(bulletImg, imgFrameIndex * 3, 0, imgWidth, imgHeight, bullet.x, bullet.y, imgWidth, imgHeight);
            break;

    }
}

function UpdateCharModel(name) {
    console.log('change charactor to : '+name);
    charImg.src = 'client/sprites/' + name + '.png';
    socket.emit('charUpdate', { charName: name });
}

},1000);

