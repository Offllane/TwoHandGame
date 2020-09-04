class Reaper extends Enemy {
/**
 * Replace enemy accordin to hero position
 * @memberof EnemyFunctions
 * @param {array} targetCoordinate - coordinates of the hero
 */
  move(targetCoordinate: Array<number>): void {
    super.clearField();
    let direction: string = super.setDirection(targetCoordinate);
    switch (direction) {
      case "up":
        this.pos.y -= config.reaperSpeed;
        break;
      case "down":
        this.pos.y += config.reaperSpeed;
        break;
      case "left": this.pos.x -= config.reaperSpeed;
        break;
      case "right": this.pos.x += config.reaperSpeed;
        break;
      default:
        console.error("wrong direction");
    }

    super.rotateEnemy(direction);
    super.checkHeroCollision();
  }
}