//
// Keyboard.js
//
Keyboard={
    mySocket:null,
    upkey:87,//w
    downkey:83,//s
    leftkey:65,//a
    rightkey:68,//r
    attackkey:75,//k

    control_down:function(event){
        //if (!inTextField(event)) //채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
            if (event.keyCode == rightkey) 
                mySocket.emit('keyPress', { inputId: 'right', state: true});
            else if (event.keyCode == downkey)
                mySocket.emit('keyPress', { inputId: 'down', state: true});
            else if (event.keyCode == leftkey)
                mySocket.emit('keyPress', { inputId: 'left', state: true});
            else if (event.keyCode == upkey)
                mySocket.emit('keyPress', { inputId: 'up', state: true});
            else if (event.keyCode == attackkey)
                mySocket.emit('keyPress', { inputId: 'shoot', state: true});
        },
    control_up:function(event){
    //if (!inTextField(event)) {//채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
            if (event.keyCode == rightkey)
                mySocket.emit('keyPress', { inputId: 'right', state: false });
            else if (event.keyCode == downkey) 
                mySocket.emit('keyPress', { inputId: 'down', state: false });
            else if (event.keyCode == leftkey)
                mySocket.emit('keyPress', { inputId: 'left', state: false });
            else if (event.keyCode == upkey)
                mySocket.emit('keyPress', { inputId: 'up', state: false });
            else if (event.keyCode == attackkey)
                mySocket.emit('keyPress', { inputId: 'shoot', state: false });
            }
    
}