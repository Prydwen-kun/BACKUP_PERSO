import * as THREE from '..//three.js-master/build/three.module.js';

class cube {
    constructor(x, y, z, loader, posX, posY, posZ) {
        const geometry = new THREE.BoxGeometry(x, y, z);//100 40 1
        const material = new THREE.MeshLambertMaterial({ color: 0x00aaee });
        const textureWall = loader.load('/oldWood.avif');
        const materialWall = new THREE.MeshLambertMaterial({ map: textureWall });
        this.cube = new THREE.Mesh(geometry, materialWall);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        
        this.cube.position.x = posX;
        this.cube.position.y = posY;
        this.cube.position.z = posZ;
    }
    rotate(rotX, rotY, rotZ) {
        this.cube.rotateX(rotX);
        this.cube.rotateY(rotY);
        this.cube.rotateZ(rotZ);
    }
    addToScene(scene){
        scene.add(this.cube);
    }


}
export { cube };