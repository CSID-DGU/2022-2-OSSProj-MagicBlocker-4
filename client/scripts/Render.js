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