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
        //실시간으로 윈도우의 크기를 측정해서, mobile과 desktop에 다른 ui css 클래스를 적용한다.
        /*
        if(document.getElementById("mobile_toggle_outline").classList.contains('active')){ //모바일버튼을 보이게할지 숨길지
            document.getElementById("mobile_controller_id").style.visibility='visible';
            }else{
            document.getElementById("mobile_controller_id").style.visibility='hidden';
        }   
        */
           //윈도우 크기를 조절하면, 모바일 조이스틱을 표시할지 검사한다.
           if(window.innerWidth<700){
            //console.log("mobile!");
            //document.getElementById("mobile_toggle_outline").classList.add('active');
            document.getElementById("ui_chat_form").style.top="60%";
            document.getElementById("ui_chat_form").style.left="50%";
            document.getElementById("ui_chat_input").style.width="80vmin";
        }else{
            //console.log("desktop!!");
            //document.getElementById("mobile_toggle_outline").classList.remove('active');
            document.getElementById("ui_chat_form").style.top="50%";
            document.getElementById("ui_chat_form").style.left="15%";
            document.getElementById("ui_chat_input").style.width="40vmin";
        }

        let max_side;
        if(window.innerWidth>window.innerHeight){
            max_side=window.innerHeight;
        }else{
            max_side=window.innerWidth;
        }
        my_canvas.style.width = max_side-PAD;
        my_canvas.style.height = max_side-PAD;
        ctx.font = '20px Arial';
    }

 

        

    //클라이언트 데이터 객체에서 뽑아낸 좌표 데이터로 한 프레임을 화면에 그림. main함수에서 setInterval안에 넣어서 framarate와 함께 사용할 것.
    my_canvas.width=1000;
    my_canvas.height=1000;
    this.draw_client_data=function(){
        auto_scaile();
        document.getElementById(PLAYER_LIST_ID).innerHTML = ''; //접속자 잔상 제거

        ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
        const player_pack = client_data.get_player_pack();
        const bullet_pack = client_data.get_bullet_pack();
        for(let player of player_pack){
            if(player.isalive){
                document.getElementById(PLAYER_LIST_ID).innerHTML += '<div>' + "🟢"+player.username + '</div>'; //접속자 표시
            }else{
                document.getElementById(PLAYER_LIST_ID).innerHTML += '<div>' + "🔴"+player.username + '</div>'; //접속자 표시
            }
            ctx.fillStyle = "#1f004d";
            ctx.fillText(player.username+" "+player.cc, player.x-20, player.y-10); //닉네임 표시

            ctx.fillText(">"+player.chat,player.x-10,player.y+120);

            // 플레이어의 체력을 플레이어 이름 위에 표시
            ctx.strokeRect(player.x-20, player.y-50, 150, 18);
            ctx.fillStyle = "#00cc66";
            ctx.fillRect(player.x-20, player.y-50, player.hp*1.5, 18);
            // ctx.clearRect(player.x-20, player.y-50, player.hp*1.5, 18 )

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