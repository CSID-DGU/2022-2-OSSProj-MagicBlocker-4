//
// SocketConnection.js
//



//
//
//


let socket = io(); 
//io()를 실행하는 순간, 서버로 연결을 시도하고, 서버와 연결된 소켓 객체를 생성한다. 이걸 socket이라는 변수에 저장하였음.   
//socket 객체를 통해, 소켓의 메서드 사용가능

socket.on('connect',()=>{ 
    console.log('connected!'); //연결이 성공하면 콘솔출력
});

socket.on('error', (error)=>{
    console.log(`소켓 에러 발생: ${error}`);
});

var charImg = new Image();
//charImg.src = 'client/sprites/warrior.png';
//상하좌우의 플레이어 이미지가 다르므로, 상하좌우가 붙어있는 200*60px 의 캐릭터 이미지를 잘라서 씀
//imgFrameIndex를 기준으로 canvas가 이미지를 상하좌우를 기준으로 잘라서 가져옴
//크기를 70으로 키우고, 정사각형으로 바꾸었음.

var imgFrameIndex = 100;
var imgWidth = 100;
var imgHeight = 100;

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

    //document.getElementById("player_list").innerHTML = ''; //잔상제거(없으면 도배됨)       
      
      playerDataList=[...playerPack];
      bulletDataList=[...bulletPack]; //얕은복사(shallow copy 로 참조)
      
    }
    
    /*
    for(player of playerPack){
      renderPlayerList.push(player);
    }
    for(bullet of bulletPack){
      renderBulletList.push(bullet);
    }
    */
  
);    

Keyboard.mySocket = socket;

document.onkeyup = function(event){
  Keyboard.getKeyUp(event);
  }
document.onkeydown = function(event){
  Keyboard.getKeyDown(event);
  }


function playerUpdate(player) {


  }

function bulletUpdate(bullet){
    
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

