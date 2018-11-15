const dampening = 0.99;
const forceAmount = 0.1;
const forceNums = 50; //only even numbers!
const stepTime = 8;
const mutateRate = 0.01;
const deathPenalty = 0.8;
const winAward = 2;

function rocket(x,y){
    this.location = createVector(x,y);
    this.speed = createVector();

    this.forceList = [forceNums];
    this.moveNum = 0;
    this.currStep = 0;
    this.fuckChance = 0;

    this.isDead = false;
    this.isWon = false;

  this.update = function(){
    if(!this.isDead && !this.isWon){

      //rockets follow mouse
      //this.mousLoc = createVector(mouseX, mouseY);
      //this.force = this.mousLoc.sub(this.location);

      if(this.moveNum < forceNums){
        this.force = this.forceList[this.moveNum];
      }else{
        this.force = createVector(0,0);
      }

      this.force.setMag(forceAmount);
      this.speed.add(this.force);
      //this.speed.sub(this.speed.mult(dampening));
      this.speed.mult(dampening);
      this.location.add(this.speed);

      if(this.currStep == stepTime){
        this.moveNum++;
        this.currStep = 0;
      }else{
        this.currStep++;
      }
    }
  }

  this.draw = function(){
    fill(30,30,30);
    this.drawVect = createVector(this.speed.x, this.speed.y);
    this.drawVect.normalize().setMag(-15).rotate(radians(20));
    beginShape();
    vertex(this.location.x, this.location.y);
    vertex(this.location.x+this.drawVect.x, this.location.y+this.drawVect.y);
    this.drawVect.rotate(-radians(40));
    vertex(this.location.x+this.drawVect.x, this.location.y+this.drawVect.y);
    endShape(CLOSE);
    //ellipse(this.location.x, this.location.y, 10, 10);
  }

  this.calcDist = function(){
    this.distanceVect = createVector(endPosition.x,endPosition.y);
    this.distanceVect.sub(this.location);
    return this.distanceVect.mag();
  }

  this.calcFitness = function(){
    this.fitnes = 1/this.calcDist();

    if(this.isDead){
      return this.fitnes * (1-deathPenalty);
    }else if (this.isWon) {
      this.effAaward = forceNums - (this.moveNum + 1);
      return this.fitnes * (1+winAward + this.effAaward);
    }else{
      return this.fitnes;
    }
  }

  this.checkCollision = function(){
    if(this.location.x > width || this.location.x < 0 ||
      this.location.y > height || this.location.y < 0) {
        this.isDead = true;
      }

    if(this.location.x >= beginRect.x && this.location.x <= endRect.x &&
      this.location.y >= beginRect.y && this.location.y <= endRect.y){
      this.isDead = true;
    }

    if(this.calcDist() < diam/2){
      this.isWon = true;
    }
  }

  this.randomForces = function(){
    for(let i = 0; i < forceNums; i++){
      this.forceList[i] = createVector(random(-1,1),random(-1,1));
    }
  }

  this.mutateForces = function(){
    for(let i = 0; i < forceNums; i++){
      if(random() <= mutateRate){
        this.forceList[i] = createVector(random(-1,1),random(-1,1));
      }
    }
  }

  this.isFinished = function(){
    if((this.isDead || this.isWon || this.speed.mag() < 0.05) && !this.finished){
      return true;
      //console.log("boop");
    }else return false;
  }
}
