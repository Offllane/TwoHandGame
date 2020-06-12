let areaSize;

if (window.innerHeight < window.innerWidth / 2)
{
  areaSize = window.innerHeight - 50;
}
else
{
  areaSize = window.innerWidth / 2;
}

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