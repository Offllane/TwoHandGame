const backgroundPath = "img/backgrounds/";
// let backgroundsName = ["bluemoon.png", "Cavern.svg", "cityskyline.png", "darkForest.jpg", "forest.png", "swamp.jpg", "desert.png"];
let backgroundsName = ["desert.png"];

function setNewBackground() {
  let randomBackgroundIndex = Math.floor(Math.random() * backgroundsName.length);
  let randomBackground = backgroundsName[randomBackgroundIndex];
  let backgroundStyle = backgroundPath + randomBackground;
  console.log(backgroundStyle);
  document.body.style.backgroundImage = `url('${backgroundStyle}')`;
}

setNewBackground();

let areaSize;

if (window.innerHeight < window.innerWidth / 2)
{
  areaSize = window.innerHeight - 50;
}
else
{
  areaSize = window.innerWidth / 2;
}

let popup = document.getElementsByClassName("popup")[0];
popup.style.height = window.innerHeight;
popup.style.width = window.innerWidth;

let gameArea = document.createElement("section");
gameArea.classList.add("game-area");
gameArea.style.width = areaSize +'px';
gameArea.style.height = areaSize + 'px';
gameArea.style.backgroundSize = areaSize / 30 + 'px';
document.body.appendChild(gameArea);

for (let i = 0; i < 900; i++) {
  let field = document.createElement("div");
  field.classList.add("field");
  field.style.width = areaSize / 30 + 'px';
  field.style.height = areaSize / 30 + 'px';
  field.style.backgroundSize = areaSize / 30 - 5 + 'px';
  field.style.zIndex = -1;
  gameArea.appendChild(field);
}

let fieldsArray = document.getElementsByClassName("field");

let x = 1;
let y = 1;
for (let i = 0; i < fieldsArray.length; i++)
{
  if (x < 30)
  {
    fieldsArray[i].setAttribute("posX", x);
    fieldsArray[i].setAttribute("posY", y);
    x++;
  }
  else
  {
    fieldsArray[i].setAttribute("posX", x);
    fieldsArray[i].setAttribute("posY", y);
    y++;
    x = 1;
  }
}

let firstHeroCoordinates = [15,1];
let secondHeroCoordinates = [15, 30];