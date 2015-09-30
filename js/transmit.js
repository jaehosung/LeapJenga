/**
 * Created by Jay Sung on 2015-09-30.
 */

// position rotation : array
var drawJenga = function(col, row, position, rotation){
    var cur_block = jenga[col][row];
    cur_block.__dirtyPosition=true;
    cur_block.__dirtyRotation=true;
    cur_block.position.set.apply(cur_block.position, position);
    cur_block.rotation.set.apply(cur_block.rotation, rotation);



    var _vector = new THREE.Vector3(0,0,0);
    cur_block.setAngularFactor(_vector);
    cur_block.setAngularVelocity(_vector);
    cur_block.setLinearFactor(_vector);
    cur_block.setLinearVelocity(_vector);

    //다시 시작시키기
    _vector.set(1,1,1);
    cur_block.setAngularFactor( _vector );
    cur_block.setLinearFactor( _vector );

};

var drawLeap = function(position){
    leapSphere.position.set.apply(leapSphere.position, position);
}

var sendData = function(){
    var jengaData =[];
    var leapData;

    for (var i = 0; i < 3; i++) {
        jengaData[i] =[];
    }

    for(var i = 0; i < 3; i++){
        for(var j = 0; j<15; j++){
            jengaData[i][j]={position: [jenga[i][j].position.x,jenga[i][j].position.y,jenga[i][j].position.z], rotation: [jenga[i][j].rotation.x,jenga[i][j].rotation.y,jenga[i][j].rotation.z]}
        }
    }

    leapData = {position: [leapSphere.position.x,leapSphere.position.y,leapSphere.position.z]};

    data = {jenga: jengaData, leap: leapData};

    return JSON.stringify(data);

}

var dataDraw = function(JSONdata){
    var data = JSON.parse(JSONdata);

    for(var i = 0; i < 3; i++){
        for(var j = 0; j<15; j++){
            drawJenga(i,j,data.jenga[i][j].position,data.jenga[i][j].rotation);
        }
    }
    drawLeap(data.leap.position);
}