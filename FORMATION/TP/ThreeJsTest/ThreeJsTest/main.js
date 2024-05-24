import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import * as THREE from './three.js-master/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);

// ROTATING CUBE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = false;
scene.add(cube);
cube.position.y = 1.5;

// FLOOR
const geometry2 = new THREE.BoxGeometry(10, 10, 0.1);
const material2 = new THREE.MeshLambertMaterial({ color: 0xdddddd });
const floor = new THREE.Mesh(geometry2, material2);

floor.receiveShadow = true;
scene.add(floor);
floor.rotation.x = 90;

//AMBIENT LIGHT
const light = new THREE.AmbientLight(0xcccccc); // soft white light
scene.add(light);

// LIGHT DIRECTIONAL
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
scene.add(directionalLight);

//helper
const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper);

//camera position
camera.position.z = 5;

function updatePlay() {
  requestAnimationFrame(updatePlay);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
updatePlay();




document.querySelector('#app').innerHTML = `
  <nav class="nav_menu">
    <h1><a href="index.html">App Logo</a></h1>
    <a href="#">Download</a>
    <a href="#">Git</a>
    <a href="#">Doc</a>
  </nav>
`

setupCounter(document.querySelector('#counter'))
