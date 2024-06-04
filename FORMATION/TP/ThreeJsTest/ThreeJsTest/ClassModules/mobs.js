import * as THREE from '..//three.js-master/build/three.module.js';

class mobs {
    constructor(Id, health, velocity, spawnPosition, loader) {
        this.Id = Id;
        this.health = health; //100
        this.velocity = velocity; //2.90
        this.spawnPosition = spawnPosition; //new THREE.Vector3(0,1,40);

        this.geometry = new THREE.BoxGeometry(1, 2, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0xee3311 });
        this.texture = loader.load('/herobrine.png');
        this.material1 = new THREE.MeshLambertMaterial({ map: this.texture });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = false;

        this.mesh.position.x = spawnPosition.x;
        this.mesh.position.y = spawnPosition.y;
        this.mesh.position.z = spawnPosition.z;

        this.target = new THREE.Vector3(0, 0, 0);

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(playerPosition, deltaTime) {
        this.target.set(playerPosition.x, 0.5, playerPosition.z);
        this.mesh.lookAt(this.target);
        this.target.normalize();
        this.mesh.translateOnAxis(this.target, this.velocity * deltaTime);
        //need to update the world matrix to update dynamic shadow
    }

}

export { mobs };
