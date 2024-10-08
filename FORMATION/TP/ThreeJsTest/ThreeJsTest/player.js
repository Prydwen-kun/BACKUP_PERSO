import { PointerLockControls } from './three.js-master/examples/jsm/controls/PointerLockControls.js';
import * as THREE from './three.js-master/build/three.module.js';
import * as CANNON from 'cannon-es'

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

    this.isActor = true;
    this.size = new THREE.Vector3(1, 2, 1);
    this.geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
    this.material = new THREE.MeshLambertMaterial({ color: 0xee3311 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    // this.mesh.position.set(camera.position);
    this.mesh.position.set(camera.position.x, camera.position.y - 0.75, camera.position.z);
    //position and speed
    this.velocity = 10;
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

  takeDamage(damage) {
    this.health -= damage;
  }


  //UPDATE PLAYER
  update(delta, floor) {

    //EVENT WATCH

    onkeydown = (event) => {
      //let _that = this;
      let keyCode = event.code;
      this.keymap[keyCode] = true;

      console.log(keyCode);
    }

    onkeyup = (event) => {
      //let _that = this;
      let keyCode = event.code;
      this.keymap[keyCode] = false;

    }

    ////GET PLAYER DIRECTION///
    let playerDirectionNormal = new THREE.Vector3(0, 0, 0);
    this.camera.getWorldDirection(playerDirectionNormal);
    playerDirectionNormal.normalize();



    if (this.body !== null) {
      let resultVector1 = new THREE.Vector3(0,0,0);
      this.body.getVelocityAtWorldPoint(this.body.position, resultVector1);
      let velocity1 = resultVector1.length();
      //UP
      if (this.keymap["KeyW"] == true && velocity1 <= this.velocity) {
        this.body.applyForce(playerDirectionNormal.multiplyScalar(this.velocity), this.mesh.position);
      }

      // this.controls.moveForward(this.velocity * delta);

      //DOWN
      if (this.keymap["KeyS"] == true && velocity1 <= this.velocity) {
        this.body.applyForce(playerDirectionNormal.multiplyScalar(-this.velocity), this.mesh.position);
        // this.controls.moveForward(this.velocity * delta * -1);
      }
      //LEFT
      if (this.keymap["KeyA"] == true && velocity1 <= this.velocity) {
        // this.controls.moveRight(this.velocity * delta * -1);
      }
      //RIGHT
      if (this.keymap["KeyD"] == true && velocity1 <= this.velocity) {
        // this.controls.moveRight(this.velocity * delta);

      }
    }
    if (typeof this.body !== undefined) {
      //JUMP

      if (this.keymap["Space"] == true && this.body.aabb.overlaps(floor.body.aabb)) {
      }

      //update collider position
      this.camera.position.copy(this.body.position);
      this.body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.camera.quaternion.w);
      this.camera.position.y += .75;
    }

  }
}
export { player };