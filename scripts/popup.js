const POPUP = document.getElementsByClassName("popup")[0];

function makePopupVisible() {
  POPUP.style.display = "flex";
  document.getElementsByClassName("popup-score")[0].innerHTML = `Your score is: ${points}`;
}


$(document).ready(function()
{
  PopUpHide();
});

function PopUpShow()
{
  $("#popup1").show();
}

function PopUpHide()
{
  $("#popup1").hide();
}