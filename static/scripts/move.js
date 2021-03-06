/**
 * @namespace MovementFunctions
 */

/**
 * Remove all hero pictures from field
 * @memberof MovementFunctions
 * @param {Element} heroPosition - current hero position
 */

function clearMovement(heroPosition) {
  heroPosition.classList.remove("firstHero_back-side");
  heroPosition.classList.remove("firstHero_left-side");
  heroPosition.classList.remove("firstHero_right-side");
  heroPosition.classList.remove("firstHero");
  heroPosition.classList.remove("secondHero_back-side");
  heroPosition.classList.remove("secondHero_left-side");
  heroPosition.classList.remove("secondHero_right-side");
  heroPosition.classList.remove("secondHero");
}


/**
 * Check hero position and make heroSpeed 0 if hero want to out from game area
 * @memberof MovementFunctions
 * @param {array} heroCoordinates - two coordinates of hero
 * @param {string} direction - movement direction
 * @returns {int} heroSpeed
 */
function checkBorder(heroCoordinates, direction) {
  let heroSpeed = config.heroSpeed;
  if (heroCoordinates[0] == 1 && direction == "left") {
    heroSpeed = 0;
  }
  if (heroCoordinates[0] == 30 && direction == "right") {
    heroSpeed = 0;
  }
  if (heroCoordinates[1] == 1 && direction == "up") {
    heroSpeed = 0;
  }
  if (heroCoordinates[1] == 30 && direction == "down") {
    heroSpeed = 0;
  }
  return heroSpeed;
}


/**
 * Show first hero turned in the correct direction
 * @memberof MovementFunctions
 * @param {string} direction - last movement side
 */
function rotateFirstHero(direction, heroPosition) {
  switch (direction) {
    case "up":
      heroPosition.classList.add("firstHero_back-side");
      break;
    case "down":
      heroPosition.classList.remove("firstHero_back-side");
      break;
    case "left":
      heroPosition.classList.add("firstHero_left-side");
      break;
    case "right":
      heroPosition.classList.add("firstHero_right-side");
      break;
    default:
      break;
  }
}

/**
 * Show second hero turned in the correct direction
 * @memberof MovementFunctions
 * @param {string} direction - last movement side
 */
function rotateSecondHero(direction, heroPosition) {
  switch (direction) {
    case "up":
      heroPosition.classList.add("secondHero_back-side");
      break;
    case "down":
      heroPosition.classList.remove("secondHero_back-side");
      break;
    case "left":
      heroPosition.classList.add("secondHero_left-side");
      break;
    case "right":
      heroPosition.classList.add("secondHero_right-side");
      break;
    default:
      break;
  }
}


/**
 * Replace hero picture
 * @memberof MovementFunctions
 * @param {array} heroCoordinates - two coordinates of hero
 * @param {string} heroName - hero name
 * @param {string} direction -hero direction
 */
function moveHero(heroCoordinates, heroName, direction) {
  let currentHeroStep = findField(heroCoordinates[0], heroCoordinates[1]);
  clearMovement(currentHeroStep);

  heroSpeed = checkBorder(heroCoordinates, direction);
  let heroPosition;


  clearAttackZone();
  switch (direction) {
    case "up":
      heroCoordinates[1] -= heroSpeed;
      break;
    case "down":
      heroCoordinates[1] += heroSpeed;
      break;
    case "left":
      heroCoordinates[0] -= heroSpeed;
      break;
    case "right":
      heroCoordinates[0] += heroSpeed;
      break;
    default:
      break;
  }
  heroPosition = findField(heroCoordinates[0], heroCoordinates[1]);
  heroPosition.classList.add(heroName);
  createNewAttackZone();

  switch (heroName) {
    case "firstHero":
      rotateFirstHero(direction, heroPosition);
      break;
    case "secondHero":
      rotateSecondHero(direction, heroPosition);
      break;
    default:
      break;
  }
}

/**
 * Redraw steps quantity on the screen
 */
function drawRemainingSteps() {
  let remainingSteps = config.step - heroStepCounter;
  document.getElementsByClassName("steps-quantity")[0].innerHTML = `${remainingSteps}`;
}

let heroStepCounter = 0;
let spawnEnemyTurn = 0;

function isLastStep() {
  if (heroStepCounter + 1 >= config.step + 1) {
    enemiesList.forEach(enemy => {
      enemy.move(enemy.selectTarget());
    }); // enemies turn
    spawnEnemyTurn++;
    heroStepCounter = 0; //add new turns to heroes
    drawRemainingSteps(); // draw step quantity
    if (spawnEnemyTurn % config.reaperSpawnTime == 0) {
      for (let i = 0; i <= config.reaperSpawnQuantity; i++) {
        let enemyCoordinate = getSpawnCoordinates();
        let reaper = new Reaper(enemyCoordinate[0], enemyCoordinate[1], "reaper");
        enemiesList.push(reaper); //create new enemy
      }
    }
    if (spawnEnemyTurn % config.rogueSpawnTime == 0) {
      let enemyCoordinate = getSpawnCoordinates();
      let rogue = new Rogue(enemyCoordinate[0], enemyCoordinate[1], "rogue");
      enemiesList.push(rogue); //create new enemy
    }
  }
}

/**
 * detemines which buttons is pressed and call moveHero
 * @memberof MovementFunctions
 * @param {event} event - which button is pressed
 */

function replaceHero(event) {
  if (event != null) {
    if (event.code == "KeyW") {
      heroDirection = "up";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);        
    }
    if (event.code == "KeyS") {
      heroDirection = "down";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);       
    }
    if (event.code == "KeyA") {
      heroDirection = "left";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);         
    }
    if (event.code == "KeyD") {
      heroDirection = "right";
      moveHero(firstHeroCoordinates, "firstHero", heroDirection);          
    }

    if (event.keyCode == 38) {
      heroDirection = "up";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);          
    }
    if (event.keyCode == 40) {
      heroDirection = "down";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);      
      return;
    }
    if (event.keyCode == 37) {
      heroDirection = "left";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);            
    }
    if (event.keyCode == 39) {
      heroDirection = "right";
      moveHero(secondHeroCoordinates, "secondHero", heroDirection);           
    }
    heroStepCounter++;
    drawRemainingSteps();
    isLastStep();
  }
}


let heroDirection = "none";
let lastEvent;
/**
 * @function movementButtonController
 * @memberof MovementFunctions
 * @description Event listener for move buttons
 */
document.addEventListener("keydown", function (event) {
  if (event.code != "Space") {
    lastEvent = event;
    if (config.mode == "easy") {
      replaceHero(lastEvent);
    }    
  }
});

if (config.mode == "hard") {
  setInterval(() => {
    replaceHero(lastEvent);
  }, config.heroTurnInterval);
}

//spawn heroes
moveHero(firstHeroCoordinates, "firstHero"); 
moveHero(secondHeroCoordinates, "secondHero");