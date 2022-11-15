/**
 * Created by wilson on 2018-02-03.
 */
var Player = function (id, name, points) {
    var player = {
        x: X_STARTING_POS,
        y: Y_STARTING_POS,
        id: id,
        username: name,
        points: points,
        char: 'warrior',
        direction:'down',

        rightPress: false,
        leftPress: false,
        upPress: false,
        downPress: false,
        lastPosition: STARTING_DIR,

        speed: PLAYER_SPEED
    };

    player.updatePosition = function () {
        if (player.rightPress)
            player.x += player.speed;
            player.direction='right';
        if (player.leftPress)
            player.x -= player.speed;
            player.direction='left';
        if (player.upPress)
            player.y -= player.speed;
            player.direction='up';
        if (player.downPress)
            player.y += player.speed;
            player.direction='down';
    };

    player.addPoint = function () {
        player.points++;
    };

    player.shootBullet = function (){
        let bullet = Bullet(player.id,player.x,player.y,'right');
        bulletList[bullet.id] = bullet;
    };

    return player;
};

