//
//ClientData.js
//

function ClientData(mySocket){
    this.player_pack_client = [];
    this.bullet_pack_client = [];
    player_pack_client=this.player_pack_client;
    bullet_pack_client=this.bullet_pack_client;

    this.set_socket_render_info = function(){//mySocket(서버와 연결된 소켓)의 on함수를 오버라이드, 이벤트리스너를 추가함

        mySocket.on('renderInfo',function(player_pack_server,bullet_pack_server){
            player_pack_client=[...player_pack_server];
            bullet_pack_client=[...bullet_pack_server]; //얕은복사(shallow copy 로 참조)
        });
    };
    this.get_player_pack=function(){
        return player_pack_client;
    }
    this.get_bullet_pack=function(){
        return bullet_pack_client;
    }
}

    


//
//
//
//
//KeyboardController.js
//
const KEYCODE_UP=87; //W
const KEYCODE_DOWN=83; //S
const KEYCODE_LEFT=65; //A
const KEYCODE_RIGHT=68; //D
const KEYCODE_ATTACK=75; //L

function KeyboardController(mySocket){
    upkey=KEYCODE_UP;
    downkey=KEYCODE_DOWN;
    leftkey=KEYCODE_LEFT;
    rightkey=KEYCODE_RIGHT;
    attackkey=KEYCODE_ATTACK;

    document.onkeyup=function(event){
      //if (!inTextField(event)) //채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
      if (event.keyCode === rightkey)
        mySocket.emit('keyPress', { inputId: 'right', state: false});
      else if (event.keyCode === downkey)
        mySocket.emit('keyPress', { inputId: 'down', state: false});
      else if (event.keyCode === leftkey)
        mySocket.emit('keyPress', { inputId: 'left', state: false});
      else if (event.keyCode === upkey)
          mySocket.emit('keyPress', { inputId: 'up', state: false});
      else if (event.keyCode === attackkey)
          mySocket.emit('keyPress', { inputId: 'shoot', state: false});
      };
    document.onkeydown=function(event){
      //if (!inTextField(event)) {//채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
        if (event.keyCode === rightkey)
        mySocket.emit('keyPress', { inputId: 'right', state: true});
        else if (event.keyCode === downkey) 
          mySocket.emit('keyPress', { inputId: 'down', state: true});
        else if (event.keyCode === leftkey)
          mySocket.emit('keyPress', { inputId: 'left', state: true});
        else if (event.keyCode === upkey)
          mySocket.emit('keyPress', { inputId: 'up', state: true});
        else if (event.keyCode === attackkey)
          mySocket.emit('keyPress', { inputId: 'shoot', state: true});
      }
  }
//
//MobileController.js
//
function MobileController(mySocket){
    let Joy1 = new JoyStick('joyDiv', {}, function(stickData) {
        let stick = stickData.cardinalDirection;
            //정지시 C
            if(stick=='E'){
              mySocket.emit('keyPress',{inputId:'joy_right',state:true});
            }else if(stick=='W'){
              mySocket.emit('keyPress',{inputId:'joy_left',state:true});
            }else if(stick=='N'){
              mySocket.emit('keyPress',{inputId:'joy_up',state:true});
            }else if(stick=='S'){
              mySocket.emit('keyPress',{inputId:'joy_down',state:true});
            }else if(stick=='C'){
              mySocket.emit('keyPress',{inputId:'joy_stop'});
            }
          });
}
//
//Render.js
//


