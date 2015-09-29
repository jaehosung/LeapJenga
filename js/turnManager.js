/**
 * Created by Jaeho on 2015-08-30.
 */

var picked;
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

        if(!checkLose()&&picked) {
            turn = !turn;
            pre_time = cur_time;
            first_selected_block = null;
        }else{
            console.log(turnName()+"is lose")
        }

    }


            console.log("timer  "+ timer()+"  Turn : " + turnName()+"  " + picked);

    if(turn)
    {
        leap_material.color.r=256;
        leap_material.color.g=0;

    }else{
        leap_material.color.r=0;
        leap_material.color.g=256;
    }
};


// Todo :  이부분에 턴이 지나가고 무너졌을때 상대방이 선택하지 않으면 그 전사람이 지게 된다.
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
    if(turn===true) turnName="1p"; else turnName="2p";
    return turnName;
}

var pickWell = function(){
    if(first_selected_block!=null){
        if(Math.abs(first_selected_block.position.x)+Math.abs(first_selected_block.position.z)>4) {
            picked=true;
        }else
            picked = false;
    }
}