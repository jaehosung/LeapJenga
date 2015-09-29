 /**
 * Created by Jaeho on 2015-08-30.
 */


var _i, _v3 = new THREE.Vector3;


var updateControl = function () {
    if (selected_block !== null) {
        _v3.copy(leapSphere.position).sub(disp).sub(selected_block.position).multiplyScalar(100);

        //이부분이 턴의 난이도를 결정하는 부분이다.
        _v3.y=0;
        selected_block.setLinearVelocity(_v3);

        // Reactivate all of the blocks
        _v3.set(0, 0, 0);

        for (_i = 0; _i < blocks.length; _i++) {
            blocks[_i].applyCentralImpulse(_v3);
        }
    } else {
        //color setting
        for (_i = 0; _i < blocks.length - 3; _i++) {

            if(blocks[_i]==first_selected_block){
                blocks[_i].material = fselected_block_material;
            }else if((new THREE.Box3()).setFromObject(blocks[_i]).containsPoint(leapSphere.position)) {
                blocks[_i].material = over_block_material;
            }else{
                blocks[_i].material = block_material;
            }

        }

    }

    scene.simulate(undefined, 1);
    physics_stats.update();
};