/**
 * @namespace AttackFunctions
 */

let attackZoneFieldsList = []; // contain fields which contain class attack-area


/**
 * Find x for each y used two point straight line equation
 * @memberof AttackFunctions
 * @param {int} y - one of the field between (on height) first and second heroes
 * @returns {int} - coordinate x of the field with a given y
 */
function findXCoordinate(y)
{
  let x1, x2, y1, y2;
  x1 = firstHeroCoordinates[0];
  y1 = firstHeroCoordinates[1];
  x2 = secondHeroCoordinates[0];
  y2 = secondHeroCoordinates[1];

  let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1); // two point straight line equation
  return x;
}

/**
 * Find y for each x used two point straight line equation
 * @memberof AttackFunctions
 * @param {int} x - one of the field between(on width) first and second heroes
 * @returns {int} - coordinate y of the field with a given x
 */
function findYCoordinate(x)
{
  let x1, x2, y1, y2;
  x1 = firstHeroCoordinates[0];
  y1 = firstHeroCoordinates[1];
  x2 = secondHeroCoordinates[0];
  y2 = secondHeroCoordinates[1];

  let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1)); // two point straight line equation
  return y;
}

/**
 * Remove attack picture from given field 
 * @memberof AttackFunctions
 * @param {int} x - coordinate x
 * @param {int} y - coordinate y
 */
function removeAttackArea(x, y)
{
  let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
  currentAttackPosition.classList.remove("attack-area");
}


/**
 * Find all fields on line between two heroes and remove attack picture
 * @memberof AttackFunctions
 */
function clearAttackZone()
{
  let x1, x2, y1, y2;

  x1 = firstHeroCoordinates[0];
  y1 = firstHeroCoordinates[1];
  x2 = secondHeroCoordinates[0];
  y2 = secondHeroCoordinates[1];

  attackZoneFieldsList = [];

  for (let x = x1 + 1; x < x2; x++)
  {
    let y = findYCoordinate(x);
    removeAttackArea(x, y);
  }

  for (let y = y1 + 1; y < y2; y++)
  {
    let x = findXCoordinate(y);
    removeAttackArea(x, y);
  }

  for (let x = x2 + 1; x < x1; x++)
  {
    let y = findYCoordinate(x);
    removeAttackArea(x, y);
  }

  for (let y = y2 + 1; y < y1; y++)
  {
    let x = findXCoordinate(y);
    removeAttackArea(x, y);
  }
}

/**
 * Add attack picture to given field
 * @memberof AttackFunctions
 * @param {int} x - coordintate x
 * @param {int} y - coordinate y
 */
function addAttackArea(x, y)
{
  let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
  currentAttackPosition.classList.add("attack-area");
  attackZoneFieldsList.push(currentAttackPosition);
}


/**
 * Find all fields between two heroes and add attack picture
 * @memberof AttackFunctions
 */
function createNewAttackZone()
{
  let x1, x2, y1, y2;

  x1 = firstHeroCoordinates[0];
  y1 = firstHeroCoordinates[1];
  x2 = secondHeroCoordinates[0];
  y2 = secondHeroCoordinates[1];


  for (let x = x1 + 1; x < x2; x++)
  {
    let y = findYCoordinate(x);
    addAttackArea(x, y);
  }

  for (let y = y1 + 1; y < y2; y++)
  {
    let x = findXCoordinate(y);
    addAttackArea(x, y);
  }

  for (let x = x2 + 1; x < x1; x++)
  {
    let y = findYCoordinate(x);
    addAttackArea(x, y);
  }

  for (let y = y2 + 1; y < y1; y++)
  {
    let x = findXCoordinate(y);
    addAttackArea(x, y);
  }
}

let points = 1;
/**
 * Add point and displayed it
 * @param {int} quantity - points quantity
 */
function addPoints(quantity)
{
  document.getElementsByClassName("score")[0].innerHTML = `Your score is: ${points}`;
  points += quantity;
}


/**
 * @function attackEvent
 * @description Play attack event. Check collision. If enemies dead remove them from their array.
 * @memberof AttackFunctions
 */
document.addEventListener("keydown", function(event)
{
  let attackEventFieldsList = [];
  if (event.code == "Space")
  {
    attackZoneFieldsList.forEach(element =>
    {
      element.classList.add("attack-event");

      if (element.classList.contains("enemy") || element.classList.contains("enemy_left-side"))
      {
        let deadenemy = enemiesList.findIndex(enemy => enemy.pos.x == element.getAttribute("posx") && enemy.pos.y == element.getAttribute("posy")); //find enemy with same position  
        enemiesList[deadenemy].clearField();
        enemiesList.splice(deadenemy, 1);
        addPoints(1);
      }
      attackEventFieldsList.push(element);
    });

    setTimeout(() => //after some time return attack picture to its original position
    {
      attackEventFieldsList.forEach(element => element.classList.remove("attack-event"));
    }, 100);
  }
});