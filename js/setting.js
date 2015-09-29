/**
 * Created by Jaeho on 2015-08-30.
 */


var jenga = new Array(3);
jenga[0] = new Array(16);
jenga[1] = new Array(16);
jenga[2] = new Array(16);

var render_stats, physics_stats, scene, dir_light, am_light, camera, cur_angle,
    table, blocks = [], table_material, block_material,selected_block_material,over_block_material,leap_material,fselected_block_material,
    selected_block = null;

var renderSetting = function(){

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    document.getElementById( 'viewport' ).appendChild( renderer.domElement );

    render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '1px';
    render_stats.domElement.style.zIndex = 100;
    document.getElementById( 'viewport' ).appendChild( render_stats.domElement );

    physics_stats = new Stats();
    physics_stats.domElement.style.position = 'absolute';
    physics_stats.domElement.style.top = '50px';
    physics_stats.domElement.style.zIndex = 100;
    document.getElementById( 'viewport' ).appendChild( physics_stats.domElement );

};

var cameraSetting = function(){
    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set( 0, 20, 25*1.4 );
    rotateCamera(Math.PI/4);


    camera.lookAt(new THREE.Vector3( 0, 7, 0 ));
    scene.add( camera );

};

var lightSetting = function(){
    // ambient light
    am_light = new THREE.AmbientLight( 0x444444 );
    scene.add( am_light );

    // directional light
    dir_light = new THREE.DirectionalLight( 0xFFFFFF );
    dir_light.position.set(25, 25, 20 );
    dir_light.target.position.copy( scene.position );
    dir_light.castShadow = true;
    dir_light.shadowCameraLeft = -30;
    dir_light.shadowCameraTop = -30;
    dir_light.shadowCameraRight = 30;
    dir_light.shadowCameraBottom = 30;
    dir_light.shadowCameraNear = 20;
    dir_light.shadowCameraFar = 200;
    dir_light.shadowBias = -.001
    dir_light.shadowMapWidth = dir_light.shadowMapHeight = 2048;
    dir_light.shadowDarkness = .5;
    scene.add( dir_light );

};

var materialSetting = function(){
    // Materials
    table_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/wood.jpg' ), ambient: 0xFFFFFF }),
        .9, // high friction
        .2 // low restitution
        //default : 0.9 , 0.2
    );
    table_material.map.wrapS = table_material.map.wrapT = THREE.RepeatWrapping;
    table_material.map.repeat.set( 5, 5 );


    block_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ), ambient: 0xFFFFFF }),
        .4, // medium friction
        .4// medium restitution
        //default 0.4 0.4
    );
    block_material.map.wrapS = block_material.map.wrapT = THREE.RepeatWrapping;
    block_material.map.repeat.set( 1, .5 );

    over_block_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ), ambient: 0xFFFFFF}),
        .0, // medium friction
        .4// medium restitution
        //default 0.4 0.4
    );
    over_block_material.color.r+=0.5;
    over_block_material.map.wrapS = block_material.map.wrapT = THREE.RepeatWrapping;
    over_block_material.map.repeat.set( 1, .5 );

    selected_block_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ), ambient: 0xFFFFFF,color: 0x880000}),
        0.0, // medium friction
        0.0// medium restitution
        //default 0.4 0.4
    );
    selected_block_material.color.r+=1;
    selected_block_material.map.wrapS = block_material.map.wrapT = THREE.RepeatWrapping;
    selected_block_material.map.repeat.set( 1, .5 );

    fselected_block_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ), ambient: 0xFFFFFF,color: 0x880000}),
        0.0, // medium friction
        0.0// medium restitution
        //default 0.4 0.4
    );
    fselected_block_material.color.g+=1;
    fselected_block_material.map.wrapS = block_material.map.wrapT = THREE.RepeatWrapping;
    fselected_block_material.map.repeat.set( 1, .5 );

};

var createTable = function(){

    table = new Physijs.BoxMesh(
        new THREE.BoxGeometry(50, 1, 50),
        table_material,
        0, // mass
        { restitution: .2, friction: .8 }
    );
    table.position.y = -.5;
    table.receiveShadow = true;
    scene.add( table );
};

var createTower = function() {

    var block_length = 6, block_height =1
        , block_width = 1.5, block_offset = 2,
        block_geometry = new THREE.BoxGeometry( block_length, block_height, block_width );
    var i, j, rows = 16,block;

    topHeight = block_height*(rows-1);


    for ( i = 0; i < rows; i++ ) {
        for ( j = 0; j < 3; j++ ) {
            jenga[j][i] = new Physijs.BoxMesh( block_geometry, block_material );
            jenga[j][i].position.y = (block_height / 2) + block_height * i;
            if ( i % 2 === 0 ) {
                jenga[j][i].rotation.y = Math.PI / 2.01; // #TODO: There's a bug somewhere when this is to close to 2
                jenga[j][i].position.x = block_offset * j - ( block_offset * 3 / 2 - block_offset / 2 );
            } else {
                jenga[j][i].position.z = block_offset * j - ( block_offset * 3 / 2 - block_offset / 2 );
            }
            jenga[j][i].receiveShadow = true;
            jenga[j][i].castShadow = true;
            scene.add( jenga[j][i] );
            blocks.push( jenga[j][i]);
        }
    }
};

var createLeapObj =function(){

    var sphere_geometry = new THREE.SphereGeometry(0.5);
    leap_material = new THREE.MeshPhongMaterial();
    leapSphere = new Physijs.Mesh(sphere_geometry, leap_material);
    leapSphere.castShadow = true;
    scene.add(leapSphere);

    // init position / grap
    leapSphere.position.y = 100;
    leapSphere.grap = false;
};


var sceneSetting = function(){
    scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
    scene.setGravity(new THREE.Vector3( 0, -10, 0 ));
};