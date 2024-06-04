import * as THREE from '..//three.js-master/build/three.module.js';
import * as CUBE from './cube.js';

class map {
    constructor(scene, loader) {
        this.scene = scene;
        this.loader = loader;
        //level geometry
        //WALL (-50, 0.5, 0)
        this.wall = new CUBE.cube(100, 40, 1, loader, -50, 0.5, 0);
        this.wall.rotate(0, 1.5708, 0);
        this.wall.addToScene(scene);
        //WALL (0, 0.5, 50)
        this.wall2 = new CUBE.cube(100, 40, 1, loader, 0, 0.5, 50);
        this.wall2.rotate(0, 0, 0);
        this.wall2.addToScene(scene);
        //WALL (50, 0.5, 0)
        this.wall3 = new CUBE.cube(100, 40, 1, loader, 50, 0.5, 0);
        this.wall3.rotate(0, 1.5708, 0);
        this.wall3.addToScene(scene);
        

    }


}
export { map };