/**
 * @namespace EnemyFunctions
 */
class Enemy {
    constructor(posX, posY, style) {
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
    findDistance(x, y) {
        return Math.round(Math.sqrt((Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2))));
    }
    /**
    * Check distance between enemy and two heroes and select nearest
    * @memberof EnemyFunctions
    * @returns {array} - coordinates of the hero
    */
    selectTarget() {
        let x1, x2, y1, y2;
        x1 = firstHeroCoordinates[0];
        y1 = firstHeroCoordinates[1];
        x2 = secondHeroCoordinates[0];
        y2 = secondHeroCoordinates[1];
        let distanceToFirstHero = this.findDistance(x1, y1);
        let distanceToSecondHero = this.findDistance(x2, y2);
        if (distanceToFirstHero <= distanceToSecondHero) {
            return firstHeroCoordinates;
        }
        return secondHeroCoordinates;
    }
    /**
     * Check hero position
     * @memberof EnemyFunctions
     * @param {array} targetCoordinates - coordinates of the hero relative to the enemy
     * @returns {string} - direction
     */
    setDirection(targetCoordinates) {
        let direction = "none";
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
            }
            else {
                direction = "up";
            }
        }
        if (this.pos.x < targetCoordinates[0] && this.pos.y < targetCoordinates[1]) {
            if (Math.random() >= 0.5) {
                direction = "right";
            }
            else {
                direction = "down";
            }
        }
        if (this.pos.x > targetCoordinates[0] && this.pos.y > targetCoordinates[1]) {
            if (Math.random() >= 0.5) {
                direction = "left";
            }
            else {
                direction = "up";
            }
        }
        if (this.pos.x > targetCoordinates[0] && this.pos.y < targetCoordinates[1]) {
            if (Math.random() >= 0.5) {
                direction = "left";
            }
            else {
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
        let currentEnemyPosition = this.findCurrentPosition();
        currentEnemyPosition.classList.remove(this.style);
        currentEnemyPosition.classList.remove(this.style + "_left-side");
    }
    /**
     * Set correct enemy direcrion according to move
     * @memberof EnemyFunctions
     * @param {string} direction - enemy side
     */
    rotateEnemy(direction) {
        let currentEnemyPosition = this.findCurrentPosition();
        if (direction == "left") {
            currentEnemyPosition.classList.add(this.style + "_left-side");
        }
        else {
            currentEnemyPosition.classList.add(this.style);
        }
    }
    /**
     * Substring one HP if hero and enemy has same coordinates. Write life remaining
     * @memberof EnemyFunctions
     */
    checkHeroCollision() {
        let currentEnemyPosition = this.findCurrentPosition();
        if ((currentEnemyPosition === null || currentEnemyPosition === void 0 ? void 0 : currentEnemyPosition.classList.contains("firstHero")) || (currentEnemyPosition === null || currentEnemyPosition === void 0 ? void 0 : currentEnemyPosition.classList.contains("secondHero"))) {
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
    move(targetCoordinates) {
        this.clearField();
        let direction = this.setDirection(targetCoordinates);
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
function getSpawnCoordinates() {
    let spawnCoordinates = [];
    do {
        spawnCoordinates.push(randomInteger(1, 30));
        spawnCoordinates.push(randomInteger(1, 30));
    } while ((firstHeroCoordinates[0] == spawnCoordinates[0] && firstHeroCoordinates[1] == spawnCoordinates[1]) ||
        (secondHeroCoordinates[0] == spawnCoordinates[0] && secondHeroCoordinates[1] == spawnCoordinates[1]));
    return spawnCoordinates;
}
let enemiesList = []; //will be contain all enemies
//============= should remove after rewrite popup.js
// const loosePageCollections = document.getElementsByClassName("loose-page");
// const loosePage = loosePageCollections[0];
// function makePopupVisible() {
//     loosePage.style.display = "flex";
//     document.getElementsByClassName("loose-page-score")[0].innerHTML = `Your score is: ${playerPoints}`;
// }
