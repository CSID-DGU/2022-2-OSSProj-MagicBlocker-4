//
//MobileController.js
//
function SquareMobileController(my_socket){

  const mobile_controller_div=document.createElement("div");
  const up_button=document.createElement("button");
  const down_button=document.createElement("button");
  const left_button=document.createElement("button");
  const right_button=document.createElement("button");
  const stop_button=document.createElement("button");
  const attack_button=document.createElement("button");

  mobile_controller_div.id=MOBILE_CONTROLLER_ID;
  mobile_controller_div.style.visibility='hidden';
  document.body.appendChild(mobile_controller_div);
  mobile_controller_div.appendChild(up_button);
  mobile_controller_div.appendChild(down_button);

  mobile_controller_div.appendChild(left_button);
  mobile_controller_div.appendChild(stop_button);
  mobile_controller_div.appendChild(right_button);

  mobile_controller_div.appendChild(attack_button);

  up_button.style="width:3rem;height:3rem;position:absolute;top:65%;left:20%;border-radius: 10px;";
  down_button.style="width:3rem;height:3rem;position:absolute;top:83%;left:20%;border-radius: 10px;";
  left_button.style="width:3rem;height:3rem;position:absolute;top:74%;left:4%;border-radius: 10px;";
  right_button.style="width:3rem;height:3rem;position:absolute;top:74%;left:36%;border-radius: 10px;";

  stop_button.style="width:3rem;height:3rem;position:absolute;top:74%;left:20%;border-radius: 10px;";
  attack_button.style="width:3rem;height:3rem;position:fixed;top:74%;left:80%";

  up_button.onclick=()=>{
    my_socket.emit('keyPress',{inputId:'joy_up',state:true});
  }
  down_button.onclick=()=>{
    my_socket.emit('keyPress',{inputId:'joy_down',state:true});
  }
  left_button.onclick=()=>{
    my_socket.emit('keyPress',{inputId:'joy_left',state:true});
  }
  right_button.onclick=()=>{
    my_socket.emit('keyPress',{inputId:'joy_right',state:true});
  }
  stop_button.onclick=()=>{
    my_socket.emit('keyPress',{inputId:'joy_stop'});
  }
  attack_button.onclick=()=>{
    my_socket.emit("keyPress",{inputId:'shoot',state:true})
  }


}

/*
function SquareMobileController(my_socket){
  const controller_canvas = document.createElement('canvas');
  const ctx = controller_canvas.getContext("2d");
  controller_canvas.id = "square_mobile_controller";
  controller_canvas.width = window.innerWidth;
  controller_canvas.height = 300;
  controller_canvas.style="border:solid;position:absolute;top:70%;";
  controller_canvas.addEventListener("touchstart",touchstart_handler);
  controller_canvas.addEventListener("touchend",touchend_handler);
  const BUTTON_SIZE = 100;
  const BUTTON_PAD = 100;
  //왼쪽 대각선 위 좌표
  const button_vertical_pos = {x:150,y:50}//위
  const button_vertical_neg = {x:150,y:250}//아래
  const button_horizontal_neg = {x:50,y:150}//왼
  const button_horizontal_pos = {x:250,y:150}//오른
  const button_attack = {x:1550,y:150}//공격
  
  function draw_button(button){
    ctx.fillRect(button.x,button.y,BUTTON_SIZE,BUTTON_SIZE);
  }
  ctx.fillStyle = "green";
  draw_button(button_vertical_pos);
  draw_button(button_vertical_neg);
  draw_button(button_horizontal_neg);
  draw_button(button_horizontal_pos);
  draw_button(button_attack);

  function isButtonClicked(button,x,y){
    if(x>button.x&&x<button.x+BUTTON_SIZE&&y>button.y&&button.y+BUTTON_SIZE){
      return true;
    }
  }

  function touchstart_handler(e){
    for(item of e.touches){
      if(isButtonClicked(button_vertical_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_up',state:true});
      }
      if(isButtonClicked(button_vertical_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_down',state:true});
      }
      if(isButtonClicked(button_horizontal_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_left',state:true});
      }
      if(isButtonClicked(button_horizontal_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_right',state:true});
      }
      if(isButtonClicked(button_attack,item.clientX,item.clientY)){
        my_socket.emit("keyPress",{inputId:'shoot',state:true})
      }
    }
  }
  function touchend_handler(e){
    for(item of e.changedTouches){

      if(isButtonClicked(button_vertical_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_vertical_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_horizontal_neg,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_horizontal_pos,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
      if(isButtonClicked(button_attack,item.clientX,item.clientY)){
        my_socket.emit('keyPress',{inputId:'joy_stop'});
      }
    }
  }
  document.body.appendChild(controller_canvas);
}
/*
  if(stick=='E'){
    my_socket.emit('keyPress',{inputId:'joy_right',state:true});
  }else if(stick=='W'){
    my_socket.emit('keyPress',{inputId:'joy_left',state:true});
  }else if(stick=='N'){
    my_socket.emit('keyPress',{inputId:'joy_up',state:true});
  }else if(stick=='S'){
    my_socket.emit('keyPress',{inputId:'joy_down',state:true});
  }else if(stick=='C'){
    my_socket.emit('keyPress',{inputId:'joy_stop'});
  }
}
*/
/*
function MobileController(my_socket){
    let Joy1 = new JoyStick('joyDiv', {}, function(stickData) {
        let stick = stickData.cardinalDirection;
            //정지시 C
            if(stick=='E'){
              my_socket.emit('keyPress',{inputId:'joy_right',state:true});
            }else if(stick=='W'){
              my_socket.emit('keyPress',{inputId:'joy_left',state:true});
            }else if(stick=='N'){
              my_socket.emit('keyPress',{inputId:'joy_up',state:true});
            }else if(stick=='S'){
              my_socket.emit('keyPress',{inputId:'joy_down',state:true});
            }else if(stick=='C'){
              my_socket.emit('keyPress',{inputId:'joy_stop'});
            }
          });
}
*/