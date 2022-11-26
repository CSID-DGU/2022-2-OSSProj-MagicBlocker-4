//
//Main.js
//
const waitTime=1000;
setTimeout(() => {
    console.log("script start...");

    const ui = new Ui();
    ui.create_login_ui();
    
    ui.popUp();


    const socketManager = new Socket();

    

}, waitTime);
//
//
//