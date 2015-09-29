/**
 * Created by Jaeho
 */

var turn = true;
var pre_time = new Date();
var cur_time;
var interval;
var end=false;


//setting
var time = 10000;


var setTurn = function(){
    timer();
    pickWell();


    if(timer()>time){

        if(!checkLose()&&pickWell()) {
            turn = !turn;
            pre_time = cur_time;
            first_selected_block = null;
        }else{
            console.log(turnName()+"is lose")
            end=true;
        }

    }


    if(!end) {
        //console.log("timer  "+ timer()+"  Turn : " + turnName()+"  " + picked);
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
};


// Todo :  �̺κп� ���� �������� ���������� ������ �������� ������ �� ������� ���� �ȴ�.
var checkLose= function(){

   if(jenga[0][15].position.y<topHeight||jenga[1][15].position.y<topHeight||jenga[2][15].position.y<topHeight)
   {
       scene.setGravity(new THREE.Vector3( 0, -80, 0 ));
       console.log(turnName() + " is lose");
       end=true;
       return true;
   }else
    return false;

};

var timer = function(){
    cur_time = new Date();
    interval = cur_time-pre_time;

    return interval;
};

var turnName = function(){
    var turnName;
    if(turn===true) turnName="PLAYER 1"; else turnName="PLAYER 2";
    return turnName;
}

var pickWell = function(){
    if(first_selected_block!=null){
        if(Math.abs(first_selected_block.position.x)+Math.abs(first_selected_block.position.z)>4) {
            return true;
        }else
            return false;
    }
}