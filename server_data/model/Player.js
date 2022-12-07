//
//Player.js
//플레이어 클래스
 function Player(id, name, char) {
    this.type = 'player';
    //게임 시작 시 고정된 위치에서 플레이어가 소환
    //this.x = X_STARTING_POS;
    //this.y = Y_STARTING_POS;
    this.x = Math.random()*1000;
    this.y = Math.random()*500;
    this.id = id;
    this.username = name;
    this.char = char;//bullet에게 전달. bullet을 쏜 주인이 누구인지 가리킴
    this.direction = STARTING_DIR;
    this.hp=100;
    this.isalive=true;
    isalive = this.isalive;


    this.cooldown = 0;

    this.rightPress = false;
    this.leftPress=false;
    this.downPress=false;
    this.upPress=false;
    this.isShoot=false;
    
    this.speed=PLAYER_SPEED;
    
    this.updatePosition = function () {
        
        if (this.rightPress){
            this.x += this.speed;
            this.direction='right';
            //console.log('right!!!')
        }                
        else if (this.leftPress){
            this.x -= this.speed;
            this.direction='left';
            //console.log('left!!!')
        }   
        else if (this.upPress){
            this.y -= this.speed;
            this.direction='up';
            //console.log('up!!!')
        }
        else if (this.downPress){
            this.y += this.speed;
            this.direction='down';
            //console.log('down!!!')
        }
        if(this.x<0){
            this.x+=this.speed;
        }
        if(this.x>MAP_WIDTH-MAP_PAD){
            this.x-=this.speed;
        }
        if(this.y<0){
            this.y+=this.speed;
        }
        if(this.y>MAP_HEIGHT-MAP_PAD){
            this.y-=this.speed;
        }
    };


    this.shootBullet = function (){
        if(this.isShoot&&this.cooldown===0&&this.isalive===true){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,this.char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }

        /*류강현 클래스 투사체 코드 
        if(this.isShoot&&this.cooldown===0&&char=="ako"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="ashe"){
            let bullet = new Ashe(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="buzzi"){
            let bullet = new Buzzi(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="dad"){
            let bullet = new Dad(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="ezreal"){
            let bullet = new Ezreal(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="kitty"){
            let bullet = new Kitty(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="monk"){
            let bullet = new Monk(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="pepe"){
            let bullet = new Pepe(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="santa"){
            let bullet = new Santa(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="soldier"){
            let bullet = new Soldier(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="zed"){
            let bullet = new Zed(this.id,this.x,this.y,this.direction,host_char);

        if(this.isShoot&&this.cooldown===0){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,this.char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }
        */
        
        
        
    };

    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
    }

    this.die = function(){
        this.isalive=false;
        this.char='ghost';
    }

};