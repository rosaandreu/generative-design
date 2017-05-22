class FixedParticle {
    float x, y;
    float radius;

    FixedParticle(float w, float h) {
        x = w;
        y = h;
        radius = 8;
    }

    FixedParticle(FreeParticle fp) {
        x = fp.x;
        y = fp.y;
        radius = fp.radius;
    }

    boolean collidesWith(FreeParticle fp) {
        float distance = sqrt( pow(fp.x - x, 2) + pow(fp.y - y, 2) );
        float radiusSum = radius + fp.radius;
        if (distance <= radiusSum) {
            return true;
        } else {
            return false;
        }
    }

    boolean isOutsideWindow() {
        int windowMargin = 20; // 20 pixels of margin
        if (y < windowMargin || y > height-windowMargin || x < windowMargin || x > width-windowMargin) {
            return true;
        } else {
            return false;
        }
    }

    void display() {
        noStroke();
        fill(100, 149, 237);
        ellipse(x, y, 2*radius, 2*radius);
    }
}