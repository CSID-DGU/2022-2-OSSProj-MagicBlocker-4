//
//KeyboardController.js
//
const KEYCODE_UP=87; //W
const KEYCODE_DOWN=83; //S
const KEYCODE_LEFT=65; //A
const KEYCODE_RIGHT=68; //D
const KEYCODE_ATTACK=75; //L

function Keyboard(){
    this.mySocket=null;

    this.upkey=KEYCODE_UP;
    this.downkey=KEYCODE_DOWN;
    this.leftkey=KEYCODE_LEFT;
    this.rightkey=KEYCODE_RIGHT;
    this.attackkey=KEYCODE_ATTACK;

    this.show=function(){
      console.log(this.upkey);
    };

    this.getKeyDown = function(e){
      //if (!inTextField(event)) //채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
          if (e.keyCode === this.rightkey)
              this.mySocket.emit('keyPress', { inputId: 'right', state: true});
          else if (e.keyCode === this.downkey)
              this.mySocket.emit('keyPress', { inputId: 'down', state: true});
          else if (e.keyCode === this.leftkey)
            this.mySocket.emit('keyPress', { inputId: 'left', state: true});
          else if (e.keyCode === this.upkey)
            this.mySocket.emit('keyPress', { inputId: 'up', state: true});
          else if (e.keyCode === this.attackkey)
            this.mySocket.emit('keyPress', { inputId: 'shoot', state: true});
      };

    this.getKeyUp=function(e){
    //if (!inTextField(event)) {//채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
            if (e.keyCode === this.rightkey)
              this.mySocket.emit('keyPress', { inputId: 'right', state: false});
            else if (e.keyCode === this.downkey) 
              this.mySocket.emit('keyPress', { inputId: 'down', state: false});
            else if (e.keyCode === this.leftkey)
              this.mySocket.emit('keyPress', { inputId: 'left', state: false});
            else if (e.keyCode === this.upkey)
              this.mySocket.emit('keyPress', { inputId: 'up', state: false});
            else if (e.keyCode === this.attackkey)
              this.mySocket.emit('keyPress', { inputId: 'shoot', state: false});
            }
   }