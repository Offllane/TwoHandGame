/**
 * @namespace EnemyFunctions
 */

class Enemy
{
  constructor(posX, posY)
  {
    this.pos = {
      x: posX,
      y: posY
    };
  }

  addToArea() {
    let currentEnemyStep = this.findDistance(this.pos.x, this.pos.y);
    currentEnemyStep.classList.add("enemy");
  }

  /**
   * Find distance using coordinates hero and enemy
   * @memberof EnemyFunctions
   * @param {number} x - hero x coordinate
   * @param {number} y - hero y coordinate
   * @returns {number} - distance
   * @example findDistance(3,4)
   * // => 5
   */
  findDistance(x, y)
  {
    return Math.round(Math.sqrt((Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2))));
  }

  /**
   * Check distance between enemy and two heroes and select nearest
   * @memberof EnemyFunctions
   * @returns {array} - coordinates of the hero
   */
  selectTarget()
  {
    let x1 = firstHeroCoordinates[0];
    let y1 = firstHeroCoordinates[1];
    let x2 = secondHeroCoordinates[0];
    let y2 = secondHeroCoordinates[1];

    let firstHeroDistance = this.findDistance(x1, y1);
    let secondHeroDistance = this.findDistance(x2, y2);

    if (firstHeroDistance <= secondHeroDistance)
    {
      return firstHeroCoordinates;
    }
    else
    {
      return secondHeroCoordinates;
    }
  }


  /**
   * Check hero position
   * @memberof EnemyFunctions
   * @param {array} targetCoordinates - coordinates of the hero relative to the enemy
   * @returns {string} - direction 
   */
  setDirection(targetCoordinates)
  {
    let direction;

    if (this.pos.x < targetCoordinates[0] && this.pos.y == targetCoordinates[1])
    {
      direction = "right";
    }
    if (this.pos.x > targetCoordinates[0] && this.pos.y == targetCoordinates[1])
    {
      direction = "left";
    }
    if (this.pos.y < targetCoordinates[1] && this.pos.x == targetCoordinates[0])
    {
      direction = "down";
    }
    if (this.pos.y > targetCoordinates[1] && this.pos.x == targetCoordinates[0])
    {
      direction = "up";
    }
    if (this.pos.x < targetCoordinates[0] && this.pos.y > targetCoordinates[1])
    {
      if (Math.random() >= 0.5)
      {
        direction = "right";
      }
      else
      {
        direction = "up";
      }
    }
    if (this.pos.x < targetCoordinates[0] && this.pos.y < targetCoordinates[1])
    {
      if (Math.random() >= 0.5)
      {
        direction = "right";
      }
      else
      {
        direction = "down";
      }
    }
    if (this.pos.x > targetCoordinates[0] && this.pos.y > targetCoordinates[1])
    {
      if (Math.random() >= 0.5)
      {
        direction = "left";
      }
      else
      {
        direction = "up";
      }
    }
    if (this.pos.x > targetCoordinates[0] && this.pos.y < targetCoordinates[1])
    {
      if (Math.random() >= 0.5)
      {
        direction = "left";
      }
      else
      {
        direction = "down";
      }
    }

    return direction;
  }

  /**
   * Find field with current coordinate
   * @memberof EnemyFunctions
   */
  findCurrentPosition()
  {
    return document.querySelector('[posX = "' + this.pos.x + '"][posY = "' + this.pos.y + '"]');
  }

  /**
   * Remove enemy from current field
   * @memberof EnemyFunctions
   */
  clearField()
  {
    let currentEnemyPosition = this.findCurrentPosition();
    currentEnemyPosition.classList.remove("enemy");
    currentEnemyPosition.classList.remove("enemy_left-side");
  }

  /**
   * Set correct enemy direcrion according to move
   * @memberof EnemyFunctions
   * @param {string} direction - enemy side
   */
  rotateEnemy(direction)
  {
    let enemyPosition = this.findCurrentPosition();
    if (direction == "left")
    {
      enemyPosition.classList.add("enemy_left-side");
    }
    else
    {
      enemyPosition.classList.add("enemy");
    }
  }

  /**
   * Substring one HP if hero and enemy has same coordinates. Write life remaining
   * @memberof EnemyFunctions
   */
  checkHeroCollision()
  {
    let enemyPosition = this.findCurrentPosition();
    if (enemyPosition.classList.contains("firstHero") || enemyPosition.classList.contains("secondHero"))
    {
      config.lifeQuantity--;
      if (config.lifeQuantity <= 0)
      {
        makePopupVisible();
      }
      document.getElementsByClassName("lifes")[0].innerHTML = `Life remaining: ${config.lifeQuantity}`;
    }
  }

  /**
   * Replace enemy accordin to hero position
   * @memberof EnemyFunctions
   * @param {array} targetCoordinates - coordinates of the hero
   */
  move(targetCoordinates)
  {
    this.clearField();
    let direction = this.setDirection(targetCoordinates);

    switch (direction) // replace position 
    {
      case "up":
        this.pos.y -= config.enemySpeed;
        break;
      case "down":
        this.pos.y += config.enemySpeed;
        break;
      case "left":
        this.pos.x -= config.enemySpeed;
        break;
      case "right":
        this.pos.x += config.enemySpeed;
        break;
      default:
        break;
    }

    this.rotateEnemy(direction);
    this.checkHeroCollision();
  }
}

function getRandomHeroCoordinates()
{
  let coordinates = [];
  if (Math.random() >= 0.5)
  {
    coordinates.push(firstHeroCoordinates[0]);
    coordinates.push(firstHeroCoordinates[1]);
  }
  else
  {
    coordinates.push(secondHeroCoordinates[0]);
    coordinates.push(secondHeroCoordinates[1]);
  }
  coordinates.push(firstHeroCoordinates[0]);
  coordinates.push(firstHeroCoordinates[1]);
  return coordinates;
}

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

/**
 * Get spawn coordinate to enemy in random field exepted hero field
 */
function getSpawnCoordinates()
{
  let currentCoordinates = getRandomHeroCoordinates();
  let spawnCoordinates = [];

  do {
    spawnCoordinates.push(randomInteger(1, 30));
    spawnCoordinates.push(randomInteger(1, 30));
  }
  while (currentCoordinates[0] == spawnCoordinates[0] && currentCoordinates[1] == spawnCoordinates[1]);
  
  return spawnCoordinates;
}

let enemiesList = []; //will be contain all enemies
let enemy = new Enemy(4, 2);
enemiesList.push(enemy);