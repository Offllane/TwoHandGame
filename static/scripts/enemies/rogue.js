class Rogue extends Enemy {
  move(targetCoordinates) {
    super.clearField();
    let direction = super.setDirection(targetCoordinates);

    try {
      switch (direction) // replace position 
      {
        case "up":
          if (this.pos.y != 2) {
            this.pos.y -= config.rogueSpeed;
          } else {
            this.pos.y -= 1;
          }
          break;
        case "down":
          if (this.pos.y != 29) {
            this.pos.y += config.rogueSpeed;
          } else {
            this.pos.y += 1;
          }
          break;
        case "left":
          if (this.pos.x != 2) {
            this.pos.x -= config.rogueSpeed;
          }
          else {
            this.pos.x -= 1;
          }
          break;
        case "right":
          if (this.pos.x != 29) {
            this.pos.x += config.rogueSpeed;
          }   
          else {
            this.pos.x += 1;
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.log("rogue move like a shit");
    }

    super.rotateEnemy(direction);
    super.checkHeroCollision();
  }
}

let rogue = new Rogue(12, 2, "rogue");
enemiesList.push(rogue);