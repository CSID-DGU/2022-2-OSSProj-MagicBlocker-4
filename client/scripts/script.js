var socket = io();

var signDiv = document.getElementById('signDiv');
var signDivUser = document.getElementById('signDiv-user');
var signDivPass = document.getElementById('signDiv-pass');
var signDivSignIn = document.getElementById('signDiv-signIn');
var signDivSignUp = document.getElementById('signDiv-signUp');
var kmsButton = document.getElementById('kms-button');
var reviveButton = document.getElementById('revive-button');
var timeStamp = document.getElementById('timeStamp');
var playerListDisplay = document.getElementById('player-list');

let accessButton = document.getElementById('access');

var charImg = new Image();
charImg.src = 'client/sprites/tyler1.png';
var imgFrameIndex = 50;
var imgWidth = 50;
var imgHeight = 60;


accessButton.onclick = function(){
  //alert("access!");
  //socket.emit('access');
  signDiv.style.display='none';
  gameDiv.style.display='inline-block';

  socket.emit('signIn', { username: signDivUser.value.trim()});
};

kmsButton.onclick = function () {
    socket.emit('kms');
};

reviveButton.onclick = function () {
    socket.emit('revive');
};


var chatText = document.getElementById('chat-text');
var chatForm = document.getElementById('chat-form');
var chatInput = document.getElementById('chat-input');

var canvas = document.getElementById('myCanvas').getContext("2d"); 
//canvas로 렌더링작업(이미지 불러오기 등)을 하려면 getContext를 2d로 지정해야한다.
//p5.js 로 교체하고나면 필요없는 코드.
canvas.font = '15px Arial';


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

chatForm.onsubmit = function (event) {
    event.preventDefault();
    if (chatInput.value.substring(0, 1) === "/")
        socket.emit('sendCommandToServer', chatInput.value.substring(1, chatInput.value.length));

    socket.emit('sendMsgToServer', chatInput.value);

    chatInput.value = '';
};


socket.on('renderInfo', function (playerData,bulletData) {

    canvas.clearRect(0, 0, 800, 500);

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



socket.on('Time', function () {
    var date = Date().slice(4, 24);
    timeStamp.innerHTML = date;
});

document.onkeydown = function (event) {
    if (!inTextField(event)) {
        if (event.keyCode === 68) //d
            socket.emit('keyPress', { inputId: 'right', state: true });
        else if (event.keyCode === 83)  //s
            socket.emit('keyPress', { inputId: 'down', state: true });
        else if (event.keyCode === 65) //a
            socket.emit('keyPress', { inputId: 'left', state: true });
        else if (event.keyCode === 87) //w
            socket.emit('keyPress', { inputId: 'up', state: true });
        else if (event.keyCode === 75) //k
            socket.emit('keyPress', { inputId: 'shoot', state: true });
    }
};

document.onkeyup = function (event) {
    if (!inTextField(event)) {
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
};

function drawChar(player) {

    var playersImg = new Image();
    //playersImg.src ='/client/sprites/' + player.char + '.png';
    playersImg.src='/client/sprites/warrior.png';

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
    bulletImg.src = 'client/sprites/bullet.png';

    canvas.drawImage(bulletImg, 0, 0, imgWidth, imgHeight, bullet.x, bullet.y, imgWidth, imgHeight);
}

function UpdateCharModel(name) {
    charImg.src = '../sprites/' + name + '.png';
    socket.emit('charUpdate', { charName: name });
}

