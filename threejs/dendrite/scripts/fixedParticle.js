function FixedParticle(x, y, radius) {

    this.x = x;
    this.y = y;
    this.z = 0;

    this.radius = radius;

    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.radius, 32, 32), new THREE.MeshBasicMaterial({color: 0x6495ed}));

    // Move mesh to fixedParticle location
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
}

FixedParticle.prototype.collidesWith = function(freeParticle){

    //var distance = Math.sqrt(Math.pow(freeParticle.x - this.x, 2) + Math.pow(freeParticle.y - this.y, 2));
    //var radiusSum = this.radius + freeParticle.radius;

    /*if (distance <= radiusSum) {
        return true;
    } else {
        return false;
    }*/

    //return distance <= radiusSum;
    return (Math.pow(freeParticle.x - this.x, 2) + Math.pow(freeParticle.y - this.y, 2)) <= Math.pow(this.radius + freeParticle.radius, 2);
}

FixedParticle.prototype.getMesh = function(){
    // Return fixedParticle mesh
    return this.mesh;
}