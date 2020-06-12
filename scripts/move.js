function moveHero(heroCoordinates, heroName, direction)
{
  let HS = config.heroSpeed;
  let currentHeroStep = document.querySelector(
    '[posX = "' + heroCoordinates[0] + '"][posY = "' + heroCoordinates[1] + '"]'
  );
  currentHeroStep.classList.remove(heroName);
  let heroPosition;
  if (heroCoordinates[0] == 1 && direction == "left")
  {
    HS = 0;
  }
  if (heroCoordinates[0] == 30 && direction == "right")
  {
     HS = 0;
  }
  if (heroCoordinates[1] == 1 && direction == "up")
  {
     HS = 0;
  }
  if (heroCoordinates[1] == 30 && direction == "down")
  {
     HS = 0;
  }

  clearAttackZone();
  switch (direction)
  {
    case "up":
      heroCoordinates[1] -= HS;      
      break;
    case "down":
      heroCoordinates[1] +=  HS;
      break;
    case "left":
      heroCoordinates[0] -=  HS;
      break;
    case "right":
      heroCoordinates[0] +=  HS;
      break;
    default:
      break;
  }
  heroPosition = document.querySelector('[posX = "' + heroCoordinates[0] + '"][posY = "' + heroCoordinates[1] + '"]');
  createNewAttackZone();
  heroPosition.classList.add(heroName);

  // switch (direction)
  // {
  //   case "up":
  //     heroPosition.style.backgroundImage = "url('../img/firstHero_back.png')";
  //     break;
  //   case "down":
      
  //     break;
  //   case "left":
      
  //     break;
  //   case "right":
      
  //     break;
  //   default:
  //     break;
  // }
}

function drawRemainingSteps()
{
  let remainingSteps = config.step - heroStepCounter;
  document.getElementsByClassName("steps-quantity")[0].innerHTML = `${remainingSteps}`;
}

let heroStepCounter = 0;
let heroDirection;
let spawnEnemyTurn = 0;

document.addEventListener("keydown", function(event)
{
  if (heroStepCounter + 1 > config.step)
  {
    enemiesList.forEach(enemy =>
    {
      enemy.selectTarget();
    }); // enemies turn
    spawnEnemyTurn++;
    heroStepCounter = 0; //add new turns to heroes
    drawRemainingSteps(); // draw step quantity
    if (spawnEnemyTurn == config.enemySpawnTime)
    {
      getSpawnCoordinates();
      let enemy = new Enemy(getSpawnCoordinates()[0], getSpawnCoordinates()[1]);
      enemiesList.push(enemy); //create new enemy
      spawnEnemyTurn = 0;
    }
  }
  if (heroStepCounter > config.step)
  {    
    heroDirection = "none";    
  }
  else
  {    
    if (event.code == "KeyW")
    {
      heroDirection = "up";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
      heroStepCounter++;      
    }
    if (event.code == "KeyS")
    {
      heroDirection = "down";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
      heroStepCounter++;
    }
    if (event.code == "KeyA")
    {
      heroDirection = "left";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
      heroStepCounter++;
    }
    if (event.code == "KeyD")
    {
      heroDirection = "right";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
      heroStepCounter++;
    }
    if (event.keyCode == 38)
    {
      heroDirection = "up";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
      heroStepCounter++;
    }
    if (event.keyCode == 40)
    {
      heroDirection = "down";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
      heroStepCounter++;
    }
    if (event.keyCode == 37)
    {
      heroDirection = "left";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
      heroStepCounter++;
    }
    if (event.keyCode == 39)
    {
      heroDirection = "right";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
      heroStepCounter++;
    }
    drawRemainingSteps();
  }
});

moveHero(firstHeroCoordinates, "firstHero");
moveHero(secondHeroCoordinates, "secondHero");