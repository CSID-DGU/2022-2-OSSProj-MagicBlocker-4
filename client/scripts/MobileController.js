//
//MobileController.js
//
function MobileController(mySocket){
    let Joy1 = new JoyStick('joyDiv', {}, function(stickData) {
        let stick = stickData.cardinalDirection;
            //정지시 C
            if(stick=='E'){
              mySocket.emit('keyPress',{inputId:'joy_right',state:true});
            }else if(stick=='W'){
              mySocket.emit('keyPress',{inputId:'joy_left',state:true});
            }else if(stick=='N'){
              mySocket.emit('keyPress',{inputId:'joy_up',state:true});
            }else if(stick=='S'){
              mySocket.emit('keyPress',{inputId:'joy_down',state:true});
            }else if(stick=='C'){
              mySocket.emit('keyPress',{inputId:'joy_stop'});
            }
          });
}