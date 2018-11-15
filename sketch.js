const numRockets = 50;
let rockets = [];

let startPosition;
let endPosition;
const diam = 30;

let beginRect;
let endRect;

function setup() {

  createCanvas(640, 480);

  startPosition = createVector(50,480/2);
  endPosition = createVector(640-50,480/2);

  beginRect = createVector(290,80);
  endRect = createVector(350,400);

  for(let i = 0; i <numRockets; i++){
    rockets[i] = new rocket(startPosition.x,startPosition.y);
    rockets[i].randomForces();
  }

}


function draw(){

  for(let j = 0; j < 10; j++){
  background(100);
  fill(200,40,40);
  ellipse(startPosition.x,startPosition.y,diam);
  strokeWeight(1);
  rect(beginRect.x,beginRect.y,endRect.x-beginRect.x,
    endRect.y-beginRect.y);
  fill(40,200,40);
  //noStroke();
  ellipse(endPosition.x,endPosition.y,diam);


  for(let i = 0; i <numRockets; i++){
    rockets[i].update();
    rockets[i].draw();
    rockets[i].checkCollision();
  }

  if(checkStatus()){
    calcAffection();
    matingProcess();
  }
}
  for(let i = 0; i <numRockets; i++){
    rockets[i].draw();
  }
}

function checkStatus(){
  let finishedRockets = 0;

  for(let i = 0; i <numRockets; i++){
    if(rockets[i].isFinished() == true){
      finishedRockets++;
    }
  }

  if(finishedRockets == numRockets){
    return true;
  }else return false;
}
