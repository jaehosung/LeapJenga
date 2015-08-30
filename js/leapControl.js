/**
 * Created by Jaeho on 2015-08-30.
 */
//leapmotion scaling
var scaleLeap = 20;
var diffLeap = 0;
var diffLeapY = -3;
var disp = new THREE.Vector3;
var leapSphere = {
    position: new THREE.Vector3(0,-10,0),
    grap: false
};


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
    }

    var jengaUnSelect = function(){

        if ( selected_block !== null ) {
            var _vector = new THREE.Vector3();
            _vector.set(1,1,1);
            selected_block.setAngularFactor( _vector );
            selected_block.setLinearFactor( _vector );
            selected_block.material=block_material;
            selected_block = null;

        }
    }

    return function (frame) {
        if (frame.hands.length > 0) {

            var after_pos = rotate(frame.hands[0].palmPosition[0], frame.hands[0].palmPosition[2], cur_angle);
            leapSphere.position.x = after_pos.x/scaleLeap+diffLeap;
            leapSphere.position.y = frame.hands[0].palmPosition[1]/22+diffLeapY;
            leapSphere.position.z = after_pos.y/scaleLeap+diffLeap;

            var cur_grap;
            if((cur_grap = frame.hands[0].pinchStrength>0.5)){
                if (!leapSphere.grap) {
                    jengaSelect(leapSphere.position);
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
