//
//ClientData.js
//

function ClientData(mySocket){
    this.player_pack_client = [];
    this.bullet_pack_client = [];

    this.set_socket_render_info = function(){//mySocket(서버와 연결된 소켓)의 on함수를 오버라이드, 이벤트리스너를 추가함
        my_player_pack_client=this.player_pack_client;//아래 코드 참고. 새로 참조가 필요함
        my_bullet_pack_client=this.bullet_pack_client;

        my_player_pack_client.push({
            direction:'down',
            x:300,
            y:200,
        })
        /*
        mySocket.on('renderInfo',function(player_pack_server,bullet_pack_server){ //이 함수안에서 this는 ClientData 객체가 아니라 Socket 객체를 가리킨다. 따라서 새로 참조가 필요함
            for(let player of player_pack_server){
                my_player_pack_client.push(player);
            }
            for(let bullet of bullet_pack_server){
                my_bullet_pack_client.push(bullet);
            }
        });
        */
    };

    this.get_player_pack=function(){
        return this.player_pack_client;
    };
    this.get_bullet_pack=function(){
        return this.bullet_pack_client;
    };

}

    


//
//
//