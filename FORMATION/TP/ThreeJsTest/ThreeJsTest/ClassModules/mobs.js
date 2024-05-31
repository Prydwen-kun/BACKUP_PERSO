import * as THREE from '..//three.js-master/build/three.module.js';

class mobs {
    constructor(Id, health, velocity, spawnPosition) {
        this.Id = Id;
        this.health = health; //100
        this.velocity = velocity; //2.90
        this.spawnPosition = spawnPosition; //new THREE.Vector3(0,1,40);

        this.geometry = new THREE.BoxGeometry(1, 2, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0xee3311 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = false;

        this.mesh.position.x = spawnPosition.x;
        this.mesh.position.y = spawnPosition.y;
        this.mesh.position.z = spawnPosition.z;

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    update(playerPosition) {  //playerPosition est un vector3

    }

}

export { mobs };
