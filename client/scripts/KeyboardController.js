//
//KeyboardController.js
//
const KEYCODE_UP=87; //W
const KEYCODE_DOWN=83; //S
const KEYCODE_LEFT=65; //A
const KEYCODE_RIGHT=68; //D
const KEYCODE_ATTACK=75; //L

function KeyboardController(mySocket){
    upkey=KEYCODE_UP;
    downkey=KEYCODE_DOWN;
    leftkey=KEYCODE_LEFT;
    rightkey=KEYCODE_RIGHT;
    attackkey=KEYCODE_ATTACK;
    
     //채팅기능을 사용하고있을때 키보드 입력 방지
function inTextField(event) {
  var elem = event.target || event.srcElement;
  if (elem.nodeType == 3)
      elem = elem.parentNode;

  return (elem.tagName == "TEXTAREA" ||
      (elem.tagName == "INPUT" && (elem.getAttribute("type") == "text")));
}



    document.onkeyup=function(event){
        if (event.keyCode === rightkey)
        mySocket.emit('keyPress', { inputId: 'right', state: false});
      else if (event.keyCode === downkey)
        mySocket.emit('keyPress', { inputId: 'down', state: false});
      else if (event.keyCode === leftkey)
        mySocket.emit('keyPress', { inputId: 'left', state: false});
      else if (event.keyCode === upkey)
          mySocket.emit('keyPress', { inputId: 'up', state: false});
      else if (event.keyCode === attackkey)
          mySocket.emit('keyPress', { inputId: 'shoot', state: false});
    } 
      
    document.onkeydown=function(event){
      if (!inTextField(event)) {//채팅창에 포커싱이 되어있을때, 방향키 입력이 안먹게 하는 코드
        if (event.keyCode === rightkey)
        mySocket.emit('keyPress', { inputId: 'right', state: true});
        else if (event.keyCode === downkey) 
          mySocket.emit('keyPress', { inputId: 'down', state: true});
        else if (event.keyCode === leftkey)
          mySocket.emit('keyPress', { inputId: 'left', state: true});
        else if (event.keyCode === upkey)
          mySocket.emit('keyPress', { inputId: 'up', state: true});
        else if (event.keyCode === attackkey)
          mySocket.emit('keyPress', { inputId: 'shoot', state: true});
      }
  }
}