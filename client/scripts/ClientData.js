//
//ClientData.js
//

function ClientData(mySocket){
    this.player_pack_client = [];
    this.bullet_pack_client = [];

    //스프라이트 상수
    this.img_frame_index = 100;
    this.img_width = 100;
    this.img_height = 100;

    //캐릭터 리스트
    this.char_list = ['soldier','ezreal','ako','ashe','zed','buzzi','dad','kitty','pepe','santa','monk']

    //플레이어가 선택한 캐릭터
    this.selected_char = 'none';

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