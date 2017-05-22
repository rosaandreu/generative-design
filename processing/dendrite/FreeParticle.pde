class FreeParticle {
    float x, y;
    float radius = random(4, 8);
    float direction;
    float speed = 0.5;
    int frameOffset = 400;

    FreeParticle() {
        initParticlePosAndSpeed();
    }
    void initParticlePosAndSpeed() {
        y = random(-frameOffset, height + frameOffset);
        if (y < 0 || y > height) {
            x = random(-frameOffset, width + frameOffset);
        } else {
            if (random(0, 1) < 0.5) { //Cara
                x = random(-frameOffset, 0);
            } else { //Cruz
                x = random(width, width + frameOffset);
            }
        }
        direction = random(0, 2*PI);
    }
    void display() {
        noStroke();
        fill(176, 224, 230);
        ellipse(x, y, 2*radius, 2*radius);
    }
    void updatePosition() {
        x = x + speed*cos(direction);
        y = y + speed*sin(direction);

        //Check if outside frame
        if (x < -frameOffset || x > width + frameOffset || y < -frameOffset || y > height + frameOffset) {
            initParticlePosAndSpeed();
        }
    }
}