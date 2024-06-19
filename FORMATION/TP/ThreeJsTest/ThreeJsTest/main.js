import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import * as PLAYER from './player.js'
import * as MOBS from './ClassModules/mobs.js'
import * as THREE from './three.js-master/build/three.module.js';
import * as MAP from './ClassModules/map.js';
import * as CANNON from 'cannon-es'
import * as CANNON_INIT from './ClassModules/cannon_init.js';


//INIT SCENE AND CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color(0xfa6f66);
scene.fog = new THREE.Fog(0xbbbbbb, 10, 500);
scene.updateWorldMatrix(true, true);
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.getElementById("game_container").appendChild(renderer.domElement);

//////////CANNON VAR INIT/////////////
let sceneObjectArray = [];
const world = CANNON_INIT.initCannon();

//TEXTURE LOADER
const loader = new THREE.TextureLoader();

//CLOCK
const clock = new THREE.Clock();



// ROTATING CUBE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xcccc00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = false;
scene.add(cube);
cube.position.y = 1;
cube.position.x = -10;

// FLOOR
// const geometry2 = new THREE.BoxGeometry(100, 1, 100);
// const material2 = new THREE.MeshLambertMaterial({ color: 0xdddddd });
// const textureFloor = loader.load('/images.jpg');
// const materialFloor = new THREE.MeshLambertMaterial({ map: textureFloor });
// const floor = new THREE.Mesh(geometry2, materialFloor);
// floor.receiveShadow = true;

// scene.add(floor);
// // floor.position.set(-50, -1, 0);
// floor.translateY(-0.5);
// floor.updateMatrix();
// // floor.rotation.x = 1.5708;
// // floor.position.y = -1;
// let floorCollider = { mesh: floor, isActor: false };
// //floor collider
// floorCollider.shape = new Cannon.Box(new Cannon.Vec3(100, 1, 100));
// floorCollider.mass = 0;
// floorCollider.body = new Cannon.Body({
//   mass: 0
// });

// floorCollider.body.addShape(floorCollider.shape);
// // floorCollider.mesh.position.copy(floorCollider.body.position);
// floorCollider.body.position.copy(floorCollider.mesh.position);
// // floorCollider.mesh.quaternion.copy(floorCollider.body.quaternion);
// floorCollider.body.quaternion.copy(floorCollider.mesh.quaternion);
// world.addBody(floorCollider.body);

/////////////////////INIT MAP/////////////////
const map1 = new MAP.map(scene, loader);
map1.generateMapCollider(world, sceneObjectArray);

//AMBIENT LIGHT
const light = new THREE.AmbientLight(0xcccccc); // soft white light
scene.add(light);

// LIGHT DIRECTIONAL
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 60);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 60;
directionalLight.shadow.camera.bottom = -60;
directionalLight.shadow.camera.left = -60;
directionalLight.shadow.camera.right = 60;
scene.add(directionalLight);
directionalLight.target = map1.wallFloor.mesh; //wall
scene.add(directionalLight.target);
const helperLight = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helperLight);
directionalLight.target.updateMatrixWorld();

//helper
const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper);

//camera position
camera.position.z = 5;
camera.position.y = 1.75;

//PLAYER
const player1 = new PLAYER.player("P1", camera, renderer.domElement, clock);

//ENNEMIES//POSITION is 1 (origin of transform to put base of cube at 0y)
const mob1 = new MOBS.mobs(1, 100, 4, new THREE.Vector3(0, 1, -40), loader);
mob1.addToScene(scene);
const mob2 = new MOBS.mobs(2, 100, 4, new THREE.Vector3(10, 1, -40), loader);
mob2.addToScene(scene);

// EVENT LISTENERS AND PAUSE MENU
const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');

instructions.addEventListener('click', function () {

  player1.getPlayerControls().lock();

});

player1.getPlayerControls().addEventListener('lock', function () {

  instructions.style.display = 'none';
  blocker.style.display = 'none';

});

player1.getPlayerControls().addEventListener('unlock', function () {

  blocker.style.display = 'block';
  instructions.style.display = '';

});

scene.add(player1.getPlayerControls().getObject());



////////////////////SOME RANDOM TEST SPHERE///////////////////////
const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
const materialSphere = new THREE.MeshLambertMaterial({ color: 0xcc1500 });
const sphere1 = new THREE.Mesh(geometrySphere, materialSphere);
sphere1.castShadow = true;
sphere1.receiveShadow = true;
scene.add(sphere1);
sphere1.position.y = 5;
sphere1.position.x = 0;
sphere1.position.z = -10;
let sphere1Collider = { mesh: sphere1, isActor: false };
/////////////////CANNON INIT////////////
//array of all scene object to process collision

CANNON_INIT.addBoxCollider(player1, world, sceneObjectArray);
CANNON_INIT.addBoxCollider(mob1, world, sceneObjectArray);
// CANNON_INIT.addBoxCollider(mob2, world, sceneObjectArray);
CANNON_INIT.addSphereCollider(sphere1Collider, world, sceneObjectArray);

/////////////////CANNON INIT////////////
//plane floor
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass: 0,
});

planeBody.addShape(planeShape);
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(planeBody);

//DELTA SUM DEBUG
let deltaSum = 0;
console.log('scene object array : ',sceneObjectArray);
//////////APP MAIN LOOP////////////
function updatePlay() {
  requestAnimationFrame(updatePlay);
  let deltaTimeStoring = clock.getDelta();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  //UPDATE ALL ACTOR IN THE SCENE
  player1.update(deltaTimeStoring);
  mob1.update(player1.mesh.position, deltaTimeStoring);
  mob2.update(player1.mesh.position, deltaTimeStoring);

  //DEBUG SPHERE ADD IMPULSE
  deltaSum += deltaTimeStoring;

  if (deltaSum > 1) {
    sphere1Collider.body.applyImpulse(new CANNON.Vec3(0, 80, 0), sphere1Collider.mesh.position);
    deltaSum = 0;
  }

  //UPDATE PHYSICS THROUGH CANNON
  CANNON_INIT.updatePhysics(sceneObjectArray, world, deltaTimeStoring);

  renderer.render(scene, camera);
}
updatePlay();

//IN CASE OF WINDOW RESIZE//
onresize = (event) => {
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
  camera.aspect = (window.innerWidth / window.innerHeight);
};
//////////APP MAIN LOOP////////////

//exemple de rajout html
document.querySelector('#app').innerHTML = `
  <nav class="nav_menu">
    <h1><a href="index.html">App Logo</a></h1>
    <a href="#">Download</a>
    <a href="#">Git</a>
    <a href="#">Doc</a>
  </nav>
`
