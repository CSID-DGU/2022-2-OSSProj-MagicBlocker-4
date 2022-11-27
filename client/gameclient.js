//
//ClientData.js
//

function ClientData(mySocket){
    this.player_pack_client = [];
    this.bullet_pack_client = [];

    this.set_socket_render_info = function(){//mySocket(서버와 연결된 소켓)의 on함수를 오버라이드, 이벤트리스너를 추가함
        my_player_pack_client=this.player_pack_client;//아래 코드 참고. 새로 참조가 필요함
        my_bullet_pack_client=this.bullet_pack_client;

        my_player_pack_client.push({
            direction:'down',
            x:300,
            y:200,
        })
        /*
        mySocket.on('renderInfo',function(player_pack_server,bullet_pack_server){ //이 함수안에서 this는 ClientData 객체가 아니라 Socket 객체를 가리킨다. 따라서 새로 참조가 필요함
            for(let player of player_pack_server){
                my_player_pack_client.push(player);
            }
            for(let bullet of bullet_pack_server){
                my_bullet_pack_client.push(bullet);
            }
        });
        */
    };

    this.get_player_pack=function(){
        return this.player_pack_client;
    };
    this.get_bullet_pack=function(){
        return this.bullet_pack_client;
    };

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


function Render(canvas_id,client_data){

    this.canvas_id = canvas_id;//렌더링객체를 캔버스와 연결해야 사용가능    
    this.my_canvas=document.getElementById(canvas_id);
    const my_canvas = this.my_canvas; //내부 함수가 사용하기 위한 참조
    
    //스프라이트 자르기 상수
    const img_frame_index = 100;
    const img_width = 100;
    const img_height = 100;

    //Render 생성자 호출시 미리 이미지 객체를 생성 (이미지를 불러와서 Render 객체에 저장). (렌더링 성능 최적화)
    const player_img = new Image();
    player_img.src = 'client/sprites/knight.png';

    const bullet_img = new Image();
    bullet_img.src = 'client/sprites/bullet_knight.png';
    //
    

    this.client_data = client_data;//클라이언트 데이터(player와 bullet의 좌표,방향)를 참조하여 렌더링
    const client_data = this.client_data;
    
    this.draw_client_data=function(){
        const player_pack = client_data.get_player_pack();
        const bullet_pack = client_data.get_bullet_pack();
        for(let player of player_pack){
            draw_player(player);
        }
        /*
        for(let bullet of bullet_pack){
            draw_bullet(bullet);
        }
        */
        console.log('drawing!');
    }

    function draw_player(player){

       switch(player.direction){
            case 'down':
                my_canvas.drawImage(player_img, 0, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'up':
                my_canvas.drawImage(player_img, img_frame_index, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'left':
                my_canvas.drawImage(player_img, img_frame_index * 2, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
            case 'right':
                my_canvas.drawImage(player_img, img_frame_index * 3, 0, img_width, img_height, player.x, player.y, img_width, img_height);
                break;
       }
    }

    function drawBullet(bullet){

        switch(bullet.direction){
            case 'down':
                canvas.drawImage(bullet_img, 0, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'up':
                canvas.drawImage(bullet_img, img_frame_index, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'left':
                canvas.drawImage(bullet_img, img_frame_index * 2, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
                break;
            case 'right':
                canvas.drawImage(bullet_img, img_frame_index * 3, 0, img_width, img_height, bullet.x, bullet.y, img_width, img_height);
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
function Ui(){

    this.GAME_CANVAS_ID = "gameCanvas";//렌더링매니저와 연결하기 위한 인터페이스

    this.create_login_ui=function(){

        //게임 화면 생성
        const game_div = document.createElement('div');//game 플레이화면의 모든 요소들을 포함하는 부모div 
        game_div.id='game_div';
        document.body.appendChild(game_div);

        const game_canvas = document.createElement('canvas');//게임 렌더링 캔버스
        game_canvas.id = "gameCanvas";
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
const CLIENT_FRAME_RATE=100;
setTimeout(() => {
    console.log("script start...");

    const ui_manager = new Ui();
    ui_manager.create_login_ui();
    ui_manager.popup();

    const socket_manager = new SocketConnection();
    
    const client_data = new ClientData(socket_manager.mySocket);
    client_data.set_socket_render_info();

    const render_manager = new Render(ui_manager.GAME_CANVAS_ID,client_data);

    render_manager.draw_client_data();
    //setInterval(render_manager.draw_client_data,CLIENT_FRAME_RATE);


    

}, SCRIPT_LOAD_DELAY);
//
//
//