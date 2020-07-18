/**
 * @namespace CreateGameField
 */

const backgroundPath = "static/img/backgrounds/"; // use to make relative path for images
let backgroundsName = ["bluemoon.png", "Cavern.svg", "cityskyline.png", "darkForest.jpg", "forest.png", "desert.png"];


/**
 * Get random background name from array and set him to body background
 * @memberof CreateGameField
 * @func
 * @param {Array} array - array with image names
 * @example
 * setNewBackground([1.jpg, 2.png]);
 */
function setNewBackground(array) {
  let randomBackgroundIndex = Math.floor(Math.random() * array.length); //get random index from array
  let randomBackground = array[randomBackgroundIndex]; //get element from array with random index
  let backgroundStyle = backgroundPath + randomBackground; // create url path for image
  document.body.style.backgroundImage = `url('${backgroundStyle}')`; // set body background image
}
setNewBackground(backgroundsName);


/** 
 * Set game region used screen size
 * @memberof CreateGameField
 * @returns {nubmer} game field square size
 */
function setAreaSize() {
  let areaSize;
  if (window.innerHeight < window.innerWidth / 2) {
    areaSize = window.innerHeight - 50; //set game square size like screen height 
  } else {
    areaSize = window.innerWidth / 2; //set game square size like half screen width
  }
  return areaSize;
}
let areaSize = setAreaSize();


/**
 * Create game field section and set her width and height.
 * Add 900 divs to game area (30x30) and set their size.
 * @memberof CreateGameField
 * @param {number} areaSize - {@link areaSize} of game field
 */
function createGameArea(areaSize) {
  let gameArea = document.createElement("section"); //game area
  gameArea.classList.add("game-area");
  gameArea.style.width = areaSize + 'px';
  gameArea.style.height = areaSize + 'px';
  gameArea.style.backgroundSize = areaSize / 30 + 'px';
  document.body.appendChild(gameArea);

  for (let i = 0; i < 900; i++) //add fields to game area
  {
    let field = document.createElement("div");
    field.classList.add("field");
    field.style.width = areaSize / 30 + 'px';
    field.style.height = areaSize / 30 + 'px';
    field.style.backgroundSize = areaSize / 30 - 5 + 'px';
    field.style.zIndex = -1;
    gameArea.appendChild(field);
  }
}
createGameArea(areaSize);


let fieldsArray = document.getElementsByClassName("field");

/**
 * set attributes to all divs in game section from 1 to 30.
 * @memberof CreateGameField
 */
function setCoordinates() {
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
}
setCoordinates();

/**
 * Find field with given coordinates
 * @param {int} x - x coordinate
 * @param {int} y - y coordinate
 * @return {Element} - DOM element(field of game zone)
 */
function findField(x, y) {
  return document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
}


const popup = document.getElementsByClassName("popup")[0];
popup.style.height = window.innerHeight;
popup.style.width = window.innerWidth;

let firstHeroCoordinates = [15, 1];
let secondHeroCoordinates = [15, 30];