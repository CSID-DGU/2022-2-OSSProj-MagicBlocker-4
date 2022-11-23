//
// Connect.js
//

console.log('로딩중');

setTimeout(function(){
    console.log('로딩완료');
    //io()를 실행하는 순간, 서버로 연결을 시도하고, 소켓객체를 생성한다. 이걸 socket이라는 변수에 저장하였음.   
    var socket = io(); 

    //socket에 저장된 소켓의 메서드 사용가능

    socket.on('connect',()=>{ 
        console.log('connected!'); //연결이 성공하면 콘솔출력
    });

    socket.on('error', (error)=>{
        console.log(`소켓 에러 발생: ${error}`);
    });

    Ui.create_login_ui() //ui.js 로그인 ui 동적생성

    var charImg = new Image();
    //charImg.src = 'client/sprites/warrior.png';

    //상하좌우의 플레이어 이미지가 다르므로, 상하좌우가 붙어있는 200*60px 의 캐릭터 이미지를 잘라서 씀
    //imgFrameIndex를 기준으로 canvas가 이미지를 상하좌우를 기준으로 잘라서 가져옴
    //크기를 70으로 키우고, 정사각형으로 바꾸었음.

    var imgFrameIndex = 100;
    var imgWidth = 100;
    var imgHeight = 100;

    var ctx = document.getElementById('myCanvas').getContext("2d"); 
    //게임화면 캔버스 크기를 window크기에 맞춰서 자동변환.
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    //게임화면 크기를 조절하면, 이벤트가 발생해서, 이벤트가 발생했을 때만 다시 캔버스 크기를 조정한다(윈도우 크기로)
    //브라우저 크기를 늘렸다 줄이면 캔버스크기가 맞게 변화한다.(Auto Scaling)
    window.addEventListener("resize",()=>{
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.font = '30px Arial';
    });
    //canvas로 렌더링작업(이미지 불러오기 등)을 하려면 getContext를 2d로 지정해야한다.
    //p5.js 로 교체하고나면 필요없는 코드.
    ctx.font = '30px Arial';

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

},1000);

//
// Keyboard.js
//
Keyboard={
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
// Render_p5.js
//
    //렌더링 전역변수
    renderPlayerList = [];
    renderBulletList = []; 
    renderList=[];
    let ro;
    let rq;

    function preload(){
        playerImg = loadImage("client/sprites/knight.png");
        bulletImg = loadImage("client/sprites/bullet_knight.png");
    }
    function setup(){
        p5canvas = createCanvas(800,450);
    }
    
    function draw_sprite(img,direction,x,y){
        let imgWidth=100;
        if(direction==='down'){
            image(img,x,y,imgWidth,imgWidth,0,0,imgWidth,imgWidth); //1번째 앞쪽;
        }else if(direction==='up'){
            image(img,x,y,imgWidth,imgWidth,imgWidth*1,0,imgWidth,imgWidth); //2번째 뒷쪽
        }else if(direction==='left'){
            image(img,x,y,imgWidth,imgWidth,imgWidth*2,0,imgWidth,imgWidth); //3번째 왼쪽
        }else if(direction==='right'){
            image(img,x,y,imgWidth,imgWidth,imgWidth*3,0,imgWidth,imgWidth); //4번째 오른쪽
        }
    }

    
    function playerData(x,y,direction){
      this.x=x;
      this.y=y;
      this.direction=direction;
    }
    function bulletData(x,y,direction){
      this.x=x;
      this.y=y;
      this.direction=direction;
    }
    playerDataList = [];
    bulletDataList = [];

    function draw(){
        background(220);
        console.log(bulletDataList);
        //console.log(bulletDataList);
        for(player of playerDataList){
          draw_sprite(playerImg,player.direction,player.x,player.y);
        }
        for(bullet of bulletDataList){
          draw_sprite(bulletImg,bullet.direction,bullet.x,bullet.y);
        }
        
      
    }
//
// Ui.js
//
Ui={

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


