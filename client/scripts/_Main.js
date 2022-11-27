//
//Main.js
//
const SCRIPT_LOAD_DELAY=1000;
const CLIENT_FRAME_RATE=100;
setTimeout(() => {
    console.log("script start...");

    const ui_manager = new Ui();
    ui_manager.create_login_ui();
    ui_manager.popup();

    const socket_manager = new SocketConnection();
    
    const client_data = new ClientData(socket_manager.mySocket);
    client_data.set_socket_render_info();

    const render_manager = new Render(ui_manager.GAME_CANVAS_ID,client_data);

    render_manager.draw_client_data();
    //setInterval(render_manager.draw_client_data,CLIENT_FRAME_RATE);


    

}, SCRIPT_LOAD_DELAY);
//
//
//