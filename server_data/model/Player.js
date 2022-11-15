
/**
 * Player 클래스
 */
 function Player(id, name, points) {
    this.x = X_STARTING_POS;
    this.y = Y_STARTING_POS;
    this.id = id;
    this.username = name;
    this.points = points;
    this.char = 'warrior';
    this.direction = 'down';

    this.rightPress = false;
    this.leftPress=false;
    this.downPress=false;
    this.upPress=false;
    
    this.lastPosition=STARTING_DIR;
    this.speed=PLAYER_SPEED;
    
    this.updatePosition = function () {
        if (this.rightPress){
            this.x += this.speed;
            this.direction='right';
            console.log('right!!!')
        }                
        if (this.leftPress){
            this.x -= this.speed;
            this.direction='left';
            console.log('left!!!')
        }   
        if (this.upPress){
            this.y -= this.speed;
            this.direction='up';
            console.log('up!!!')
        }
        if (this.downPress){
            this.y += this.speed;
            this.direction='down';
            console.log('down!!!')
        }
            
    };

    this.addPoint = function () {
        this.points++;
    };

    this.shootBullet = function (){
        let bullet = new Projectile(this.id,this.x,this.y,this.direction);
        bulletList[bullet.id] = bullet;
    };      
};
