let gameArea = document.createElement("section");
gameArea.classList.add("game-area");
document.body.appendChild(gameArea);

for (let i = 0; i < 900; i++)
{
  let field = document.createElement("div");
  field.classList.add("field");
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