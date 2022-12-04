//
//Render.js
//


function Render(canvas_id,client_data){

    this.canvas_id = canvas_id;//렌더링객체를 캔버스와 연결해야 사용가능    
    this.my_canvas=document.getElementById(canvas_id);
    const my_canvas = this.my_canvas;
    const ctx = my_canvas.getContext("2d"); //내부 함수가 사용하기 위한 참조
    
    //스프라이트 자르기 상수
    img_frame_index=client_data.img_frame_index;
    img_width = client_data.img_width;
    img_height = client_data.img_height;

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

    //게임화면 캔버스 크기를 window크기에 맞춰서 자동변환.
    function auto_scaile(){
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
        ctx.font = '30px Arial';

        //게임화면 크기를 조절하면, 이벤트가 발생해서, 이벤트가 발생했을 때만 다시 캔버스 크기를 조정한다(윈도우 크기로)
        //브라우저 크기를 늘렸다 줄이면 캔버스크기가 맞게 변화한다.(Auto Scaling)
        window.addEventListener("resize",()=>{
            my_canvas.width = window.innerWidth;
            my_canvas.height = window.innerHeight;
            ctx.font = '30px Arial';

        });
    }

    //클라이언트 데이터 객체에서 뽑아낸 좌표 데이터로 한 프레임을 화면에 그림. main함수에서 setInterval안에 넣어서 framarate와 함께 사용할 것.
    this.draw_client_data=function(){
        auto_scaile();
        
        const player_pack = client_data.get_player_pack();
        const bullet_pack = client_data.get_bullet_pack();
        for(let player of player_pack){
            ctx.fillText(player.username + ": " ,player.x,player.y); //닉네임 표시
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