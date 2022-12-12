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
    this.char_list_pick=['soldier','ezreal','ako','ashe','zed','buzzi','dad','kitty','pepe','santa','monk'] //플레이어가 선택할수있는 캐릭터 리스트
    this.char_list = ['soldier','ezreal','ako','ashe','zed','buzzi','dad','kitty','pepe','santa','monk','ghost'] //모든 캐릭터 리스트. 이스터에그, 고스트 포함
    this.charname_list = {
        soldier:"군인",
        ezreal:"마법탐험가",
        ako:"아코",
        ashe:"얼음궁수",
        zed:"그림자암살자",
        buzzi:"물풍선곰돌이",
        dad:"아빠아들",
        kitty:"리본고양이",
        pepe:"개붕이",
        santa:"산타클로스",
        monk:"스님",
    }

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