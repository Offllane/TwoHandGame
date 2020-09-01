const easyModeButton: HTMLElement = document.querySelector(".best-players_easy-mode");
const hardModeButton: HTMLElement = document.querySelector(".best-players_hard-mode");
const easyModeScore: HTMLElement = document.querySelector(".best-players_easy-mode-score");
const hardModeScore: HTMLElement = document.querySelector(".best-players_hard-mode-score");

function showEasyModeScore(): void {
  easyModeScore.style.display = "block";
  hardModeButton.style.display = "none";
  hardModeButton.classList.remove("best-players_active");
  easyModeButton.classList.add("best-players_active");
}

function showHardModeScore(): void {
  hardModeScore.style.display = "block";
  easyModeScore.style.display = "none";
  easyModeButton.classList.remove("best-players_active");
  hardModeButton.classList.add("best-players_active");
}

easyModeButton.addEventListener("click", showEasyModeScore);
hardModeButton.addEventListener("click", showHardModeScore);