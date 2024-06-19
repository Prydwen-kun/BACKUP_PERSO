import * as CANNON from 'cannon-es'

function initCannon() {

    const world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    })

    // world.broadphase = new CANNON.NaiveBroadphase();//need to look into this shit
    // world.solver.iterations = 10;

    return world;

}

function addBoxCollider(sceneObject, world, sceneObjectArray) {

    sceneObject.shape = new CANNON.Box(new CANNON.Vec3(1, 2, 1));
    sceneObject.mass = 1;
    sceneObject.body = new CANNON.Body({
        mass: 1
    });

    sceneObject.body.addShape(sceneObject.shape);

    sceneObject.body.position.copy(sceneObject.mesh.position);
    sceneObject.body.quaternion.copy(sceneObject.mesh.quaternion);

    world.addBody(sceneObject.body);
    sceneObjectArray.push({ mesh: sceneObject.mesh, collider: sceneObject.body })
}

function addStaticBoxCollider(sceneObject, world, sceneObjectArray) {

    sceneObject.shape = new CANNON.Box(new CANNON.Vec3(1, 2, 1));
    sceneObject.mass = 0;
    sceneObject.body = new CANNON.Body({
        mass: 0
    });

    sceneObject.body.addShape(sceneObject.shape);

    sceneObject.body.position.copy(sceneObject.mesh.position);
    sceneObject.body.quaternion.copy(sceneObject.mesh.quaternion);

    world.addBody(sceneObject.body);
    sceneObjectArray.push({ mesh: sceneObject.mesh, collider: sceneObject.body })
}

function addSphereCollider(sceneObject, world, sceneObjectArray) {

    sceneObject.shape = new CANNON.Sphere(1);
    sceneObject.mass = 10;
    sceneObject.body = new CANNON.Body({
        mass: 10
    });

    sceneObject.body.addShape(sceneObject.shape);

    sceneObject.body.position.copy(sceneObject.mesh.position);
    sceneObject.body.quaternion.copy(sceneObject.mesh.quaternion);

    world.addBody(sceneObject.body);
    sceneObjectArray.push({ mesh: sceneObject.mesh, collider: sceneObject.body })
}


function updatePhysics(sceneObjectArray, world, deltaTime) {
    // Step the physics world
    world.step(1 / 60, deltaTime, 10);
    // Copy coordinates from Cannon.js to Three.js
    sceneObjectArray.forEach(object => {
        // if (!object.isActor) {
        //     object.mesh.position.copy(object.collider.position);
        //     object.mesh.quaternion.copy(object.collider.quaternion);
        // } else {
        //     object.collider.position.copy(object.mesh.position);
        //     object.collider.quaternion.copy(object.mesh.quaternion);
        // }
        object.mesh.position.copy(object.collider.position);
        object.mesh.quaternion.copy(object.collider.quaternion);
    });



}


export { initCannon, addBoxCollider, addStaticBoxCollider, addSphereCollider, updatePhysics };