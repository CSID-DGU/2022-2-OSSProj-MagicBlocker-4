

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {});

let promise = require('promise');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(process.env.PORT || SERVER_PORT);

console.log('Server Started! localhost: ' + SERVER_PORT);

let socketList = {};
let playerList = {};
let skillList = {};


io.sockets.on('connection', function (socket) {

    socket.id = Math.random();
    socketList[socket.id] = socket;
    console.log("Socket " + socket.id + " has connected");

    socket.on('signIn',function (userData){
        onConnect(socket,userData.username,0);
    });

    socket.on('disconnect', function () {
        if (socketList[socket.id] != null) {
            delete socketList[socket.id];
            console.log(socket.id + " has disconnected");
        }
        let player = playerList[socket.id];
        if (player != null) {

            toAllChat(player.username + " has disconnected.");

            let query = {
                username: player.username
            };
            delete playerList[socket.id];
        }
    });
});

setInterval(function () {
    let pack = [];

    for (let i in playerList) {
        let player = playerList[i];
        player.updatePosition();
        pack.push({
            x: player.x,
            y: player.y,
            username: player.username,
            points: player.points,
            lastPosition: player.lastPosition,
            char: player.char
        });
    }

    let skillPack = [];

    for (let i in skillList) {

        if (skillList[i].toRemove === true) {
            delete skillList[i];
        }
        else{
            let skill = skillList[i];
            skill.update();
            
            for (let i in playerList) {
                let player = playerList[i];
                if (skill.x > player.x && skill.x < player.x + 50 && skill.y > player.y && skill.y < player.y + 60){
                    if (player.id != skill.playerId)
                    playerList[skill.playerId].addPoint();
                }
            }


            skillPack.push({
                x: skill.x,
                y: skill.y,
                playerId: skill.playerId
                
            });
        }
    }

    for (let i in socketList) {
        let socket = socketList[i];
        socket.emit('renderInfo', pack, skillPack);
        socket.emit('Time');
        
    }
}, REFRESH_RATE);

/*
function isValidNewCredential(userData) {
    return new Promise(function (callback) {
        let query = {
            username: userData.username
        };
        dbo.collection(MONGO_REPO).find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log("user credential not taken yet: " + JSON.stringify(userData));
                callback(true);
            }
            else {
                callback(false);
                console.log("User credential already exist: " + JSON.stringify(result));
            }
        });
    });
}
*/

function toAllChat(line) { //채팅시스템
    for (let i in socketList)
        socketList[i].emit('addToChat', line);
}

function onConnect(socket, name, points) {

    let player = Player(socket.id, name, points);
    playerList[socket.id] = player;

    socket.on('keyPress', function (data) {   //glitchy character movement
        if (data.inputId === 'right')
            player.rightPress = data.state;
        else if (data.inputId === 'left')
            player.leftPress = data.state;
        else if (data.inputId === 'up')
            player.upPress = data.state;
        else if (data.inputId === 'down')
            player.downPress = data.state;

        if (data.inputId === 'shoot' && playerList[socket.id] != null)
            player.shootSkill();
        else
            player.lastPosition = data.inputId;
    });

    socket.on('sendMsgToServer', function (data) {
        let playerName = ("" + player.username);
        toAllChat(playerName + ': ' + data);
    });

    socket.on('kms', function () {
        if (playerList[socket.id] != null) {
            delete playerList[socket.id];
        }
    });

    socket.on('revive', function () {
        if (playerList[socket.id] == null) {
            playerList[socket.id] = player;
        }
    });

    socket.on('charUpdate', function (data) {
        player.char = data.charName;
    });
}