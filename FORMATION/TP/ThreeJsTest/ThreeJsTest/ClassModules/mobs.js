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

        this.isActor = true;

        //POUR DEBUG
        this.deltaSum = 0;
        this.updateCall = 0;
        // this.target = new THREE.Vector3(0, 0, 0);

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(playerPosition, deltaTime) {

        this.mesh.lookAt(playerPosition.x, playerPosition.y, playerPosition.z);
        let directionNormal = new THREE.Vector3(0, 0, 0);
        this.mesh.getWorldDirection(directionNormal);
        directionNormal.normalize();

        this.mesh.translateOnAxis(directionNormal, this.velocity * deltaTime);
        // this.mesh.position.lerp(playerPosition, 0.005);


        //DEBUG UPDATE CALL NUMBER
        // this.deltaSum += deltaTime;
        // this.updateCall++;
        // if (this.deltaSum > 1) {
        //     console.log('MOB',this.Id,'Update has been called : ', this.updateCall, ' times per second!');
        //     this.deltaSum = 0;
        //     this.updateCall = 0;
        // }
    }

}

export { mobs };
