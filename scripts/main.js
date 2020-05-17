let gameArea = document.createElement("section");
gameArea.classList.add("game-area");
document.body.appendChild(gameArea);

for (let i = 0; i < 900; i++) {
  let field = document.createElement("div");
  field.classList.add("field");
  gameArea.appendChild(field);
}

let fieldsArray = document.getElementsByClassName("field");

let x = 1;
let y = 1;
for (let i = 0; i < fieldsArray.length; i++) {
  if (x < 30) {
    fieldsArray[i].setAttribute("posX", x);
    fieldsArray[i].setAttribute("posY", y);
    x++;
  } else {
    fieldsArray[i].setAttribute("posX", x);
    fieldsArray[i].setAttribute("posY", y);
    y++;
    x = 1;
  }
}

let config = {
  interval: 1000,
  step:2,
}

let firstHeroCoordinates = [4, 5];
let secondHeroCoordinates =[28, 29]

function moveHero(heroCoordinates,heroName, direction) {
  let speedX = 1;
  let speedY = 1;
  let currentHeroStep = document.querySelector(
    '[posX = "' + heroCoordinates[0] + '"][posY = "' + heroCoordinates[1] + '"]'
  );
  currentHeroStep.classList.remove(heroName);  
  let heroPosition;
  if (heroCoordinates[0] == 1 && direction=="left") {
    heroCoordinates[0] = 30;
    speedX = 0;
  }
  if (heroCoordinates[0] == 30 && direction == "right") {
    heroCoordinates[0] = 1;
    speedX = 0;
  }
  if (heroCoordinates[1] == 1 && direction=="up") {
    heroCoordinates[1] = 30;
    speedY = 0;
  }
  if (heroCoordinates[1] == 30 && direction == "down") {
    heroCoordinates[1] = 1;
    speedY = 0;
  }

    switch(direction){
      case "up": heroCoordinates[1] -= speedY;
      break;
      case "down": heroCoordinates[1] += speedY;
      break;
      case "left": heroCoordinates[0] -= speedX;
      break;
      case "right": heroCoordinates[0] += speedX;
      break;
      default: break;
    }
    heroPosition = document.querySelector('[posX = "' + heroCoordinates[0] + '"][posY = "' +heroCoordinates[1] + '"]');

  heroPosition.classList.add(heroName);
}

function drawRemainingSteps() {
  let remainingSteps = config.step - heroStepCounter;
  document.getElementsByClassName("step-counter")[0].innerHTML = `Steps remaining:${remainingSteps}`;
}

let heroStepCounter = 0;
let heroDirection;

document.addEventListener("keydown", function (event) {
  heroStepCounter++;
  if (heroStepCounter <= config.step) {
    drawRemainingSteps();
  }    
  if (heroStepCounter > config.step) {
    heroDirection = "none";
  }
  else {
     if (event.code == "KeyW") {
       heroDirection = "up";
        moveHero(firstHeroCoordinates,"firstHero", heroDirection);
     }
     if (event.code == "KeyS") {
       heroDirection = "down";
        moveHero(firstHeroCoordinates,"firstHero", heroDirection);
     }
     if (event.code == "KeyA") {
       heroDirection = "left";
        moveHero(firstHeroCoordinates,"firstHero", heroDirection);
     }
     if (event.code == "KeyD") {
       heroDirection = "right";
        moveHero(firstHeroCoordinates,"firstHero", heroDirection);
     }
     if (event.keyCode == 38) {
       heroDirection = "up";
       moveHero(secondHeroCoordinates, "secondHero", heroDirection);
     }
     if (event.keyCode == 40) {
       heroDirection = "down";
       moveHero(secondHeroCoordinates, "secondHero", heroDirection);
     }
     if (event.keyCode == 37) {
       heroDirection = "left";
       moveHero(secondHeroCoordinates, "secondHero", heroDirection);
     }
     if (event.keyCode == 39) {
       heroDirection = "right";
       moveHero(secondHeroCoordinates, "secondHero", heroDirection);
     }
  }
  console.log(heroStepCounter);
 
});

moveHero(firstHeroCoordinates, "firstHero");
moveHero(secondHeroCoordinates, "secondHero");

setInterval(() => {    
  heroStepCounter = 0;
  drawRemainingSteps();
}, config.interval);