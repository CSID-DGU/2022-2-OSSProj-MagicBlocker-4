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
    this.char = char;
    this.direction = STARTING_DIR;

    host_char = char;//bullet에게 전달. bullet을 쏜 주인이 누구인지 가리킴

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
            
    };


    this.shootBullet = function (){
        if(this.isShoot&&this.cooldown===0&&char=="ako"){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="ashe"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="buzzi"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="dad"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="ezreal"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="kitty"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="monk"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="pepe"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="santa"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="soldier"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }else if(this.isShoot&&this.cooldown===0&&char=="zed"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
            console.log(bullet.char);
        }
        
        
        
    };

    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
    }


};