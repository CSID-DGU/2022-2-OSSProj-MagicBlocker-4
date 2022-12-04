//
// Ui.js

//
function Ui(my_socket,client_data){
    this.my_socket = my_socket;
    this.GAME_CANVAS_ID = "gameCanvas";//렌더링매니저와 연결하기 위한 인터페이스    
    this.JOYSTICK_ID = "joyDiv"; //조이스틱과 연결하기 위한 인터페이스
    this.selected_char = 'none';

    GAME_CANVAS_ID=this.GAME_CANVAS_ID;//생성자 내부함수는 this에 접근 불가
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
            temp_char_button.innerText=client_data.charname_list[item];

            const char_button_image = new Image();
            char_button_image.src = 'client/sprites/sprite_select/'+item+'_select.png';
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
          mobile_attack_button.style.visibility='visible';
        };


        this.popup = function(){ //팝업 UI
            const popUpBox = document.createElement("div");
            // popUpBox.innerHTML="pop up!!!";
            document.body.appendChild(popUpBox);
        }
    }
}
