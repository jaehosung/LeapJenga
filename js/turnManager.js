/**
 * Created by Jaeho on 2015-08-30.
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
    if(timer()>time){
        turn=!turn;
        pre_time=cur_time;
        first_selected_block=null;
    }
    console.log(turn);

    if(turn)
    {
        leap_material.color.r=256;
        leap_material.color.g=0;

    }else{
        leap_material.color.r=0;
        leap_material.color.g=256;
    }
};

var checkLose= function(){
   if(jenga[0][15].position.y<15||jenga[1][15].position.y<15||jenga[2][15].position.y<15)
   {
       console.log(turn + "lose");
       end=true;
   }
};

var timer = function(){
    cur_time = new Date();
    interval = cur_time-pre_time;

    return interval;
};
