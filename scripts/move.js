function moveHero(heroCoordinates, heroName, direction)
{
  config.heroSpeed = 1;
  let currentHeroStep = document.querySelector(
    '[posX = "' + heroCoordinates[0] + '"][posY = "' + heroCoordinates[1] + '"]'
  );
  currentHeroStep.classList.remove(heroName);
  let heroPosition;
  if (heroCoordinates[0] == 1 && direction == "left")
  {
    config.heroSpeed = 0;
  }
  if (heroCoordinates[0] == 30 && direction == "right")
  {
     config.heroSpeed = 0;
  }
  if (heroCoordinates[1] == 1 && direction == "up")
  {
     config.heroSpeed = 0;
  }
  if (heroCoordinates[1] == 30 && direction == "down")
  {
     config.heroSpeed = 0;
  }

  clearAttackZone();
  switch (direction)
  {
    case "up":
      heroCoordinates[1] -= config.heroSpeed;
      break;
    case "down":
      heroCoordinates[1] +=  config.heroSpeed;
      break;
    case "left":
      heroCoordinates[0] -=  config.heroSpeed;
      break;
    case "right":
      heroCoordinates[0] +=  config.heroSpeed;
      break;
    default:
      break;
  }
  heroPosition = document.querySelector('[posX = "' + heroCoordinates[0] + '"][posY = "' + heroCoordinates[1] + '"]');
  createNewAttackZone();
  heroPosition.classList.add(heroName);
}

function drawRemainingSteps()
{
  let remainingSteps = config.step - heroStepCounter;
  document.getElementsByClassName("step-counter")[0].innerHTML = `Steps remaining:${remainingSteps}`;
}

let heroStepCounter = 0;
let heroDirection;

document.addEventListener("keydown", function(event)
{
  heroStepCounter++;
  if (heroStepCounter <= config.step)
  {
    drawRemainingSteps();
  }
  if (heroStepCounter > config.step)
  {
    heroDirection = "none";
      enemiesList.forEach(enemy =>
      {
        enemy.selectTarget();
      }); // enemies turn
      heroStepCounter = 0; //add new turns to heroes
      drawRemainingSteps(); // draw step quantity
  }
  else
  {
    if (event.code == "KeyW")
    {
      heroDirection = "up";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    }
    if (event.code == "KeyS")
    {
      heroDirection = "down";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    }
    if (event.code == "KeyA")
    {
      heroDirection = "left";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    }
    if (event.code == "KeyD")
    {
      heroDirection = "right";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    }
    if (event.keyCode == 38)
    {
      heroDirection = "up";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    }
    if (event.keyCode == 40)
    {
      heroDirection = "down";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    }
    if (event.keyCode == 37)
    {
      heroDirection = "left";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    }
    if (event.keyCode == 39)
    {
      heroDirection = "right";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    }
  }
});

moveHero(firstHeroCoordinates, "firstHero");
moveHero(secondHeroCoordinates, "secondHero");