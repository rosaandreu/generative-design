ArrayList<FreeParticle> freeParticles;
ArrayList<FixedParticle> fixedParticles;
int numFreeParticles = 200;
boolean keepGeneratingDendrite = true;
int simulationStepsPerFrame = 20;


void setup() {
    frameRate(60);
    size(800, 800);
    //Create data arrays
    freeParticles = new ArrayList<FreeParticle>();
    fixedParticles = new ArrayList<FixedParticle>();

    for (int i = 0; i < numFreeParticles; i++) {
        freeParticles.add(new FreeParticle());
    }

    //Create 1 fixed particle in center
    fixedParticles.add(new FixedParticle(width/2, height/2));
}

void draw() {
    background(240, 240, 240);
    if (keepGeneratingDendrite) {

        for (int n = 0; n < simulationStepsPerFrame; n++) {
            if (!keepGeneratingDendrite) {
                break; //Get out of for loop if we should not keep generating
            }

            //Update freeParticles position
            for (int i = 0; i < freeParticles.size(); i++) {
                freeParticles.get(i).updatePosition();
            }

            //Check collisions
            for (int i = 0; i < fixedParticles.size(); i++) {
                for (int j = 0; j < freeParticles.size(); j++) {
                    if (fixedParticles.get(i).collidesWith(freeParticles.get(j))) {

                        fixedParticles.add(new FixedParticle(freeParticles.remove(j)));
                        //Check if dendrite fills window size
                        if (fixedParticles.get(fixedParticles.size() - 1).isOutsideWindow()) {
                            keepGeneratingDendrite = false;
                        }

                        //Add new random free particle to substitute removed one
                        freeParticles.add(new FreeParticle());
                    }
                }
            }
        }


        for (int i = 0; i < freeParticles.size(); i++) {
            freeParticles.get(i).display();
        }
    }
    //Draw 
    for (int i = 0; i < fixedParticles.size(); i++) {
        fixedParticles.get(i).display();
    }
}