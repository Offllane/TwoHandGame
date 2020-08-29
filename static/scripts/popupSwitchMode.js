const easyModeButton = document.querySelector(".best-players_easy-mode");
const hardModeButton = document.querySelector(".best-players_hard-mode");
const easyModeScore = document.querySelector(".best-players_easy-mode-score");
const hardModeScore = document.querySelector(".best-players_hard-mode-score");

function showEasyModeScore() {
  easyModeScore.style.display = "block";
  hardModeScore.style.display = "none";
  hardModeButton.classList.remove("best-players_active");
  easyModeButton.classList.add("best-players_active");
}

function showHardModeScore() {
  hardModeScore.style.display = "block";
  easyModeScore.style.display = "none";
  easyModeButton.classList.remove("best-players_active");
  hardModeButton.classList.add("best-players_active");
}

easyModeButton.addEventListener("click", showEasyModeScore);
hardModeButton.addEventListener("click", showHardModeScore);