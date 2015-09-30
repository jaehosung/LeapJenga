/**
 * Created by Jaeho
 */

var turn = true;
var pre_time = new Date();
var cur_time;
var interval;
var end=false; // ��Ⱑ ���� ���� �ǹ��ϴ� ����

var loserName;

//setting
var time = 10000;


var setTurn = function(){
    timer();

    if(timer()>time){

        if(!normalLoseCheck()) {
            turn = !turn;
            pre_time = cur_time;
            first_selected_block = null;
        }else{
            end=true;
        }

    }


   turnColorSetting();
};

// #Todo : loser�� return���ִ� �Լ� normal mode
var loserName;

var normalLoseCheck = function(){
    if(!checkDestroy()&&pickWell()){
        return false;
    }else if(checkDestroy()&&first_selected_block!=null){
        loserName = getTurnName();
        return true;
    }else if(checkDestroy()&&first_selected_block==null){
        loserName = igetTurnName();
        return true;
    }
};

// #Todo : loser�� return�� �ִ� �Լ� hardmode
var hardLoserCheck = function(){

};


// Todo :  �̺κп� ���� �������� ���������� ������ �������� ������ �� ������� ���� �ȴ�.
var checkDestroy= function(){

   if(jenga[0][15].position.y<topHeight||jenga[1][15].position.y<topHeight||jenga[2][15].position.y<topHeight)
   {
       scene.setGravity(new THREE.Vector3( 0, -80, 0 ));
       return true;
   }else
    return false;

};



var getTurnName = function(){
    var turnName;
    if(turn===true) turnName="PLAYER 1"; else turnName="PLAYER 2";
    return turnName;
};
var igetTurnName = function(){
    var turnName;
    if(turn===true) turnName="PLAYER 2"; else turnName="PLAYER 1";
    return turnName;
};

var pickWell = function(){
    if(first_selected_block!=null){
        if(Math.abs(first_selected_block.position.x)+Math.abs(first_selected_block.position.z)>4) {
            return true;
        }else
            return false;
    }
};


var timer = function(){
    cur_time = new Date();
    interval = cur_time-pre_time;

    return interval;
};

//���ȭ���, leap sphere�� ���� ������ �ִ� �Լ�
var turnColorSetting = function(){
    if(!end) {
        if (turn) {
            renderer.setClearColor(0xff67ff);
        } else {
            renderer.setClearColor(0x44ffff);
        }
    }else{
        renderer.setClearColor(0x000000);
    }

    if(turn)
    {
        leap_material.color.r=256;
        leap_material.color.g=0;

    }else{
        leap_material.color.r=0;
        leap_material.color.g=256;
    }
}