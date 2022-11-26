//
//KeyboardController.js
//
const KEYCODE_UP=87; //W
const KEYCODE_DOWN=83; //S
const KEYCODE_LEFT=65; //A
const KEYCODE_RIGHT=68; //D
const KEYCODE_ATTACK=75; //L

function Keyboard(){
    this.mySocket=null;

    this.upkey=KEYCODE_UP;
    this.downkey=KEYCODE_DOWN;
    this.leftkey=KEYCODE_LEFT;
    this.rightkey=KEYCODE_RIGHT;
    this.attackkey=KEYCODE_ATTACK;

    this.show=function(){
      console.log(this.upkey);
    };

    this.getKeyDown = function(e){
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
      };

    this.getKeyUp=function(e){
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
//MobileController.js
//
/*
let Joy1 = new JoyStick('joyDiv', {}, function(stickData) {
    //console.log(stickData.xPosition);
    //console.log(stickData.yPosition);
    //console.log(stickData.cardinalDirection);
    //console.log(stickData.x);
    //console.log(stickData.y);

    let stick = stickData.cardinalDirection
        //console.log('hello');

        if(stick=='E'){
            move_right();
        }
        if(stick=='W'){
            move_left();
        }
        if(stick=='N'){
            move_up();
        }
        if(stick=='S'){
            move_down();
        }

        //대각선이동
        if(stick=='NW'){
            move_up();
            move_left();
        }
        if(stick=='SW'){
            move_down();
            move_left();
        }
        if(stick=='SE'){
            move_down();
            move_right();
        }
        if(stick=='NE'){
            move_up();
            move_right();
        }
});
*/
//
//Render.js
//


function Render(){
    


}

//
//
//
//
//SocketConnection.js
//require socket.io.js

function Socket(){
    this.mySocket = io();//서버와 연결하는 함수. 소켓을 반환

    this.mySocket.on('connect',()=>{ //소켓이 연결되었을때 callback
        console.log("connected!!");
    });
    this.mySocket.on('error',()=>{ //소켓 연결 실패시 callback
        console.log("socket error!!");
    });
}
//
// Ui.js
//
function Ui(){

    this.create_login_ui=function(){
        const ui_login = document.getElementById("ui_login");
        console.log(ui_login);
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

        this.popUp = function(){
            const popUpBox = document.createElement("div");
            popUpBox.innerHTML="pop up!!!";
            document.body.appendChild(popUpBox);
        }
    }
}

//
//Main.js
//
const waitTime=1000;
setTimeout(() => {
    console.log("script start...");

    const ui = new Ui();
    ui.create_login_ui();
    
    ui.popUp();


    const socketManager = new Socket();


}, waitTime);
//
//
//