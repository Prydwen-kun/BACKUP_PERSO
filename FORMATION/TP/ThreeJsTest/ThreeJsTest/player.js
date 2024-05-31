import { PointerLockControls } from './three.js-master/examples/jsm/controls/PointerLockControls.js';
import * as THREE from './three.js-master/build/three.module.js';

class player {
  constructor(name, camera, domElement, clock) {
    this.name = name;
    this.controls = new PointerLockControls(camera, domElement);
    this.controls.pointerSpeed = 1;
    this.renderCanvas = domElement;
    this.camera = camera;
    this.clock = clock;
    //stats
    this.health = 100;
    this.stamina = 100;

    //position and speed
    this.velocity = 3;
    this.direction = new THREE.Vector3(0, 0, 1);
    //Keymap
    this.keymap = {};
  }

  //getter
  getPlayerDirection() {
    return this.direction;
  }
  getPlayerControls() {
    return this.controls;
  }
  getPlayerVelocity() {
    return this.velocity;
  }
  //setter 
  setPlayerDirection(direction) {
    this.direction = direction;
  }
  setPlayerVelocity(velocity) {
    this.velocity = velocity;
  }




  //UPDATE PLAYER
  update(delta) {

    //EVENT WATCH

    onkeydown = (event) => {
      let _that = this;
      let keyCode = event.code;
      _that.keymap[keyCode] = true;

      console.log(keyCode);
    }

    onkeyup = (event) => {
      let _that = this;
      let keyCode = event.code;
      _that.keymap[keyCode] = false;

    }




    //UP
    if (this.keymap["KeyW"] == true) {
      this.controls.moveForward(this.velocity * delta);
    }
    //DOWN
    if (this.keymap["KeyS"] == true) {
      this.controls.moveForward(this.velocity * delta * -1);
    }
    //LEFT
    if (this.keymap["KeyA"] == true) {
      this.controls.moveRight(this.velocity * delta * -1);
    }
    //RIGHT
    if (this.keymap["KeyD"] == true) {
      this.controls.moveRight(this.velocity * delta);

    }

  }
}
export { player };