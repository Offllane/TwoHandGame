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
  "static/img/gameareaObjects/rogue.png",
  "static/img/gameareaObjects/rogue_left.png",

  "static/img/gameareaObjects/secondHero_back.png",
  "static/img/gameareaObjects/secondHero_front.png",
  "static/img/gameareaObjects/secondHero_left.png",
  "static/img/gameareaObjects/secondHero_right.png",
  "static/img/backgrounds/desert.png",
  "static/img/backgrounds/pesok_barhany_pustynia_162742_1920x1080.jpg",
  "static/img/backgrounds/pesok_pustynia_barhany_178480_1920x1080.jpg",
  "static/img/backgrounds/pesok_pustynia_sled_161642_1920x1080.jpg",
  "static/img/backgrounds/pesok_sledy_pustynia_177059_1920x1080.jpg",
  "static/img/backgrounds/pesok_sledy_volnistyj_175005_1920x1080.jpg",
  "static/img/backgrounds/pesok_sledy_zasuha_169924_1920x1080.jpg",
  "static/img/backgrounds/pesok_volnistyj_noch_175753_1920x1080.jpg");