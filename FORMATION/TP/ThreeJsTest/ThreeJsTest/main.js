import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import * as PLAYER from './player.js'
import * as MOBS from './ClassModules/mobs.js'
import * as THREE from './three.js-master/build/three.module.js';
import * as MAP from './ClassModules/map.js';


//INIT SCENE AND CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color(0xfa6f66);
scene.fog = new THREE.Fog(0xbbbbbb, 10, 500);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.getElementById("game_container").appendChild(renderer.domElement);

//TEXTURE LOADER
const loader = new THREE.TextureLoader();

//CLOCK
const clock = new THREE.Clock();

//INIT MAP
const map1 = new MAP.map(scene, loader);

// ROTATING CUBE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xcccc00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = false;
scene.add(cube);
cube.position.y = 1.5;

//WALL
const geometry1 = new THREE.BoxGeometry(100, 40, 1);
const material1 = new THREE.MeshLambertMaterial({ color: 0x00aaee });
const textureWall = loader.load('/oldWood.avif');
const materialWall = new THREE.MeshLambertMaterial({ map: textureWall });
const cube1 = new THREE.Mesh(geometry1, materialWall);
cube1.castShadow = true;
cube1.receiveShadow = true;
scene.add(cube1);
cube1.position.y = 0.5;
cube1.position.z = -50;

// FLOOR
const geometry2 = new THREE.BoxGeometry(100, 100, 0.1);
const material2 = new THREE.MeshLambertMaterial({ color: 0xdddddd });
const textureFloor = loader.load('/images.jpg');
const materialFloor = new THREE.MeshLambertMaterial({ map: textureFloor });
const floor = new THREE.Mesh(geometry2, materialFloor);
floor.receiveShadow = true;
scene.add(floor);
floor.rotation.x = 1.5708;
floor.position.y = -0.1;

//AMBIENT LIGHT
const light = new THREE.AmbientLight(0xcccccc); // soft white light
scene.add(light);

// LIGHT DIRECTIONAL
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 20, 100);
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
directionalLight.target = cube1; //wall
scene.add(directionalLight.target);
const helperLight = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helperLight);
directionalLight.target.updateMatrixWorld();

//helper
const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper);

//camera position
camera.position.z = 5;
camera.position.y = 1.5;

//PLAYER
const player1 = new PLAYER.player("P1", camera, renderer.domElement, clock);

//ENNEMIES
const mob1 = new MOBS.mobs(1, 100, 2.90, new THREE.Vector3(0, 0.5, -40), loader);
mob1.addToScene(scene);
const mob2 = new MOBS.mobs(2, 100, 2.90, new THREE.Vector3(10, 0.5, -40), loader);
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

//////////APP MAIN LOOP////////////
function updatePlay() {
  requestAnimationFrame(updatePlay);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  player1.update(clock.getDelta());
  mob1.update(player1.camera.position);
  mob2.update(player1.camera.position);


  renderer.render(scene, camera);
}
updatePlay();
onresize = (event) => {
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
  camera.aspect(window.innerWidth / window.innerHeight);
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
