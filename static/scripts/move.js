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
 * @param {array} heroCoordinates - two hero coordinates
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
 * @param {array} heroCoordinates - two hero coordinates 
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
 * Show steps quantity on the screen
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
    if (spawnEnemyTurn == config.enemySpawnTime) {
      let enemyCoordinate = getSpawnCoordinates();
      let enemy = new Enemy(enemyCoordinate[0], enemyCoordinate[1]);
      // console.log(enemyCoordinate[0], enemyCoordinate[1]);
      // enemy.addToArea;
      enemiesList.push(enemy); //create new enemy
      spawnEnemyTurn = 0;
    }
  }
}


let heroDirection = "none";
/**
 * @function movementButtonController
 * @memberof MovementFunctions
 * @description Event listener for move buttons
 */
document.addEventListener("keydown", function (event) {
  if (event.code == "KeyW") {
    heroDirection = "up";
    moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    heroStepCounter++;
  }
  if (event.code == "KeyS") {
    heroDirection = "down";
    moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    heroStepCounter++;
  }
  if (event.code == "KeyA") {
    heroDirection = "left";
    moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    heroStepCounter++;
  }
  if (event.code == "KeyD") {
    heroDirection = "right";
    moveHero(firstHeroCoordinates, "firstHero", heroDirection);
    heroStepCounter++;
  }

  if (event.keyCode == 38) {
    heroDirection = "up";
    moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    heroStepCounter++;
  }
  if (event.keyCode == 40) {
    heroDirection = "down";
    moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    heroStepCounter++;
  }
  if (event.keyCode == 37) {
    heroDirection = "left";
    moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    heroStepCounter++;
  }
  if (event.keyCode == 39) {
    heroDirection = "right";
    moveHero(secondHeroCoordinates, "secondHero", heroDirection);
    heroStepCounter++;
  }
  drawRemainingSteps();
  isLastStep();
});

moveHero(firstHeroCoordinates, "firstHero"); //first turn generate
moveHero(secondHeroCoordinates, "secondHero");