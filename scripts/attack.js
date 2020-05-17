function clearAttackZone() {
  let x1,x2,y1,y2;
  if(firstHeroCoordinates[0]<secondHeroCoordinates[0]) {
   x1 = firstHeroCoordinates[0];
   y1 = firstHeroCoordinates[1];
   x2 = secondHeroCoordinates[0];
   y2 = secondHeroCoordinates[1];
  }
  else {
    x2 = firstHeroCoordinates[0];
    y2 = firstHeroCoordinates[1];
    x1 = secondHeroCoordinates[0];
    y1 = secondHeroCoordinates[1];
  }
  
  for (let x = x1 + 1; x < x2; x++) {
    let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1));
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.remove("attack-area");
  }

  for (let y = y1 + 1; y < y2; y++) {
    let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1);
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.remove("attack-area");
  }
}

function createNewAttackZone() {
  let x1, x2, y1, y2;
  if (firstHeroCoordinates[0] < secondHeroCoordinates[0]) {
    x1 = firstHeroCoordinates[0];
    y1 = firstHeroCoordinates[1];
    x2 = secondHeroCoordinates[0];
    y2 = secondHeroCoordinates[1];
  } else {
    x2 = firstHeroCoordinates[0];
    y2 = firstHeroCoordinates[1];
    x1 = secondHeroCoordinates[0];
    y1 = secondHeroCoordinates[1];
  }

  for (let x = x1 + 1; x < x2; x++) {
    let y = Math.round(((x1 * y2 - x2 * y1) * (-1) - x * (y1 - y2)) / (x2 - x1));
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.add("attack-area");
  }
  
  for (let y = y1 + 1; y < y2; y++) {
    let x = Math.round(((y - y1) * (x2 - x1) / (y2 - y1)) + x1);
    let currentAttackPosition = document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]');
    currentAttackPosition.classList.add("attack-area");    
  }
}
