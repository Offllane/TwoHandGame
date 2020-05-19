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

  selecttarget()
  {
    let x1 = firstHeroCoordinates[0];
    let y1 = firstHeroCoordinates[1];
    let x2 = secondHeroCoordinates[0];
    let y2 = secondHeroCoordinates[1];

    let firstHeroDistance = Math.round(Math.sqrt((Math.pow(x1 - this.pos.x, 2) + Math.pow(y1 - this.pos.y, 2))));
    let secondHeroDistance = Math.round(Math.sqrt((Math.pow(x2 - this.pos.x, 2) + Math.pow(y2 - this.pos.y, 2))));

    console.log(firstHeroDistance, secondHeroDistance);

    if (firstHeroDistance <= secondHeroDistance)
    {
      console.log("first");
      this.move(firstHeroCoordinates);
    }
    else 
    {
      console.log("second");
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
        this.pos.y -= speedY;
        break;
      case "down":
        this.pos.y += speedY;
        break;
      case "left":
        this.pos.x -= speedX;
        break;
      case "right":
        this.pos.x += speedX;
        break;
      default:
        break;
    }
    let enemyPosition = document.querySelector('[posX = "' + this.pos.x + '"][posY = "' + this.pos.y + '"]');
    enemyPosition.classList.add("enemy");
  }
}

let enemy = new Enemy(15, 15);


setInterval(() =>
{
  enemy.selecttarget();
}, 1000);