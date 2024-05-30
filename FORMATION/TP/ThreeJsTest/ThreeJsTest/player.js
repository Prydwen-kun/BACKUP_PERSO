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


  //update and managing inputs
  update(delta) {
    let _that = this;
    let keyMap = [];
    onkeydown = (event) => {
      switch (event.code) {
        case "KeyW":
          _that.controls.moveForward(_that.velocity * delta);
          break;
        case "KeyS":
          _that.controls.moveForward(_that.velocity * delta * -1);
          break;
        case "KeyA":
          _that.controls.moveRight(_that.velocity * delta * -1);
          break;
        case "KeyD":
          _that.controls.moveRight(_that.velocity * delta);
          break;
      }
      console.log(`Update Called **debug** : ${event.code}`);
    }

    onkeyup = (event) => {
      
    }
  }

}
export { player };