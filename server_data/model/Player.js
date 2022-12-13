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
    this.host_char = char;
    this.slowRate=1;
    slowRate = this.slowRate;
    this.isSlowed=false;
    this.slowTime=0;
    this.cooldown = 0;

    this.rightPress = false;
    this.leftPress=false;
    this.downPress=false;
    this.upPress=false;
    this.isShoot=false;
    this.cc="";
    this.speed=PLAYER_SPEED;
    
    this.chat = "";//채팅기능
    this.chat_duration = CHAT_DURATION; //채팅지속시간

    this.updatePosition = function () {
        //onsole.log("slowTime:"+this.slowTime);
        //console.log("slowRate:"+this.slowRate);
        //console.log("speed:"+this.speed);

        if(this.chat_duration>-100){
            this.chat_duration-=1;
        }

        if(this.slowTime>0){
            if(this.isSlowed==false){
                this.speed=this.speed*this.slowRate;
                this.isSlowed=true;
                this.cc="느려짐!";
            }
        }else{
            this.speed = PLAYER_SPEED;
            this.cc="";
            this.isSlowed=false;
        }
        
        if(this.chat!=="" && this.chat_duration<0){
            this.chat="";
            this.chat_duration=CHAT_DURATION;
        }

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
        /*
        if(this.isShoot&&this.cooldown===0&&this.isalive===true){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,this.char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }
        */


        if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="ako"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="ashe"){
            let bullet = new Ashe(this.id,this.x,this.y,this.direction,this.host_char,false);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="buzzi"){
            let bullet = new Buzzi(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="dad"){
            let bullet = new Dad(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="ezreal"){
            let bullet = new Ezreal(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="kitty"){
            let bullet = new Kitty(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="monk"){
            let bullet = new Monk(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="pepe"){
            let bullet = new Pepe(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="santa"){
            let bullet = new Santa(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="soldier"){
            let bullet = new Soldier(this.id,this.x,this.y,this.direction,this.host_char,false);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="zed"){
            let bullet = new Zed(this.id,this.x,this.y,this.direction,this.host_char,false);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
    }
        
        
        
    };

    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
        if(this.slowTime>0){
            this.slowTime-=1;
        }
    }

    this.die = function(){
        this.isalive=false;
        this.char='ghost';
    }

};