import Cannon from 'cannon';

function initCannon() {

    let world = new Cannon.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new Cannon.NaiveBroadphase();
    world.solver.iterations = 10;

    //ADD GROUND
    return world;

}

function addBoxCollider(sceneObject, world, sceneObjectArray) {
    
        sceneObject.shape = new Cannon.Box(new Cannon.Vec3(1, 2, 1));
        sceneObject.mass = 1;
        sceneObject.body = new Cannon.Body({
            mass: 1
        });

    sceneObject.body.addShape(sceneObject.shape);

    world.addBody(sceneObject.body);
    sceneObjectArray.push({ mesh: sceneObject.mesh, collider: sceneObject.body })
}


function updatePhysics(sceneObjectArray, world) {
    let timeStep = 1 / 60;
    // Step the physics world
    world.step(timeStep);

    // Copy coordinates from Cannon.js to Three.js
    sceneObjectArray.forEach(object => {
        object.mesh.position.copy(object.collider.position);
        object.mesh.quaternion.copy(object.collider.quaternion);
        
    });

}


export { initCannon, addBoxCollider, updatePhysics };