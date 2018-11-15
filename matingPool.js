
function calcAffection(){
  let holeFitness = 0;
  for(let i = 0; i < numRockets; i++){
    holeFitness += rockets[i].calcFitness();
  }
  let avgFitness = holeFitness / numRockets;

  for(let i = 0; i < numRockets; i++){
    rockets[i].fuckChance = rockets[i].calcFitness() / holeFitness;
    //console.log(rockets[i]);
  }
}

function matingProcess(){
  let sortedRockets = rockets;
  sortedRockets.sort(function(a,b){
    return b.fuckChance - a.fuckChance
  });
  console.log(sortedRockets[0].fuckChance);

  let newrockets = [];

  for(let j = 0; j < numRockets; j++){
    let gen1;
    let gen2;
    while(gen1 == null || gen2 == null){
      for(let i = 0; i < numRockets; i++){
        if(rockets[i].fuckChance >= random()){
          if(gen1 == null){
            gen1 = sortedRockets[i].forceList;
          }else if (gen2 == null) {
            gen2 = sortedRockets[i].forceList;
          }else break;
        }
      }
    }

    newrockets[j] = new rocket(startPosition.x,startPosition.y);
    for(let i = 0; i < forceNums/2; i++){
      newrockets[j].forceList[i] = gen1[i];
    }
    for(let i = forceNums/2; i < forceNums; i++){
      newrockets[j].forceList[i] = gen2[i];
    }

    newrockets[j].mutateForces();
  }
  rockets = newrockets;
}
