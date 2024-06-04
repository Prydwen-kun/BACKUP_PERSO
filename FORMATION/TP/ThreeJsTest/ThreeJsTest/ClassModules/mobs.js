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
        this.mesh = new THREE.Mesh(this.geometry, this.material1);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = false;

        this.mesh.position.x = spawnPosition.x;
        this.mesh.position.y = spawnPosition.y;
        this.mesh.position.z = spawnPosition.z;

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(playerPosition, deltaTime) {  //playerPosition est un vector3
        this.mesh.lookAt(playerPosition);
        // this.mesh.translateOnAxis();
        //this.mesh.position + movement * DeltaTime at playerAngle
    }

}

export { mobs };
