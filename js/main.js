/**
 * Created by Jay Sung
 */

'use strict';

Physijs.scripts.worker = 'libs/physijs/physijs_worker.js';;
Physijs.scripts.ammo = 'ammo.js';


var initScene, render, renderer;



function rotateCamera(angle){
    var after_pos = rotate(camera.position.x, camera.position.z, angle);
    camera.position.x = after_pos.x;
    camera.position.z = after_pos.y;
    cur_angle = angle;
}

function rotate(x, y, angle) {
    return {
        x: x*Math.cos(angle)+y*Math.sin(angle),
        y: -x*Math.sin(angle)+y*Math.cos(angle)
    }
}

initScene = function() {

    renderSetting();
    sceneSetting();
    cameraSetting();
    lightSetting();
    materialSetting();

    createTable();
    createTower();
    createLeapObj();


    scene.addEventListener('update', updateControl);

    requestAnimationFrame(render);
    scene.simulate();
};

render = function() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    render_stats.update();

    if(!end) setTurn();
    turnColorSetting();


    if(user_id==1&&turn==true){
        console.log("1p sending data");
        send_data(statusData());
    }
    if(user_id==2&&turn==false){
        send_data(statusData());
    }

    updateBanner();
};

window.onload = initScene;

