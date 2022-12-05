//
//ClientData.js
//

function ClientData(mySocket){
    this.player_pack_client = [];
    this.bullet_pack_client = [];

    //스프라이트 상수
    this.img_frame_index = 100;
    this.img_width = 100;
    this.img_height = 100;

    //캐릭터 리스트
    this.char_list_pick=['soldier','ezreal','ako','ashe','zed','buzzi','dad','kitty','pepe','santa','monk'] //플레이어가 선택할수있는 캐릭터 리스트
    this.char_list = ['soldier','ezreal','ako','ashe','zed','buzzi','dad','kitty','pepe','santa','monk','ghost'] //모든 캐릭터 리스트. 이스터에그, 고스트 포함
    this.charname_list = {
        soldier:"군인",
        ezreal:"마법탐험가",
        ako:"아코",
        ashe:"얼음궁수",
        zed:"그림자암살자",
        buzzi:"물풍선곰돌이",
        dad:"아빠아들",
        kitty:"리본고양이",
        pepe:"개붕이",
        santa:"산타클로스",
        monk:"스님",
    }

    //플레이어가 선택한 캐릭터
    this.selected_char = 'none';

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
function SquareMobileController(my_socket){
  const controller_canvas = document.createElement('canvas');
  const ctx = controller_canvas.getContext("2d");
  controller_canvas.id = "square_mobile_controller";
  controller_canvas.width = 2000;
  controller_canvas.height = 400;
  controller_canvas.style="border:solid;position:absolute";
  controller_canvas.addEventListener("touchstart",touchstart_handler);
  controller_canvas.addEventListener("touchend",touchend_handler);
  const BUTTON_SIZE = 100;
  const BUTTON_PAD = 100;
  //왼쪽 대각선 위 좌표
  const button_vertical_pos = {x:150,y:50}//위
  const button_vertical_neg = {x:150,y:250}//아래
  const button_horizontal_neg = {x:50,y:150}//왼
  const button_horizontal_pos = {x:250,y:150}//오른
  const button_attack = {x:1550,y:150}//공격
  
  function draw_button(button){
    ctx.fillRect(button.x,button.y,BUTTON_SIZE,BUTTON_SIZE);
  }
  ctx.fillStyle = "green";
  draw_button(button_vertical_pos);
  draw_button(button_vertical_neg);
  draw_button(button_horizontal_neg);
  draw_button(button_horizontal_pos);
  draw_button(button_attack);

  function isButtonClicked(button,x,y){
    if(x>button.x&&x<button.x+BUTTON_SIZE&&y>button.y&&button.y+BUTTON_SIZE){
      return true;
    }
  }

  function touchstart_handler(e){
    for(item of e.touches){
      if(isButtonClicked(button_vertical_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_up',state:true});
      }
      if(isButtonClicked(button_vertical_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_down',state:true});
      }
      if(isButtonClicked(button_horizontal_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_left',state:true});
      }
      if(isButtonClicked(button_horizontal_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_right',state:true});
      }
      if(isButtonClicked(button_attack,item.clientX,item.clientY)){
        my_socket.emit("keyPress",{inputId:'shoot',state:true})
      }
    }
  }
  function touchend_handler(e){
    for(item of e.changedTouches){

      if(isButtonClicked(button_vertical_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_vertical_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_horizontal_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_horizontal_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_attack,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
    }
  }
  document.body.appendChild(controller_canvas);
}
/*
  if(stick=='E'){
    my_socket.emit('keyPress',{inputId:'joy_right',state:true});
  }else if(stick=='W'){
    my_socket.emit('keyPress',{inputId:'joy_left',state:true});
  }else if(stick=='N'){
    my_socket.emit('keyPress',{inputId:'joy_up',state:true});
  }else if(stick=='S'){
    my_socket.emit('keyPress',{inputId:'joy_down',state:true});
  }else if(stick=='C'){
    my_socket.emit('keyPress',{inputId:'joy_stop'});
  }
}
*/
/*
function MobileController(my_socket){
    let Joy1 = new JoyStick('joyDiv', {}, function(stickData) {
        let stick = stickData.cardinalDirection;
            //정지시 C
            if(stick=='E'){
              my_socket.emit('keyPress',{inputId:'joy_right',state:true});
            }else if(stick=='W'){
              my_socket.emit('keyPress',{inputId:'joy_left',state:true});
            }else if(stick=='N'){
              my_socket.emit('keyPress',{inputId:'joy_up',state:true});
            }else if(stick=='S'){
              my_socket.emit('keyPress',{inputId:'joy_down',state:true});
            }else if(stick=='C'){
              my_socket.emit('keyPress',{inputId:'joy_stop'});
            }
          });
}
*/
//
//Render.js
//


function Render(client_data){

    this.my_canvas=document.getElementById(GAME_CANVAS_ID);
    const my_canvas = this.my_canvas;
    const ctx = my_canvas.getContext("2d"); //내부 함수가 사용하기 위한 참조
    
    //스프라이트 자르기 상수
    img_frame_index=client_data.img_frame_index;
    img_width = client_data.img_width;
    img_height = client_data.img_height;

    const PAD = 50;//게임화면 옆에 남는 공백공간 상수

    //Render 생성자 호출시 미리 이미지 객체를 생성 (이미지를 불러와서 Render 객체에 저장). (렌더링 성능 최적화)
    const player_sprite_list={};
    for(item of client_data.char_list){
        let temp_img = new Image();
        temp_img.src = 'client/sprites/sprite_char/'+item+'.png';
        player_sprite_list[item]=temp_img;
    }
    const bullet_sprite_list={};
    for(item of client_data.char_list){
        let temp_img = new Image();
        temp_img.src = 'client/sprites/sprite_bullet/'+item+'_bullet.png';
        bullet_sprite_list[item]=temp_img;
    }

    //
    this.client_data = client_data;//클라이언트 데이터(player와 bullet의 좌표,방향)를 참조하여 렌더링
    
    //게임화면 캔버스 크기의 비율을 기기의 window로 보여줄수있는, 화면이 잘리지않는 가장 큰 정사각형으로 보여줌
    function auto_scaile(){
        let max_side;
        if(window.innerWidth>window.innerHeight){
            max_side=window.innerHeight;
        }else{
            max_side=window.innerWidth;
        }
        my_canvas.style.width = max_side-PAD;
        my_canvas.style.height = max_side-PAD;
        ctx.font = '20px Arial';

        //게임화면 크기를 조절하면, 이벤트가 발생해서, 이벤트가 발생했을 때만 다시 캔버스 크기를 조정한다(윈도우 크기로)
        //브라우저 크기를 늘렸다 줄이면 캔버스크기가 맞게 변화한다.(Auto Scaling)
        /*
        window.addEventListener("resize",()=>{
            my_canvas.width = window.innerWidth;
            my_canvas.height = window.innerHeight;
            ctx.font = '20px Arial';

        });
        */
    }

    //클라이언트 데이터 객체에서 뽑아낸 좌표 데이터로 한 프레임을 화면에 그림. main함수에서 setInterval안에 넣어서 framarate와 함께 사용할 것.
    my_canvas.width=1000;
    my_canvas.height=1000;
    this.draw_client_data=function(){
        auto_scaile();
<<<<<<< HEAD
        ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
=======
        document.getElementById(PLAYER_LIST_ID).innerHTML = ''; //접속자 잔상 제거

>>>>>>> ff4ac33 ([22.12.05,전재호](feat) 접속자 표시 기능 추가)
        const player_pack = client_data.get_player_pack();
        const bullet_pack = client_data.get_bullet_pack();
        for(let player of player_pack){
            if(player.isalive){
                document.getElementById(PLAYER_LIST_ID).innerHTML += '<div>' + "🟢"+player.username + '</div>'; //접속자 표시
            }else{
                document.getElementById(PLAYER_LIST_ID).innerHTML += '<div>' + "🔴"+player.username + '</div>'; //접속자 표시
            }
            
            ctx.fillText(player.username+"/"+player.hp,player.x,player.y-10); //닉네임 표시
            draw_player(player);
        }
        for(let bullet of bullet_pack){    
            draw_bullet(bullet);
        }
    }

    function draw_player(player){
        //ctx.drawImage(player_img, 0, 0, img_width, img_height, 500, 200, img_width, img_height); 
        // window.innerWidth/21, window.innerHeight/10
        switch(player.direction){
            case 'down':
                ctx.drawImage(player_sprite_list[player.char], 0, 0, img_width, img_height, player.x, player.y,img_width, img_height);
                break;
            case 'up':
                ctx.drawImage(player_sprite_list[player.char], img_frame_index, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'left':8
                ctx.drawImage(player_sprite_list[player.char], img_frame_index * 2, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'right':
                ctx.drawImage(player_sprite_list[player.char], img_frame_index * 3, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
       }
       

    }

    function draw_bullet(bullet){
;
        switch(bullet.direction){
            case 'down':
                ctx.drawImage(bullet_sprite_list[bullet.char], 0, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'up':
                ctx.drawImage(bullet_sprite_list[bullet.char], img_frame_index, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'left':
                ctx.drawImage(bullet_sprite_list[bullet.char], img_frame_index * 2, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'right':
                ctx.drawImage(bullet_sprite_list[bullet.char], img_frame_index * 3, 0, img_width, img_height, bullet.x, bullet.y,img_width, img_height );
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
function Ui(my_socket,client_data){
    this.my_socket = my_socket;
    this.JOYSTICK_ID = "joyDiv"; //조이스틱과 연결하기 위한 인터페이스
    this.selected_char = 'none';

    JOYSTICK_ID=this.JOYSTICK_ID;
    
    selected_char = 'none';


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
        ui_title.innerHTML='Magic Blocker.io';

        ui_div.appendChild(ui_title);

        const ui_name_input = document.createElement('input');//닉네임 입력란
        ui_name_input.classList.add('ui');
        ui_name_input.id='username_input';
        ui_name_input.setAttribute('placeholder','Please Enter Nickname');
        ui_name_input.setAttribute('maxlength','8');

        ui_div.appendChild(ui_name_input);

        const ui_play_button = document.createElement('button');//게임 플레이 버튼
        ui_play_button.classList.add('ui');
        ui_play_button.id='play_button';
        ui_play_button.innerHTML='Play';

        ui_play_button.onclick = function(){
            let userid = document.getElementById("username_input").value.trim()
                    if(userid===""){ //이름을 입력하지않으면 기본이름으로 접속
                        userid="이름없는유저"+Math.floor(Math.random()*10000);
                    }
                    if(selected_char==="none"){//캐릭터를 선택하지않으면 랜덤으로 선택
                        selected_char=client_data.char_list_pick[Math.floor(Math.random()*client_data.char_list_pick.length)];
                    }
                    ui_div.style.display = 'none';
                    my_socket.emit('signIn', {
                        username: userid,
                        char:selected_char,
                    });
        }
    
        ui_div.appendChild(ui_play_button);

        const ui_how_to_play = document.createElement('button');//조작법 안내 버튼
        ui_how_to_play.classList.add('ui');
        ui_how_to_play.classList.add('how-to-play');
        ui_how_to_play.innerHTML='이동:WASD 발사:K';
        ui_div.appendChild(ui_how_to_play);


        //캐릭터 선택창
        const ui_char_select=document.createElement('div');
        ui_char_select.classList.add('ui');
        ui_char_select.classList.add('char-select');

        const ui_char_select_prompt=document.createElement('p');
        ui_char_select_prompt.id="char_select_prompt"

        function update_char_selected(){
            ui_char_select_prompt.id="char_selected_prompt_picked";
            ui_char_select_prompt.innerText="캐릭터"
            ui_char_select_prompt.innerText=client_data.charname_list[selected_char];
        }
        

        ui_char_select_prompt.innerText='캐릭터를 선택하세요';
    
        ui_char_select.id='char-select';
        ui_div.appendChild(ui_char_select);
        ui_char_select.appendChild(ui_char_select_prompt);

        //캐릭터 선택창 세부 캐릭터 선택 버튼 블록
        for(item of client_data.char_list_pick){
            //console.log(item);
            let temp_char_button = document.createElement('button');
            temp_char_button.id = item+'-id';
            temp_char_button.classList.add("char_button");
            temp_char_button.innerText=client_data.charname_list[item];

            const char_button_image = new Image();
            char_button_image.src = 'client/sprites/sprite_select/'+item+'_select.png';
            char_button_image.classList.add('char_button_image');
            ui_char_select.appendChild(temp_char_button);
            temp_char_button.appendChild(char_button_image);
        }
        
        //onclick 함수는 for문으로 순회가 불가능하다. (왠진모름) 클로저를 사용해야함. (*stackoverflow 참고)
        for(item of client_data.char_list_pick){
            (function(closure){
                document.getElementById(item+'-id').onclick=function(){
                    selected_char=closure;
                    update_char_selected();
                }  
            })(item);
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
        player_list.id = PLAYER_LIST_ID;

        ui_player_list_box.appendChild(player_list);

        //모바일 토글 버튼
        const joystick = document.getElementById(JOYSTICK_ID)
        const ui_mobile_toggle_prompt = document.createElement('div');
        ui_mobile_toggle_prompt.innerText = "모바일";
        
        
        const ui_mobile_toggle_outline = document.createElement('div'); 
        const ui_mobile_toggle_button = document.createElement('div');
        
        ui_mobile_toggle_prompt.id = "mobile_toggle_prompt";
        ui_mobile_toggle_outline.classList.add("mobile_toggle_outline");
        ui_mobile_toggle_button.classList.add("mobile_toggle_button");
        

        ui_mobile_toggle_outline.onclick = ()=>{
            ui_mobile_toggle_outline.classList.toggle('active');
            if(ui_mobile_toggle_outline.classList.contains('active')){
                console.log('active!');
                joystick.style.visibility='visible';
            }else{
                joystick.style.visibility='hidden';
                console.log('disabled!');
            }
            
        }
        ui_div.appendChild(ui_mobile_toggle_prompt);
        ui_div.appendChild(ui_mobile_toggle_outline);
        ui_mobile_toggle_outline.appendChild(ui_mobile_toggle_button);


        //모바일 전환 버튼
        /*
        ui_mobile_toggle.onclick = function(){
          const joystick = document.getElementById(JOYSTICK_ID)
          joystick.style.visibility='visible';
          mobile_attack_button.style.visibility='visible';
        };
        */

    }
}

//
//Main.js
//
const SCRIPT_LOAD_DELAY=1000;
const CLIENT_FRAME_RATE=5;
const PLAYER_LIST_ID='player_list';
const GAME_CANVAS_ID='gameCanvas';

setTimeout(() => {
    console.log("script start...");


    const socket_manager = new SocketConnection();

    const client_data = new ClientData(socket_manager.mySocket);
    client_data.set_socket_render_info();

    const ui_manager = new Ui(socket_manager.mySocket,client_data);
    ui_manager.create_login_ui();



    const render_manager = new Render(client_data);

    setInterval(render_manager.draw_client_data,CLIENT_FRAME_RATE);
    
    const keyboard_controller = new KeyboardController(socket_manager.mySocket);
    const square_mobile_controller = new SquareMobileController(socket_manager.mySocket);


}, SCRIPT_LOAD_DELAY);
//
//
//