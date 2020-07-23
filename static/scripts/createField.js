/**
 * @namespace CreateGameField
 */

const backgroundPath = "static/img/backgrounds/"; // use to make relative path for images
let backgroundsName = ["static/img/backgrounds/desert.png",
  "static/img/backgrounds/pesok_barhany_pustynia_162742_1920x1080.jpg",
  "static/img/backgrounds/pesok_pustynia_barhany_178480_1920x1080.jpg",
  "static/img/backgrounds/pesok_pustynia_sled_161642_1920x1080.jpg",
  "static/img/backgrounds/pesok_sledy_pustynia_177059_1920x1080.jpg",
  "static/img/backgrounds/pesok_sledy_volnistyj_175005_1920x1080.jpg",
  "static/img/backgrounds/pesok_sledy_zasuha_169924_1920x1080.jpg",
  "static/img/backgrounds/pesok_volnistyj_noch_175753_1920x1080.jpg"
];

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

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
  document.body.style.backgroundImage = `url('${randomBackground}')`; // set body background image
}
setNewBackground(backgroundsName);


let avatarPath = "static/img/avatars/";
let avatarArray = [
  "0_Blacksmith_Chagrin_027.png",
  "0_Blacksmith_Idle Blinking_016.png",
  "0_Blacksmith_Idle Blinking_016.png",
  "0_Blacksmith_Joy_015.png",
  "0_Citizen_Communication_028.png",
  "0_Citizen_Idle Blinking_029.png",
  "0_Fallen_Angels_Hurt_000.png",
  "0_Fallen_Angels_Idle_007.png",
  "0_Fallen_Angels_Idle_012.png",
  "0_Fallen_Angels_Kicking_004.png",
  "0_Fallen_Angels_Kicking_006.png",
  "0_Fallen_Angels_Run Slashing_005.png",
  "0_Fallen_Angels_Slashing_006.png",
  "0_Fallen_Angels_Walking_012.png",
  "0_Golem_Idle_005.png",
  "0_Golem_Idle_007.png",
  "0_Golem_Idle_014.png",
  "0_Golem_Idle_015.png",
  "0_Golem_Kicking_004.png",
  "0_Golem_Slashing_000.png",
  "0_Golem_Slashing_005.png",
  "0_Golem_Throwing_005.png",
  "0_Golem_Throwing_006.png",
  "0_Jeweler_Chagrin_025.png",
  "0_Jeweler_Idle_019.png",
  "0_Sage_Chagrin_028.png",
  "0_Sage_Idle_010.png",
  "0_Sage_Idle_017.png",
  "0_Sage_Idle_025.png",
  "0_Warlord_Chagrin_020.png",
  "0_Warlord_Idle_010.png",
  "0_Warlord_Idle_019.png",
  "2_Golem_Kicking_004.png",
  "Golem_01_Idle_005.png"
];

function setNewAvatar(avatarArray) {
  let randomAvatarIndex = randomInteger(0, avatarArray.length-1); //get random index from array
  let randomAvatar = avatarArray[randomAvatarIndex]; //get element from array with random index
  let userImageStyle = avatarPath + randomAvatar;
  document.getElementsByClassName("user-image")[0].style.backgroundImage = `url('${userImageStyle}')`;
}
setNewAvatar(avatarArray);


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


const popup = document.getElementsByClassName("loose-page")[0];
popup.style.height = window.innerHeight;
popup.style.width = window.innerWidth;

let firstHeroCoordinates = [15, 1];
let secondHeroCoordinates = [15, 30];