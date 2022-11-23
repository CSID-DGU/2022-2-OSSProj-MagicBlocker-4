/**
 * Player 클래스
 */
 function Player(id, name, points) {
    this.type = 'player';
    this.x = X_STARTING_POS;
    this.y = Y_STARTING_POS;
    this.id = id;
    this.username = name;
    this.points = points;
    this.char = STARTING_CHAR;
    this.direction = STARTING_DIR;

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

    this.addPoint = function () {
        this.points++;
    };

    this.shootBullet = function (){
        if(this.isShoot&&this.cooldown===0){
            let bullet = new Projectile(this.id,this.x,this.y,this.direction);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }
        
    };
    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
    }
};