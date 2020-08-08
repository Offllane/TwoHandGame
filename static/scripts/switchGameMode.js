let gameModeButtons = document.getElementsByClassName("game-mode");


(() => {
  if (localStorage.getItem("easy-mode") == "true") {  
    gameModeButtons[0].classList.add("js-active"); //easy mode active
    gameModeButtons[1].classList.remove("js-active"); // disable
    config.mode = "easy";
  } 
  if (localStorage.getItem("hard-mode") == "true") {    
    gameModeButtons[0].classList.remove("js-active"); // disable
    gameModeButtons[1].classList.add("js-active"); //hard mode active
    config.mode = "hard";
  }
})();

if (localStorage.getItem("easy-mode") == null) {
  localStorage.setItem("easy-mode", true);
  localStorage.setItem("hard-mode", false);
}

function disableAllModes() {
  localStorage.setItem("easy-mode", false);
  localStorage.setItem("hard-mode", false);
}

function switchGameMode(event) {
  let result = confirm("It end this game session and start new!");
  if (result) {
    disableAllModes();
    localStorage.setItem(event.target.classList[0], true);
    location.reload();
  }  
}

for (let button of gameModeButtons) {
  button.addEventListener("click", switchGameMode);
}