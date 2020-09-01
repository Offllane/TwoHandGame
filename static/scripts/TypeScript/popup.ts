const loosePage: HTMLElement = document.getElementsByClassName("loose-page")[0] as HTMLElement;

//image which show in case loose
function makePopupVisible(): void {
  loosePage.style.display = "flex";
  document.getElementsByClassName('loose-page-image-score')[0].innerHTML = "Your score is:";
}

//hide all popup;
$(document).ready(function (): void { 
  HelpPopupHide();
  EnemyPopupHide();
  TopPopupHide();
})

function HelpPopupShow(): void {
  $("#popup1").show();
}

function HelpPopupHide(): void {
  $("#popup1").hide();
}

function TopPopupShow(): void {
  $("#popup2").show();
  showEasyModeScore();
}

function TopPopupHide(): void {
  $("#popup2").hide();
}

function EnemyPopupShow(): void {
  $("#popup3").show();
}

function EnemyPopupHide(): void {
  $("#popup3").hide();
}