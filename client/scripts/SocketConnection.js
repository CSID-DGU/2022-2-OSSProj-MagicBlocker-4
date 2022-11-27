//
//SocketConnection.js
//require socket.io.js

function SocketConnection(){
    this.mySocket = io();//서버와 연결하는 함수. 소켓을 반환

    this.mySocket.on('connect',()=>{ //소켓이 연결되었을때 callback
        console.log("connected!!");
    });
    this.mySocket.on('error',()=>{ //소켓 연결 실패시 callback
        console.log("socket error!!");
    });
}