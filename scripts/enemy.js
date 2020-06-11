class Enemy
{
  constructor(posX, posY)
  {
    this.pos = {
      x: posX,
      y: posY
    };
  }

  addToArea()
  {
    let currentEnemyStep = document.querySelector(
      '[posX = "' + this.pos.x + '"][posY = "' + this.pos.y + '"]'
    );
    currentEnemyStep.classList.add("enemy");
  }

  selectTarget()
  {
    let x1 = firstHeroCoordinates[0];
    let y1 = firstHeroCoordinates[1];
    let x2 = secondHeroCoordinates[0];
    let y2 = secondHeroCoordinates[1];

    let firstHeroDistance = Math.round(Math.sqrt((Math.pow(x1 - this.pos.x, 2) + Math.pow(y1 - this.pos.y, 2))));
    let secondHeroDistance = Math.round(Math.sqrt((Math.pow(x2 - this.pos.x, 2) + Math.pow(y2 - this.pos.y, 2))));

    if (firstHeroDistance <= secondHeroDistance)
    {
      this.move(firstHeroCoordinates);
    }
    else
    {
      this.move(secondHeroCoordinates);
    }
  }

  move(targetCoordinates)
  {
    let speedX = 1;
    let speedY = 1;
    let currentEnemyPosition = document.querySelector('[posX = "' + this.pos.x + '"][posY = "' + this.pos.y + '"]');
    currentEnemyPosition.classList.remove("enemy");

    let direction = "none";

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

    switch (direction)
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
    let enemyPosition = document.querySelector('[posX = "' + this.pos.x + '"][posY = "' + this.pos.y + '"]');
    enemyPosition.classList.add("enemy");
  }
}

function getSpawnCoordinates()
{
  let currentCoordinates = [];
  let x;
  let y;
  if (Math.random() >= 0.5)
  {
    x = firstHeroCoordinates[0];
    y = firstHeroCoordinates[1];
  }
  else
  {
    x = secondHeroCoordinates[0];
    y = secondHeroCoordinates[1];
  }
  currentCoordinates.push(x);
  currentCoordinates.push(y);
  
  let random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      if(currentCoordinates[0] <= 26)
        currentCoordinates[0] += 3;
      else
        currentCoordinates[0] -= 3;
      break;
    case 1:
      if(currentCoordinates[0] >= 4)
        currentCoordinates[0] -= 3;
      else
        currentCoordinates[0] += 3;
      break;
    case 2:
      if(currentCoordinates[1] <=26)
        currentCoordinates[1] += 3;
      else
        currentCoordinates[1] -= 3;
      break;
    case 3:
      if(currentCoordinates[1]>= 4)
      currentCoordinates[1] -= 3;
      else
        currentCoordinates[1] += 3;
      break;
    default:
      break;
  }

  return currentCoordinates;
}

let enemiesList = [];
let enemy = new Enemy(15, 15);
enemiesList.push(enemy);

setInterval(() =>
{
  getSpawnCoordinates();
  let enemy = new Enemy(getSpawnCoordinates()[0], getSpawnCoordinates()[1]);
  enemiesList.push(enemy);
}, config.enemySpawnTime);