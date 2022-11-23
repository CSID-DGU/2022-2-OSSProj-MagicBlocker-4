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
        p5canvas = createCanvas();
    }
    function windowResized() {
      resizeCanvas(window.innerWidth, window.innerHeight);
    }
    
    function draw_sprite(img,direction,x,y){ //스프라이트 방식으로 이미지를 잘라서 그림
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
        windowResized();
        background("#34965f");
        console.log(bulletDataList);
        //console.log(bulletDataList);
        for(player of playerDataList){
          draw_sprite(playerImg,player.direction,player.x,player.y);
        }
        for(bullet of bulletDataList){
          draw_sprite(bulletImg,bullet.direction,bullet.x,bullet.y);
        }
        
      
    }