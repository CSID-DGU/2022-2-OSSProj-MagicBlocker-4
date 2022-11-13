/**
 * Created by wilson on 2018-02-03.
 */
var Bullet = function (playerId,posX,posY,direction) {
    var bullet = {
        id: Math.random(),
        x: posX + 25,
        y: posY + 25,
        playerId: playerId,
        direction: direction,
        speed: 10,
        timer: 0,
        toRemove: false,
    };

    bullet.update = function(){
        bullet.updatePosition();
        if (bullet.timer++ > 100)
        bullet.toRemove = true;
    };

    bullet.updatePosition = function(){
    if (bullet.direction === 'right')
        bullet.x += bullet.speed;
    else if (bullet.direction === 'left')
        bullet.x -= bullet.speed;
    else if (bullet.direction === 'up')
        bullet.y -= bullet.speed;
    else if (bullet.direction === 'down')
        bullet.y += bullet.speed;
    };

    return bullet;
}
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
        char: 'tyler1',

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
        if (player.leftPress)
            player.x -= player.speed;
        if (player.upPress)
            player.y -= player.speed;
        if (player.downPress)
            player.y += player.speed;
    };

    player.addPoint = function () {
        player.points++;
    };

    player.shootBullet = function (){
        var bullet = Bullet(player.id,player.x,player.y,player.lastPosition);
        bulletList[bullet.id] = bullet;
    };

    return player;
};


/**
 * Created by wilso on 2018-02-03.
 */

const SERVER_PORT = 8000;
const REFRESH_RATE = 25;

const X_STARTING_POS = 100;
const Y_STARTING_POS = 100;
const PLAYER_SPEED = 10;
const STARTING_DIR = 'down';
const MONGO_REPO = "Account";

/*
const RPS = {
    PAPER: "Paper",
    SCISSOR: "Scissors",
    ROCK: "Rock"
};
*/
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {});

//let mongoClient = require('mongodb').MongoClient;
//let url = "mongodb+srv://admin:password123456@cluster0.qsuxf.mongodb.net/mmorpgdb?retryWrites=true&w=majority";

let promise = require('promise');
//let dbo;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/cilent/index.html');
});

app.use('/cilent', express.static(__dirname + '/cilent'));

server.listen(process.env.PORT || SERVER_PORT);

console.log('Server Started! localhost: ' + SERVER_PORT);

let socketList = {};
let playerList = {};
let bulletList = {};

/*
mongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    dbo = db.db("mmorpg");

    dbo.collection(MONGO_REPO, function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });

});
*/

io.sockets.on('connection', function (socket) {

    socket.id = Math.random();
    socketList[socket.id] = socket;
    console.log("Socket " + socket.id + " has connected");

    socket.on('signUp', function (userData) {
        isValidNewCredential(userData).then(function (res) {
            if (res)
                insertCredential(userData);
            socket.emit('signUpResponse', { success: res });
        })
    });
/*
    socket.on('signIn', function (userData) {
        isCorrectCredential(userData).then(function (res) {
            if (res.valid)
                onConnect(socket, userData.username, res.points);
            socket.emit('signInResponse', { success: res.valid });
        })
    });
*/
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
            //let newValues = { $set: { points: player.points } };
            /*
            dbo.collection(MONGO_REPO).updateOne(query, newValues, function (err, res) {
                if (err) throw err;
                console.log("MongoDB Document Updated: " + res.result);
            });
            */
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

    let bulletPack = [];

    for (let i in bulletList) {

        if (bulletList[i].toRemove === true) {
            delete bulletList[i];
        }
        else{
            let bullet = bulletList[i];
            bullet.update();
            
            for (let i in playerList) {
                let player = playerList[i];
                if (bullet.x > player.x && bullet.x < player.x + 50 && bullet.y > player.y && bullet.y < player.y + 60){
                    if (player.id != bullet.playerId)
                    playerList[bullet.playerId].addPoint();
                }
            }


            bulletPack.push({
                x: bullet.x,
                y: bullet.y,
                playerId: bullet.playerId
            });
        }
    }
    

    for (let i in socketList) {
        let socket = socketList[i];
        socket.emit('renderInfo', pack, bulletPack);
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
/*
function isCorrectCredential(userData) {
    return new Promise(function (callback) {
        let query = {
            username: userData.username,
            password: userData.password
        };
        dbo.collection(MONGO_REPO).find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length != 0) {
                console.log("Matching Credential: " + JSON.stringify(result[0]));
                callback({ valid: true, points: result[0].points });
            }
            else {
                callback({ valid: false, points: null });
                console.log("incorrect user or password");
            }
        });
    });
}
*/
/*
function insertCredential(data) {
    let account = {
        username: data.username,
        password: data.password,
        points: 0
    };
    dbo.collection(MONGO_REPO).insertOne(account, function (err, res) {
        if (err) throw err;
        console.log("MongoDB Document Inserted: " + JSON.stringify(account));
    });
}
*/
function toAllChat(line) {
    for (let i in socketList)
        socketList[i].emit('addToChat', line);
}

function onConnect(socket, name, points) {

    let player = Player(socket.id, name, points);
    playerList[socket.id] = player;

    socket.on('keyPress', function (data) {            //glitchy character movement
        if (data.inputId === 'right')
            player.rightPress = data.state;
        else if (data.inputId === 'left')
            player.leftPress = data.state;
        else if (data.inputId === 'up')
            player.upPress = data.state;
        else if (data.inputId === 'down')
            player.downPress = data.state;

        if (data.inputId === 'shoot' && playerList[socket.id] != null)
            player.shootBullet();
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