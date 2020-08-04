class Reaper extends Enemy {
  /**
   * Replace enemy accordin to hero position
   * @memberof EnemyFunctions
   * @param {array} targetCoordinate - coordinates of the hero
   */
  move(targetCoordinates) {
    super.clearField();
    let direction = super.setDirection(targetCoordinates);

    switch (direction) // replace position 
    {
      case "up":
        this.pos.y -= config.reaperSpeed;
        break;
      case "down":
        this.pos.y += config.reaperSpeed;
        break;
      case "left":
        this.pos.x -= config.reaperSpeed;
        break;
      case "right":
        this.pos.x += config.reaperSpeed;
        break;
      default:
        break;
    }

    super.rotateEnemy(direction);
    super.checkHeroCollision();
  }
}


let reaper = new Reaper(4, 2, "reaper");
enemiesList.push(reaper);