function Render(canvas_id,client_data){

    this.canvas_id = canvas_id;//렌더링객체를 캔버스와 연결해야 사용가능    
    this.my_canvas=document.getElementById(canvas_id);
    const my_canvas = this.my_canvas;
    const ctx = my_canvas.getContext("2d"); //내부 함수가 사용하기 위한 참조
    
    //스프라이트 자르기 상수
    const img_frame_index = 100;
    const img_width = 100;
    const img_height = 100;

    //Render 생성자 호출시 미리 이미지 객체를 생성 (이미지를 불러와서 Render 객체에 저장). (렌더링 성능 최적화)
    const player_img = new Image();
    player_img.src = 'client/sprites/soldier.png';

    const bullet_img = new Image();
    bullet_img.src = 'client/sprites/soldier_bullet.png';
    //
    this.client_data = client_data;//클라이언트 데이터(player와 bullet의 좌표,방향)를 참조하여 렌더링

    //게임화면 캔버스 크기를 window크기에 맞춰서 자동변환.
    function auto_scaile(){
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
        my_canvas.font = '30px Arial';
        //게임화면 크기를 조절하면, 이벤트가 발생해서, 이벤트가 발생했을 때만 다시 캔버스 크기를 조정한다(윈도우 크기로)
        //브라우저 크기를 늘렸다 줄이면 캔버스크기가 맞게 변화한다.(Auto Scaling)
        window.addEventListener("resize",()=>{
            my_canvas.width = window.innerWidth;
            my_canvas.height = window.innerHeight;
            my_canvas.font = '30px Arial';
        });
    }

    //클라이언트 데이터 객체에서 뽑아낸 좌표 데이터로 한 프레임을 화면에 그림. main함수에서 setInterval안에 넣어서 framarate와 함께 사용할 것.
    this.draw_client_data=function(){
        auto_scaile();
        
        const player_pack = client_data.get_player_pack();
        const bullet_pack = client_data.get_bullet_pack();
        for(let player of player_pack){
            ctx.fillText(player.username + ": " + player.points, player.x, player.y); //닉네임 표시
            draw_player(player);
        }
        for(let bullet of bullet_pack){    
            draw_bullet(bullet);
        }
    }

    function draw_player(player){
        //ctx.drawImage(player_img, 0, 0, img_width, img_height, 500, 200, img_width, img_height); 
        switch(player.direction){
            case 'down':
                ctx.drawImage(player_img, 0, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'up':
                ctx.drawImage(player_img, img_frame_index, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'left':8
                ctx.drawImage(player_img, img_frame_index * 2, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'right':
                ctx.drawImage(player_img, img_frame_index * 3, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
       }
       

    }

    function draw_bullet(bullet){
;
        switch(bullet.direction){
            case 'down':
                ctx.drawImage(bullet_img, 0, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'up':
                ctx.drawImage(bullet_img, img_frame_index, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'left':
                ctx.drawImage(bullet_img, img_frame_index * 2, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'right':
                ctx.drawImage(bullet_img, img_frame_index * 3, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
        }
        
    }
}

//
//
//
//
//SocketConnection.js
//require socket.io.js

function SocketConnection(){
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
function Ui(my_socket){
    this.my_socket = my_socket;
    this.GAME_CANVAS_ID = "gameCanvas";//렌더링매니저와 연결하기 위한 인터페이스    
    this.JOYSTICK_ID = "joyDiv"; //조이스틱과 연결하기 위한 인터페이스

    GAME_CANVAS_ID=this.GAME_CANVAS_ID;//생성자 내부함수는 this에 접근 불가
    JOYSTICK_ID=this.JOYSTICK_ID;


    this.create_login_ui=function(){

        //게임 화면 생성
        const game_div = document.createElement('div');//game 플레이화면의 모든 요소들을 포함하는 부모div 
        document.body.appendChild(game_div);

        const game_canvas = document.createElement('canvas');//게임 렌더링 캔버스
        game_canvas.id =GAME_CANVAS_ID;
        console.log("game canvas 생성...");
        game_div.appendChild(game_canvas);

        //게임 UI 생성
        const ui_div = document.createElement("div");//game 접속 UI 의 모든 요소들을 포함하는 부모div
        ui_div.id='ui_div'
        document.body.appendChild(ui_div);
        
        const ui_title = document.createElement('div');//게임 제목을 표시
        ui_title.classList.add('ui');
        ui_title.classList.add('title');
        ui_title.innerHTML='Magic Blocker';

        ui_div.appendChild(ui_title);

        const ui_name_input = document.createElement('input');//닉네임 입력란
        ui_name_input.classList.add('ui');
        ui_name_input.id='username_input';
        ui_name_input.setAttribute('placeholder','Please Enter Nickname');

        ui_div.appendChild(ui_name_input);

        const ui_play_button = document.createElement('button');//게임 플레이 버튼
        ui_play_button.classList.add('ui');
        ui_play_button.id='play_button';
        ui_play_button.innerHTML='Play';

        ui_play_button.onclick = function(){
            ui_div.style.display = 'none';
            my_socket.emit('signIn', { username: document.getElementById("username_input").value.trim()});
        }
    
        ui_div.appendChild(ui_play_button);

        const ui_charactor_select = document.createElement('div');//캐릭터 선택창
        ui_charactor_select.classList.add('ui');
        ui_charactor_select.classList.add('charactor-select');
        ui_charactor_select.innerHTML="여기에 캐릭터 선택창 떠야됨";
    
        ui_div.appendChild(ui_charactor_select);

        const ui_how_to_play_button = document.createElement('button');//조작법 안내 버튼
        ui_how_to_play_button.classList.add('ui');
        ui_how_to_play_button.classList.add('how-to-play');
        ui_how_to_play_button.innerHTML='How to Play?';

        ui_div.appendChild(ui_how_to_play_button);

        ui_how_to_play_button.onclick = function(){ // 조작법 안내 버튼 클릭시 콜백
            if(document.getElementById("guideID")==null){
                ui_login.appendChild(ui_guide_page);
            }else{
                ui_guide_page.remove();
            }
            
        }
        //모바일 컨트롤러
        mobile_controller_div=document.createElement('div');
        mobile_controller_div.id=JOYSTICK_ID;
        document.body.appendChild(mobile_controller_div);
        //
        
        const ui_guide_page = document.createElement('div'); //조작법 안내 세부 페이지
        ui_guide_page.classList.add('ui');
        ui_guide_page.classList.add('guide');
        ui_guide_page.id = "guideID";
        ui_guide_page.innerHTML='이동 : w a s d \n 발사 : k';

        const ui_player_list_box = document.createElement('div'); //접속중인 플레이어 표시 박스
        ui_player_list_box.id = 'ui_player_list_box';
        ui_player_list_box.innerHTML='접속중인 플레이어';

        game_div.appendChild(ui_player_list_box);

        const player_list = document.createElement('div'); //접속중인 플레이어 리스트. 접속중인 플레이어 표시 박스 안에 자식요소로 삽입됨.
        player_list.id = 'player_list';

        ui_player_list_box.appendChild(player_list);

        //모바일 전환 버튼
        const ui_mobile_toggle = document.createElement('button');
        ui_mobile_toggle.classList.add('ui');
        ui_mobile_toggle.classList.add('mobile');
        ui_mobile_toggle.id = "ui_mobile_toggle_button";
        ui_mobile_toggle.innerHTML="I'm Mobile!!";
        ui_div.appendChild(ui_mobile_toggle);

        ui_mobile_toggle.onclick = function(){
          const joystick = document.getElementById(JOYSTICK_ID);  
          joystick.style.visibility='visible';
          //mobile_attack_button.style.visibility='visible';
        };


        this.popup = function(){ //팝업 UI
            const popUpBox = document.createElement("div");
            popUpBox.innerHTML="pop up!!!";
            document.body.appendChild(popUpBox);
        }
    }
}

//
//Main.js
//
const SCRIPT_LOAD_DELAY=1000;
const CLIENT_FRAME_RATE=5;
setTimeout(() => {
    console.log("script start...");


    const socket_manager = new SocketConnection();
    
    const ui_manager = new Ui(socket_manager.mySocket);
    ui_manager.create_login_ui();
    ui_manager.popup();

    const client_data = new ClientData(socket_manager.mySocket);
    client_data.set_socket_render_info();

    const render_manager = new Render(ui_manager.GAME_CANVAS_ID,client_data);

    setInterval(render_manager.draw_client_data,CLIENT_FRAME_RATE);
    
    const keyboard_controller = new KeyboardController(socket_manager.mySocket);
    const mobile_controller = new MobileController(socket_manager.mySocket);


}, SCRIPT_LOAD_DELAY);
//
//
//