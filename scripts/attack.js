let attackZoneFieldsList = [];

function clearAttackZone()
{
  let x1, x2, y1, y2;

  x1 = firstHeroCoordinates[0];
  y1 = firstHeroCoordinates[1];
  x2 = secondHeroCoordinates[0];
  y2 = secondHeroCoordinates[1];

  attackZoneFieldsList = [];

  for (let x = x1 + 1; x < x2; x++)
  {
    let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1));
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.remove("attack-area");
  }

  for (let y = y1 + 1; y < y2; y++)
  {
    let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1);
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.remove("attack-area");
  }

  for (let x = x2 + 1; x < x1; x++)
  {
    let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1));
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.remove("attack-area");
  }

  for (let y = y2 + 1; y < y1; y++)
  {
    let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1);
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.remove("attack-area");
  }
}

function createNewAttackZone()
{
  let x1, x2, y1, y2;

  x1 = firstHeroCoordinates[0];
  y1 = firstHeroCoordinates[1];
  x2 = secondHeroCoordinates[0];
  y2 = secondHeroCoordinates[1];


  for (let x = x1 + 1; x < x2; x++)
  {
    let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1));
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.add("attack-area");
    attackZoneFieldsList.push(currentAttackPosition);
  }

  for (let y = y1 + 1; y < y2; y++)
  {
    let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1);
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.add("attack-area");
    attackZoneFieldsList.push(currentAttackPosition);
  }

  for (let x = x2 + 1; x < x1; x++)
  {
    let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1));
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.add("attack-area");
    attackZoneFieldsList.push(currentAttackPosition);
  }

  for (let y = y2 + 1; y < y1; y++)
  {
    let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1);
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.add("attack-area");
    attackZoneFieldsList.push(currentAttackPosition);
  }
}

let points = 1;

document.addEventListener("keydown", function (event) {  
  let attackEventFieldsList = []; 
  if (event.code == "Space")
  {    
    attackZoneFieldsList.forEach(element => {
      element.classList.add("attack-event");
      if (element.classList.contains("enemy"))
      {        
        let deadenemy = enemiesList.findIndex(enemy => enemy.pos.x == element.getAttribute("posx") && enemy.pos.y == element.getAttribute("posy"));
        enemiesList.splice(deadenemy, 1);
        element.classList.remove("enemy");
        document.getElementsByClassName("score")[0].innerHTML = `Your score is: ${points}`; 
        points++;
      }
      attackEventFieldsList.push(element); 
    });
    setTimeout(() => {
      attackEventFieldsList.forEach(element => element.classList.remove("attack-event"));
    }, 100);
  }
});