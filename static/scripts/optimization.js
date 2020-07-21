//создаем JQuery функцию, которая будет подгружать изображения в буфер
jQuery.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    jQuery("<img>").attr("src", arguments[i]);
  }
};

//указываем путь к изображению, которое нужно подгрузить
$.preloadImages("static/img/gameareaObjects/attack.png",
  "static/img/gameareaObjects/attack.png",
  "static/img/gameareaObjects/attack-field.png",
  "static/img/gameareaObjects/bg.png",
  "static/img/gameareaObjects/firstHero_back.png",
  "static/img/gameareaObjects/firstHero_front.png",
  "static/img/gameareaObjects/firstHero_left.png",
  "static/img/gameareaObjects/firstHero_right.png",
  "static/img/gameareaObjects/left-field.png",
  "static/img/gameareaObjects/reaper.png",
  "static/img/gameareaObjects/reaper_left.png",
  "static/img/gameareaObjects/secondHero_back.png",
  "static/img/gameareaObjects/secondHero_front.png",
  "static/img/gameareaObjects/secondHero_left.png",
  "static/img/gameareaObjects/secondHero_right.png");