var app = (function () {

    "use strict";

    // Begin configure THREE scene --------------------
    // Vars
    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        element,
        light,
        camera,
        width = window.innerWidth,
        height = window.innerHeight,
        simulationStepsPerFrame = 10;

    // Render and size of the "canvas"
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0xf0f0f0), 1);

    // Add the output of the renderer to the html element
    element = document.getElementById("webgl-container");
    element.appendChild(renderer.domElement);

    // Lighting
    light = new THREE.AmbientLight(0xffffff);

    scene.add(light);

    // Camera
    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

    // Position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;

    scene.add(camera);

    // End configure THREE scene --------------------

    // Create fixedParticles and freeParticles as variables of this app (to access them from child functions like init or render)
    var fixedParticles = [];
    var freeParticles = [];
    var freeParticlesNum = 50;

    // Functions
    function init() {

        // Create one fixedParticle in the center
        fixedParticles.push(new FixedParticle(0, 0, 10));

        // Get mesh from this first fixedParticle and add it to the scene
        scene.add(fixedParticles[0].getMesh());

        for(var i = 0; i < freeParticlesNum; i++){
            freeParticles.push(new FreeParticle());
            scene.add(freeParticles[freeParticles.length - 1].getMesh());
         }

        // Render
        render();
    }

    function render() {
        for(var n = 0; n < simulationStepsPerFrame; n++) {
            // Update freeParticle position
            for(var i = 0; i < freeParticles.length; i++){
                freeParticles[i].update();
            }

            // Check collisions
            for (var i = 0; i < fixedParticles.length; i++) {
                for (var j = 0; j < freeParticles.length; j++) {
                    if (fixedParticles[i].collidesWith(freeParticles[j])) {

                        // Push new fixedParticle (based on colliding freeParticle) to fixedParticles array
                        fixedParticles.push(new FixedParticle(freeParticles[j].x, freeParticles[j].y, freeParticles[j].radius));

                        // Get mesh from last (fixedParticles.length - 1) fixedParticle and add it to scene
                        scene.add(fixedParticles[fixedParticles.length - 1].getMesh());

                        // Reinitialize the freeParticle that was colliding [j]
                        scene.remove(freeParticles[j].getMesh());
                        freeParticles[j] = new FreeParticle();
                        scene.add(freeParticles[j].getMesh());
                    }
                }
            }
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        scene: scene,
        camera: camera,
        init: init
    }
})();

window.onload = app.init();

