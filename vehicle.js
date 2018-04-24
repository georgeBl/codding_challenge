function Vehicle(x, y, col) {
    //position of each particle - starts randomly on screen to look better
    this.pos = createVector(random(width), random(height));
    //initial possition that will create the word
    this.target = createVector(x, y);
    //velocity of which the particles will move
    this.vel = p5.Vector.random2D();
    //acceleration that will be applied to velocity
    this.acc = createVector();
    //size of the particle
    this.r = 8;
    //the maximum speed of which the particles will move (its desired velocity)
    this.maxspeed = 5;
    //the maximum force that can be applied
    this.maxforce = 1;
    this.color = col;
    this.baseColor = col;
}

//this function will update particles position
Vehicle.prototype.update = function () {
    //add the velocity to the position
    this.pos.add(this.vel);
    //add the acceleration to the position
    this.vel.add(this.acc);
    //reset acceleration each time the method is called
    this.acc.mult(0);
}

//this function will show the particles on screen
Vehicle.prototype.show = function () {
    //set the colour
    stroke(this.color);
    //set the weight
    strokeWeight(this.r);
    //draw a point to the given position
    point(this.pos.x, this.pos.y);
}

//this function will load all the behaviours of the particle
Vehicle.prototype.behaviors = function () {
    //load the arrive behaviour
    var arrive = this.arrive(this.target);
    //create a vectore that will store the mousex and mousey
    var mouse = createVector(mouseX, mouseY);
    //create the flee behaviour
    var flee = this.flee(mouse);

    //make the behaviours more dynamic
    arrive.mult(1);
    flee.mult(5);

    //apply the forces
    this.applyForce(arrive);
    this.applyForce(flee);
    //    this.color = color(255);
}

//this function will apply a force to the acceleration of the particle
Vehicle.prototype.applyForce = function (f) {
    this.acc.add(f);
}

//this function will move the particles to their target position
Vehicle.prototype.arrive = function (target) {
    //get a vector that points from the position to the target 
    var desired = p5.Vector.sub(target, this.pos);
    //get the length/magintude of the desired vector - how far away is
    var d = desired.mag();
    //speed of which the particle will move
    var speed = this.maxspeed;
    if (d < 100) {
        this.color = this.baseColor;
        //map the distance from 0 to 100 to 0 to maximum speed
        speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
}
//this function will spread the particles when the mouse position is near
Vehicle.prototype.flee = function (target) {
    //get a vector that points from position to the target
    var desired = p5.Vector.sub(target, this.pos);
    //get the length of the desired vector
    var d = desired.mag();
    //    this.color = color(255, 255, 255);
    //will only move particles if the mouse is close enough
    if (d < 50) {
        this.color = color(255, 0, 0);
        //will set the desired magitude to maximum speed so that the particles will move as fast as possible(maxspeed) to their target position
        desired.setMag(this.maxspeed);
        //instead of moving the to their target, move the particles in the opposite way
        desired.mult(-1);
        //steering force (desired-velocity)
        var steer = p5.Vector.sub(desired, this.vel);

        steer.limit(this.maxforce);
        //this will return the force
        return steer;
    } else {
        return createVector(0, 0);
    }
}
//will update the target of the particles
Vehicle.prototype.updadeTarget = function (target) {
    this.target.set(target.x, target.y);
}

//will update the colour of the particles
Vehicle.prototype.updateColor = function (_col) {
    this.baseColor = _col;
}
