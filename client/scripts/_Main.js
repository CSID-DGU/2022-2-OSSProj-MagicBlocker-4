//
//Main.js
//
const SCRIPT_LOAD_DELAY=1000;
const CLIENT_FRAME_RATE=5;
const PLAYER_LIST_ID='player_list';
const GAME_CANVAS_ID='gameCanvas';
const MOBILE_CONTROLLER_ID='mobile_controller_div';


setTimeout(() => {
    console.log("script start...");
    mobile_pinch_block();

    const socket_manager = new SocketConnection();

    const client_data = new ClientData(socket_manager.mySocket);
    client_data.set_socket_render_info();

    const ui_manager = new Ui(socket_manager.mySocket,client_data);
    ui_manager.create_login_ui();



    const render_manager = new Render(client_data);

    setInterval(render_manager.draw_client_data,CLIENT_FRAME_RATE);
    
    const keyboard_controller = new KeyboardController(socket_manager.mySocket);
    const square_mobile_controller = new SquareMobileController(socket_manager.mySocket);


}, SCRIPT_LOAD_DELAY);

function mobile_pinch_block(){
    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
             event.preventDefault(); 
           } 
       }, false);
   
   var lastTouchEnd = 0; 
   
   document.documentElement.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
             event.preventDefault(); 
           } lastTouchEnd = now; 
       }, false);
}
//
//
//