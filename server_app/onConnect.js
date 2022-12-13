//
//onConnect.js
//
function onConnect(socket, userData) {
 
    let player = new Player(socket.id,userData.username,userData.char);
    playerList[socket.id] = player; //playerList는 id 여러개를 가지는 객체. player객체를 저장함

    socket.on('keyPress', function (data) {   //glitchy character movement

        //player.direction = data.direction;
        //키보드 조작
        if (data.inputId === 'right'){
           player.rightPress = data.state;
            //player.direction = 'right';
        }else if (data.inputId === 'left'){
           player.leftPress = data.state;
            //player.direction='left';
        }else if (data.inputId === 'up'){
           player.upPress = data.state;
            //player.direction='up';
        }else if (data.inputId === 'down'){
           player.downPress = data.state;
            //player.direction='down';
        }
        
        //모바일 조이스틱은 취소버튼이 없기때문에, 키보드와 다른 event로 움직임 고정현상을 방지하였다.
        if (data.inputId === 'joy_right'){
           player.leftPress=false;
           player.upPress=false;
           player.downPress=false;
           player.rightPress = data.state;
            //player.direction = 'right';
        }else if (data.inputId === 'joy_left'){
           player.rightPress=false;
           player.upPress=false;
           player.downPress=false;
           player.leftPress = data.state;
            //player.direction='left';
        }else if (data.inputId === 'joy_up'){
           player.leftPress=false;
           player.rightPress=false;
           player.downPress=false; 
           player.upPress = data.state;
            //player.direction='up';
        }else if (data.inputId === 'joy_down'){
           player.leftPress=false;
           player.upPress=false;
           player.rightPress=false; 
           player.downPress = data.state;
            //player.direction='down';
        }else if (data.inputId==='joy_stop'){
           player.leftPress=false;
           player.upPress=false;
           player.rightPress=false; 
           player.downPress =false;
        }

        if (data.inputId === 'shoot'&& playerList[socket.id] != null){
           player.isShoot=data.state;
           if(player.isShoot){
               setTimeout(()=>{player.isShoot=false},50);//모바일은 버튼업이 없기때문에, 공격을 토글하는 코드
           }
        }
   
            
       });

    socket.on('sendMsgToServer', function (data) {
        //let playerName = ("" + player.username);
        //toAllChat(playerName + ': ' + data);
        player.chat = data;
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