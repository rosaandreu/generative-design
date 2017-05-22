function FreeParticle() {

    this.x = (Math.floor(Math.random() * (window.innerWidth + window.innerWidth / 2)) + (-window.innerWidth / 2));
    this.y = (Math.floor(Math.random() * (window.innerHeight + window.innerHeight / 2)) + (-window.innerHeight / 2));
    this.z = 0;

    this.speed = 1;
    this.direction = (Math.floor(Math.random() * (2 * Math.PI)) + 0);
    this.radius = (Math.floor(Math.random() * 10) + 7);

    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.radius, 32, 32), new THREE.MeshBasicMaterial({color: 0xb0e0e6}));

    // Move mesh to freeParticle location
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
}

FreeParticle.prototype.update = function() {

    this.x = this.x + this.speed * Math.cos(this.direction);
    this.y = this.y + this.speed * Math.sin(this.direction);

    // Check if it is outside camera's viewing frustum
    if (this.x < app.camera.left || this.x > app.camera.right || this.y < app.camera.bottom || this.y > app.camera.top) {
        this.x = (Math.floor(Math.random() * (window.innerWidth + window.innerWidth / 2)) + (- window.innerWidth / 2));
        this.y = (Math.floor(Math.random() * (window.innerHeight + window.innerHeight / 2)) + (- window.innerHeight / 2));
    }

    // Move mesh to freeParticle location
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
}

FreeParticle.prototype.getMesh = function(){
    // Return freeParticle mesh
    return this.mesh;
}
