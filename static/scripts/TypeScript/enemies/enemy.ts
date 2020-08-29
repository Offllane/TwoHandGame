/**
 * @namespace EnemyFunctions
 */

interface IPosition {
  x: number,
  y: number;
}

interface IEnemy {
  pos: IPosition;
  findDistance(x: number, y: number): number;
  selectTarget(): number;
  setDirection(targetCoordinates: Array<number>): string;
  findCurrentPosition(posX: number, posY: number): void;
  clearField(): void;
  rotateEnemy(direction: string): void;
  checkHeroCollision(): void;
  move(targetCoordinates: Array<number>): void
}

class Enemy implements IEnemy {
  pos: IPosition;
  style: string;
  constructor(posX: number, posY: number, style: string) {
    this.pos = {
      x: posX,
      y: posY
    };
    this.style = style;
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
  findDistance(x: number, y: number): number {
    return Math.round(Math.sqrt((Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2))));
  }

  /**
  * Check distance between enemy and two heroes and select nearest
  * @memberof EnemyFunctions
  * @returns {array} - coordinates of the hero
  */
  selectTarget(): number {
    let x1, x2, y1, y2: number;

    x1 = firstHeroCoordinates[0];
    y1 = firstHeroCoordinates[1];
    x2 = secondHeroCoordinates[0];
    y2 = secondHeroCoordinates[1];

    let distanceToFirstHero: number = this.findDistance(x1, y1);
    let distanceToSecondHero: number = this.findDistance(x2, y2);

    if (distanceToFirstHero <= distanceToSecondHero) {
      return distanceToFirstHero;
    }
    return distanceToSecondHero;
  }

  /**
   * Check hero position
   * @memberof EnemyFunctions
   * @param {array} targetCoordinates - coordinates of the hero relative to the enemy
   * @returns {string} - direction
   */
  setDirection(targetCoordinates: Array<number>): string {
    let direction: string = "none";

    if (this.pos.x < targetCoordinates[0] && this.pos.y == targetCoordinates[1]) {
      direction = "right";
    }
    if (this.pos.x > targetCoordinates[0] && this.pos.y == targetCoordinates[1]) {
      direction = "left";
    }
    if (this.pos.y < targetCoordinates[1] && this.pos.x == targetCoordinates[0]) {
      direction = "down";
    }
    if (this.pos.y > targetCoordinates[1] && this.pos.x == targetCoordinates[0]) {
      direction = "up";
    }
    if (this.pos.x < targetCoordinates[0] && this.pos.y > targetCoordinates[1]) {
      if (Math.random() >= 0.5) {
        direction = "right";
      } else {
        direction = "up";
      }
    }
    if (this.pos.x < targetCoordinates[0] && this.pos.y < targetCoordinates[1]) {
      if (Math.random() >= 0.5) {
        direction = "right";
      } else {
        direction = "down";
      }
    }
    if (this.pos.x > targetCoordinates[0] && this.pos.y > targetCoordinates[1]) {
      if (Math.random() >= 0.5) {
        direction = "left";
      } else {
        direction = "up";
      }
    }
    if (this.pos.x > targetCoordinates[0] && this.pos.y < targetCoordinates[1]) {
      if (Math.random() >= 0.5) {
        direction = "left";
      } else {
        direction = "down";
      }
    }

    return direction;
  }

  /**
   * Find field with current coordinate
   * @memberof EnemyFunctions
   */
  findCurrentPosition() {
    return findField(this.pos.x, this.pos.y);
  }

  /**
   * Remove enemy from current field
   * @memberof EnemyFunctions
   */
  clearField() {
    let currentEnemyPosition: Element = this.findCurrentPosition();
    currentEnemyPosition.classList.remove(this.style);
    currentEnemyPosition.classList.remove(this.style + "_left-side");
  }

  /**
   * Set correct enemy direcrion according to move
   * @memberof EnemyFunctions
   * @param {string} direction - enemy side
   */
  rotateEnemy(direction: string) {
    let currentEnemyPosition: Element= this.findCurrentPosition();
    if (direction == "left") {
      currentEnemyPosition.classList.add(this.style + "_left-side");
    } else {
      currentEnemyPosition.classList.add(this.style);
    }
  }

  /**
   * Substring one HP if hero and enemy has same coordinates. Write life remaining
   * @memberof EnemyFunctions
   */
  checkHeroCollision() {
    let currentEnemyPosition: Element | null = this.findCurrentPosition();
    if (currentEnemyPosition?.classList.contains("firstHero") || currentEnemyPosition?.classList.contains("secondHero")) {
      config.lifeQuantity--;
      if (config.lifeQuantity <= 0) {
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
  move(targetCoordinates: Array<number>) {
    this.clearField();
    let direction: string = this.setDirection(targetCoordinates);

    switch (direction) // replace position 
    {
      case "up":
        this.pos.y -= 0; //enemySpeed
        break;
      case "down":
        this.pos.y += 0; //enemySpeed
        break;
      case "left":
        this.pos.x -= 0; //enemySpeed
        break;
      case "right":
        this.pos.x += 0; //enemySpeed
        break;
      default:
        break;
    }

    this.rotateEnemy(direction);
    this.checkHeroCollision();
  }
}

function getSpawnCoordinates(): Array<number> {
  let spawnCoordinates: Array<number> = [];

  do {
    spawnCoordinates.push(randomInteger(1, 30));
    spawnCoordinates.push(randomInteger(1, 30));
  }
  while ((firstHeroCoordinates[0] == spawnCoordinates[0] && firstHeroCoordinates[1] == spawnCoordinates[1]) ||
    (secondHeroCoordinates[0] == spawnCoordinates[0] && secondHeroCoordinates[1] == spawnCoordinates[1]));

  return spawnCoordinates;
}

let enemiesList: Array<Enemy> = []; //will be contain all enemies

//============= should remove after rewrite popup.js

const loosePageCollections = document.getElementsByClassName("loose-page") as HTMLCollectionOf<HTMLElement>;
const loosePage = loosePageCollections[0];
function makePopupVisible() {
  loosePage.style.display = "flex";
  document.getElementsByClassName("loose-page-score")[0].innerHTML = `Your score is: ${playerPoints}`;
}
