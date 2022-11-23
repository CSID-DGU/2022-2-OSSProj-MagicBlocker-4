//
// Connect.js
//

//io()를 실행하는 순간, 서버로 연결을 시도하고, 소켓객체를 생성한다. 이걸 socket이라는 변수에 저장하였음.
const waitTime = 1000;   
console.log('로딩중...'); //바로 script를 불러오면, html보다 빨리 로드되서 오류 발생. setTimeout으로 방지.
setTimeout(()=>{
console.log('로딩완료!');
var socket = io(); 
//socket에 저장된 소켓의 메서드 사용가능
socket.on('connect',()=>{ 
  console.log('connected!'); //연결이 성공하면 콘솔출력
  });
socket.on('error', (error)=>{
  console.log(`소켓 에러 발생: ${error}`); //여기에 오류 처리를 적을 예정임. 연결오류 발생시, 소켓을 차단하고 새 소켓을 생성
});

Ui.create_login_ui() //ui.js 로그인 ui 동적생성

//var charImg = new Image();
//charImg.src = 'client/sprites/warrior.png';

//상하좌우의 플레이어 이미지가 다르므로, 상하좌우가 붙어있는 200*100px 의 캐릭터 이미지를 잘라서 씀(이를 스프라이트 방식이라고 함)
//크기를 100으로 키우고, 정사각형으로 바꾸었음.

var imgFrameIndex = 100; //기준자
var imgWidth = 100;
var imgHeight = 100;

    
//캔버스 방식 렌더링으로 복구한 것. p5 렌더링은 모바일에서 너무 느림이 관찰되었다.
let canvas = document.getElementById('myCanvas').getContext("2d"); 
//게임화면 캔버스 크기를 window크기에 맞춰서 자동변환.
canvas.canvas.width = window.innerWidth;
canvas.canvas.height = window.innerHeight;
canvas.font = '30px Arial';
//게임화면 크기를 조절하면, 이벤트가 발생해서, 이벤트가 발생했을 때만 다시 캔버스 크기를 조정한다(윈도우 크기로)
//브라우저 크기를 늘렸다 줄이면 캔버스크기가 맞게 변화한다.(Auto Scaling)
window.addEventListener("resize",()=>{
  canvas.canvas.width = window.innerWidth;
  canvas.canvas.height = window.innerHeight;
  canvas.font = '30px Arial';
  });
    
//
//플레이 버튼 눌렀을때
document.getElementById("play_button").onclick = function(){
//console.log("pushed!");
//alert("access!");
//socket.emit('access');
ui_login.style.display='none';
gameDiv.style.display='inline-block';
socket.emit('signIn', { username: document.getElementById("username_input").value.trim()});
};

socket.on('renderInfo', function (playerPack,bulletPack) {
  canvas.clearRect(0, 0, window.innerWidth, window.innerHeight); //이전표시 애니메이션의 자취가 남지않게 캔버스를 초기화
  document.getElementById('player_list').innerHTML = '';
  for(var player of playerPack) {
    canvas.fillText(player.username + ": " + player.points, player.x, player.y);
    document.getElementById('player_list').innerHTML += '<div>' + player.username + ': ' + player.points + '</div>';
          drawChar(player);
        }
    for(var bullet of bulletPack){
        drawBullet(bullet);
      }
    }
  );    
  
//키보드 조작
Keyboard.mySocket = socket;
document.onkeyup = function(event){
  Keyboard.getKeyUp(event);
  }
document.onkeydown = function(event){
  Keyboard.getKeyDown(event);
  }

//조이스틱 조작
let Joy1 = new JoyStick('joyDiv', {}, function(stickData) {

  //console.log(stickData.xPosition);
  //console.log(stickData.yPosition);
  //console.log(stickData.cardinalDirection);
  //console.log(stickData.x);
  //console.log(stickData.y);

  let stick = stickData.cardinalDirection;
      //console.log(stick);
      //정지시 C
      if(stick=='E'){
        console.log('e...');
        socket.emit('keyPress',{inputId:'joy_right',state:true});
      }else if(stick=='W'){
        console.log('w...');
        socket.emit('keyPress',{inputId:'joy_left',state:true});
      }else if(stick=='N'){
        console.log('n...');
        socket.emit('keyPress',{inputId:'joy_up',state:true});
      }else if(stick=='S'){
        console.log('s...');
        socket.emit('keyPress',{inputId:'joy_down',state:true});
      }else if(stick=='C'){
        console.log("c...");
        socket.emit('keyPress',{inputId:'joy_stop'});
      }
    });
    //공격버튼 동적생성
    const mobile_attack_button=document.createElement("button");
    mobile_attack_button.id='mobile_attack_button';
    document.body.appendChild(mobile_attack_button);
    mobile_attack_button.onclick=function(){
      socket.emit("keyPress",{inputId:'shoot',state:true});
    }

/*
let stick;
let joy1 = new JoyStick('joyDiv')
setInterval(()=>{
  stick = joy1.GetDir();
  console.log(stick);
  socket.emit('keyPress',{intputId:'right',state:true});
  }
,50);
*/

/*
if (stick=='E'
  this.mySocket.emit('keyPress', { inputId: 'right', state: false});
else if (stick=='S') 
  this.mySocket.emit('keyPress', { inputId: 'down', state: false});
else if (stick=='W')
  this.mySocket.emit('keyPress', { inputId: 'left', state: false});
else if (stick=='N')
  this.mySocket.emit('keyPress', { inputId: 'up', state: false});
})
*/


function drawChar(player) {
  var playersImg = new Image();
  //playersImg.src ='/client/sprites/' + player.char + '.png';
  playersImg.src='client/sprites/knight.png';
  
  switch (player.direction) {
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
  


let char_select_button_list = document.querySelectorAll('.char-select-button');

  function updateCharModel(name) {
  console.log('change charactor to : '+name);
    //charImg.src = 'client/sprites/' + name + '.png';
    //socket.emit('charUpdate', { charName: name });
  }


  for(item of char_select_button_list){
      console.log(item.getAttribute('char'));
      item.onclick=()=>{
        updateCharModel(item.getAttribute('char'));
        };
    }


},waitTime); //setTimeout

//
// Keyboard.js
//
Keyboard={//컴퓨터 키보드로 조작
    mySocket:null,
    upkey:87,//w
    downkey:83,//s
    leftkey:65,//a
    rightkey:68,//r
    attackkey:75,//k
    show:function(){
      console.log(this.upkey);
    },
    getKeyDown:function(e){
      //if (!inTextField(event)) //채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
          if (e.keyCode === this.rightkey)
              this.mySocket.emit('keyPress', { inputId: 'right', state: true});
          else if (e.keyCode === this.downkey)
              this.mySocket.emit('keyPress', { inputId: 'down', state: true});
          else if (e.keyCode === this.leftkey)
            this.mySocket.emit('keyPress', { inputId: 'left', state: true});
          else if (e.keyCode === this.upkey)
            this.mySocket.emit('keyPress', { inputId: 'up', state: true});
          else if (e.keyCode === this.attackkey)
            this.mySocket.emit('keyPress', { inputId: 'shoot', state: true});
      },
    getKeyUp:function(e){
      
    //if (!inTextField(event)) {//채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
            if (e.keyCode === this.rightkey)
              this.mySocket.emit('keyPress', { inputId: 'right', state: false});
            else if (e.keyCode === this.downkey) 
              this.mySocket.emit('keyPress', { inputId: 'down', state: false});
            else if (e.keyCode === this.leftkey)
              this.mySocket.emit('keyPress', { inputId: 'left', state: false});
            else if (e.keyCode === this.upkey)
              this.mySocket.emit('keyPress', { inputId: 'up', state: false});
            else if (e.keyCode === this.attackkey)
              this.mySocket.emit('keyPress', { inputId: 'shoot', state: false});
            }
}
//
// Ui.js
//
const Ui={

    create_login_ui:function(){
        const ui_login = document.getElementById("ui_login");
        const ui_game = document.getElementById("ui_game");

        //동적 ui 생성
        const ui_title = document.createElement('div');
        ui_title.classList.add('ui');
        ui_title.classList.add('title');
        ui_title.innerHTML='Magic Blocker';

        ui_login.appendChild(ui_title);

        const ui_name_input = document.createElement('input');
        ui_name_input.classList.add('ui');
        ui_name_input.id='username_input';
        ui_name_input.setAttribute('placeholder','Please Enter Nickname');

        ui_login.appendChild(ui_name_input);

        const ui_play_button = document.createElement('button');
        ui_play_button.classList.add('ui');
        ui_play_button.id='play_button';
        ui_play_button.innerHTML='Play';
        ui_login.appendChild(ui_play_button);

        const ui_charactor_select = document.createElement('div');
        ui_charactor_select.classList.add('ui');
        ui_charactor_select.classList.add('charactor-select');
        ui_charactor_select.innerHTML="여기에 캐릭터 선택창 떠야됨"

        ui_login.appendChild(ui_charactor_select);

        const ui_how_to_play_button = document.createElement('button');
        ui_how_to_play_button.classList.add('ui');
        ui_how_to_play_button.classList.add('how-to-play');
        ui_how_to_play_button.innerHTML='How to Play?';

        ui_login.appendChild(ui_how_to_play_button);

        ui_how_to_play_button.onclick = function(){ // How to Play? 클릭 시 도움말 뜨도록
            if(document.getElementById("guideID")==null){
                ui_login.appendChild(ui_guide_page);
            }else{
                ui_guide_page.remove();
            }
            
        }

        const ui_guide_page = document.createElement('div');
        ui_guide_page.classList.add('ui');
        ui_guide_page.classList.add('guide');
        ui_guide_page.id = "guideID";
        ui_guide_page.innerHTML='이동 : w a s d \n 발사 : k';

        const ui_player_list_box = document.createElement('div');
        ui_player_list_box.id = 'ui_player_list_box';
        ui_player_list_box.innerHTML='접속중인 플레이어';

        ui_game.appendChild(ui_player_list_box);

        const player_list = document.createElement('div');
        player_list.id = 'player_list';

        ui_player_list_box.appendChild(player_list);

        const gameDiv = document.createElement('div');//gameScreen의 div. 이 안에 렌더링된 게임화면이 렌더링 엔진에 의해 동적으로 생성된다.
        ui_game.appendChild(gameDiv);
    }
}

