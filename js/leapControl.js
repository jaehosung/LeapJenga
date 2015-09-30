/**
 * Created by Jaeho
 */

//Leapmotion scaling

var scaleLeap = 20;
var diffLeap = 0;
var diffLeapY = -3;
var disp = new THREE.Vector3;

//selection once a turn
var first_selected_block=null;
var leapSphere;


Leap.loop((function(){

    var jengaSelect = function(position){
        for(var i = 0; i < 3; i++ ){
            for(var j = 0; j < 16; j++){
                if ((new THREE.Box3()).setFromObject(jenga[i][j]).containsPoint(position)){
                    selected_block = jenga[i][j];
                    disp.copy(position).sub(selected_block.position);

                    var _vector = new THREE.Vector3(0,0,0);
                    selected_block.setAngularFactor(_vector);
                    selected_block.setAngularVelocity(_vector);
                    selected_block.setLinearFactor(_vector);
                    selected_block.setLinearVelocity(_vector);
                    selected_block.material=selected_block_material;

                }
            }
        }
    };

    var jengaUnSelect = function(){

        if ( selected_block !== null ) {
            var _vector = new THREE.Vector3();
            _vector.set(1,1,1);
            selected_block.setAngularFactor( _vector );
            selected_block.setLinearFactor( _vector );
            selected_block = null;

        }
    };

    return function (frame) {

        //console.log(leapSphere.position);

        if (frame.hands.length > 0) {

            var after_pos = rotate(frame.hands[0].palmPosition[0], frame.hands[0].palmPosition[2], cur_angle);
            leapSphere.position.x = after_pos.x/scaleLeap+diffLeap;
            leapSphere.position.y = frame.hands[0].palmPosition[1]/30+diffLeapY;
            leapSphere.position.z = after_pos.y/scaleLeap+diffLeap;

            var cur_grap;
            if((cur_grap = frame.hands[0].pinchStrength>0.5)){
                if (!leapSphere.grap) {

                    // 처음 선택한것이랑 같을때랑 턴이 시작되어 select을 할때만 바꿀 수 있다.
                    if(first_selected_block==null){
                        jengaSelect(leapSphere.position);
                        first_selected_block=selected_block;
                    }else if((new THREE.Box3()).setFromObject(first_selected_block).containsPoint(leapSphere.position)){
                        jengaSelect(leapSphere.position);
                    }

                }
            }else{
                if(leapSphere.grap){
                    jengaUnSelect();
                }
            }
            leapSphere.grap = cur_grap;
        }
    }
})());