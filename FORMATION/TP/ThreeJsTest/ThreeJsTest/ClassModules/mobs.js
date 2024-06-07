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
        this.mesh.position.set(spawnPosition.x,spawnPosition.y,spawnPosition.z);

        this.target = new THREE.Vector3(0, 0, 0);

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(playerPosition, deltaTime) {

        this.target.set(playerPosition.x, playerPosition.y - 0.5, playerPosition.z);
        this.mesh.lookAt(this.target);
        this.target.normalize();
        this.mesh.position.set(this.target.x * this.velocity * deltaTime, this.mesh.position.y, this.target.z * this.velocity * deltaTime);

        //get quaternion rotation ?
        // console.log('This target :',this.target,'This mesh : ',this.mesh.position,'This velocity : ',this.velocity,'Delta Time :',deltaTime);

        // this.mesh.translateOnAxis(this.target, this.velocity * deltaTime);
        //need to update the world matrix to update dynamic shadow

    }

}

export { mobs };
