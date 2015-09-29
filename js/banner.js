/**
 * Created by Jay Sung
 */

var updateBanner = function(){
    timeControl();
    gameControl();
    bannerColorControl();
}

function bannerColorControl() {
    if(!end){
        if(turnName()=="PLAYER 1"){
            $("#banner").css("background-color","#ff67ff");
        }else{
            $("#banner").css("background-color","#44ffff");
        }
    }else{
        $("#banner").css("background-color","#000000");
    }
}

var timeControl = function(){
    var _interval;
    _interval=10-(interval/1000);
    if(_interval<0) _interval = 0;
    $("#timeStatus").text("Time : " + _interval.toFixed(2) +" / 10");
}

// #Todo : 이부분 매번 업데이트 말고 턴 바뀔때 업데이트 하는 방식으로 수정하기
var gameControl = function(){
    var message;
    if(!end){
        message = "TURN : " + turnName();
    }else{
        message = "GAME OVER : " + "\n" + turnName() +" LOSE"
    }
    $("#gameStatus").text(message);
}