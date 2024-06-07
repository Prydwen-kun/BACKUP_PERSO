import * as THREE from '..//three.js-master/build/three.module.js';

class mobs {
    constructor(Id, health, velocity, spawnPosition, loader) {
        this.Id = Id;
        this.health = health; //100
        this.velocity = velocity; //2.90

        this.geometry = new THREE.BoxGeometry(1, 2, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0xee3311 });
        this.texture = loader.load('/herobrine.png');//need to wrap an eventual texture with wrapT // UV pos
        this.material1 = new THREE.MeshLambertMaterial({ map: this.texture });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = false;
        this.mesh.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);

        // this.target = new THREE.Vector3(0, 0, 0);

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(playerPosition, deltaTime) {
        // let directionVecteur = playerPosition.clone().sub(this.mesh.position);
        // directionVecteur.normalize();
        // this.mesh.position.add(directionVecteur.multiplyScalar(this.velocity * deltaTime));
        this.mesh.lookAt(playerPosition.x, 1, playerPosition.z);
        this.mesh.position.lerp(playerPosition, this.velocity/1000);

    }

}

export { mobs };
