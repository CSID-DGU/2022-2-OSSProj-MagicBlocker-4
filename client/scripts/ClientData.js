//
//ClientData.js
//

function ClientData(mySocket){
    this.player_pack_client = [];
    this.bullet_pack_client = [];
    player_pack_client=this.player_pack_client;
    bullet_pack_client=this.bullet_pack_client;

    this.set_socket_render_info = function(){//mySocket(서버와 연결된 소켓)의 on함수를 오버라이드, 이벤트리스너를 추가함

        mySocket.on('renderInfo',function(player_pack_server,bullet_pack_server){
            player_pack_client=[...player_pack_server];
            bullet_pack_client=[...bullet_pack_server]; //얕은복사(shallow copy 로 참조)
        });
    };
    this.get_player_pack=function(){
        return player_pack_client;
    }
    this.get_bullet_pack=function(){
        return bullet_pack_client;
    }
}

    


//
//
//