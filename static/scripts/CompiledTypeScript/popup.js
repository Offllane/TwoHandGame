const loosePage = document.getElementsByClassName("loose-page")[0];
//image which show in case loose
function makePopupVisible() {
    loosePage.style.display = "flex";
    document.getElementsByClassName('loose-page-image-score')[0].innerHTML = "Your score is:";
}
//hide all popup;
$(document).ready(function () {
    HelpPopupHide();
    EnemyPopupHide();
    TopPopupHide();
});
function HelpPopupShow() {
    $("#popup1").show();
}
function HelpPopupHide() {
    $("#popup1").hide();
}
function TopPopupShow() {
    $("#popup2").show();    
    showEasyModeScore();
}
function TopPopupHide() {
    $("#popup2").hide();
}
function EnemyPopupShow() {
    $("#popup3").show();
}
function EnemyPopupHide() {
    $("#popup3").hide();
}
