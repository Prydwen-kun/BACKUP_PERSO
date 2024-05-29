import { PointerLockControls } from './three.js-master/examples/jsm/controls/PointerLockControls.js';
import * as THREE from './three.js-master/build/three.module.js';

class player {
  constructor(name, camera, domElement) {
    this.name = name;
    this.controls = new PointerLockControls(camera, domElement);
    this.controls.pointerSpeed = 1;
    this.renderCanvas = domElement;

    //stats
    this.health = 100;
    this.stamina = 100;
    //position and speed
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.direction = new THREE.Vector3(0,0,1);
  }

  //getter
  getPlayerDirection() {
    return this.direction;
  }
  getPlayerControls(){
    return this.controls;
  }
  //setter 
  setPlayerDirection(direction) {
    this.direction = direction;
  }
  setPlayerVelocity(velocity) {
    this.velocity = velocity;
  }
  //update
  update(delta) {


  }

}
export { player };