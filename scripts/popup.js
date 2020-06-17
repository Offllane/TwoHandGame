const POPUP = document.getElementsByClassName("popup")[0];

function makePopupVisible()
{
  POPUP.style.display = "flex";
  document.getElementsByClassName("popup-score")[0].innerHTML = `Your score is: ${points}`;
}