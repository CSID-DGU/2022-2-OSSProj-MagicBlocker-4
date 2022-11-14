/**
 * Created by wilson on 2018-02-03.
 */
var Skill = function (playerId,posX,posY,direction) {
    var skill = {
        id: Math.random(),
        x: posX + 25,
        y: posY + 25,
        playerId: playerId,
        direction: direction,
        speed: 10,
        timer: 0,
        toRemove: false,
    };

    skill.update = function(){
        skill.updatePosition();
        if (skill.timer++ > 100)
        skill.toRemove = true;
    };

    skill.updatePosition = function(){
    if (skill.direction === 'right')
        skill.x += skill.speed;
    else if (skill.direction === 'left')
        skill.x -= skill.speed;
    else if (skill.direction === 'up')
        skill.y -= skill.speed;
    else if (skill.direction === 'down')
        skill.y += skill.speed;
    };

    return skill;
}