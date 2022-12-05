//
//MobileController.js
//
function SquareMobileController(my_socket){
  const controller_canvas = document.createElement('canvas');
  const ctx = controller_canvas.getContext("2d");
  controller_canvas.id = "square_mobile_controller";
  controller_canvas.width = 2000;
  controller_canvas.height = 400;
  controller_canvas.style="border:solid;position:absolute";
  controller_canvas.addEventListener("touchstart",touchstart_handler);
  controller_canvas.addEventListener("touchend",touchend_handler);
  const BUTTON_SIZE = 100;
  const BUTTON_PAD = 100;

  let up = false;
  let down = false;
  let left = false;
  let right = false;
  let stop = false;
  let attack = false;

  //왼쪽 대각선 위 좌표
  const button_up = {x:150,y:50}//위
  const button_down = {x:150,y:250}//아래
  const button_left = {x:50,y:150}//왼
  const button_right = {x:250,y:150}//오른
  const button_attack = {x:1550,y:150}//공격
  
  function draw_button(button){
    ctx.fillRect(button.x,button.y,BUTTON_SIZE,BUTTON_SIZE);
  }
  ctx.fillStyle = "green";
  draw_button(button_up);
  draw_button(button_down);
  draw_button(button_left);
  draw_button(button_right);
  draw_button(button_attack);

  function isButtonClicked(button,x,y){
    if(x>button.x&&x<button.x+BUTTON_SIZE&&y>button.y&&button.y+BUTTON_SIZE){
      return true;
    }
  }

  function touchstart_handler(e){
    for(item of e.touches){
      if(isButtonClicked(button_up,item.clientX,item.clientY)){
        up=true;
        let down = false;
        let left = false;
        let right = false;
      }
      if(isButtonClicked(button_down,item.clientX,item.clientY)){
        down=true;
        let up = false;
        let left = false;
        let right = false;
      }
      if(isButtonClicked(button_left,item.clientX,item.clientY)){
        left=true;
        let up = false;
        let down = false;
        let right = false;
      }
      if(isButtonClicked(button_right,item.clientX,item.clientY)){
        right=true;
        let up = false;
        let down = false;
        let left = false;
      }
      if(isButtonClicked(button_attack,item.clientX,item.clientY)){
        attack=true;
      }
    }
  }
  function touchend_handler(e){
    for(item of e.changedTouches){

      if(isButtonClicked(button_up,item.clientX,item.clientY)){
        stop=true;
      }
      if(isButtonClicked(button_down,item.clientX,item.clientY)){
        stop=true;
      }
      if(isButtonClicked(button_left,item.clientX,item.clientY)){
        stop=true;
      }
      if(isButtonClicked(button_right,item.clientX,item.clientY)){
        stop=true;
      }
      if(isButtonClicked(button_attack,item.clientX,item.clientY)){
        stop=true;
      }
    }
  }
  document.body.appendChild(controller_canvas);

  setInterval(()=>{
    if(up===true){
      my_socket.emit('keyPress',{inputId:'joy_up',state:true});
    }
    if(down===true){
      my_socket.emit('keyPress',{inputId:'joy_down',state:true});
    }
    if(left===true){
      my_socket.emit('keyPress',{inputId:'joy_left',state:true});
    }
    if(right===true){
      my_socket.emit('keyPress',{inputId:'joy_right',state:true});
    }
    if(stop===true){
      my_socket.emit('keyPress',{inputId:'joy_stop'});
    }
  },CLIENT_FRAME_RATE)
}
