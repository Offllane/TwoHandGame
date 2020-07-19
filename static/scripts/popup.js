const loosePage = document.getElementsByClassName("loose-page")[0];

function makePopupVisible() {
  loosePage.style.display = "flex";
  document.getElementsByClassName("loose-page-score")[0].innerHTML = `Your score is: ${points}`;
}


$(document).ready(function () {
  HelpPopUpHide();
  TopPopUpHide();
});

function HelpPopUpShow() {
  $("#popup1").show();
}

function HelpPopUpHide() {
  $("#popup1").hide();
}

function TopPopUpHide() {
  $("#popup2").hide();
}

function TopPopUpShow() {
  $("#popup2").show();
}