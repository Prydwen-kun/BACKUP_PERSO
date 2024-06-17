import * as CANNON from '..//node_modules/cannon/build/cannon.js';


var world, mass, body, shape, timeStep = 1 / 60;


function initCannon(sceneObjectArray) {

    world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

   
    

}

function addBoxCollider(){
     shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    mass = 1;
    body = new CANNON.Body({
        mass: 1
    });
    body.addShape(shape);
    body.angularVelocity.set(0, 10, 0);
    body.angularDamping = 0.5;
    world.addBody(body);
}


function updatePhysics(sceneObjectArray) {

    // Step the physics world
    world.step(timeStep);

    // Copy coordinates from Cannon.js to Three.js
    sceneObject.forEach(object => {
        object.position.copy(collider.position);
        object.quaternion.copy(collider.quaternion);
    });

}


export { initCannon };