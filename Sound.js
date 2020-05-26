"use strict"
let Sound = (function() {

     let bgMusic1 = new Audio("sfx/bgMusic1.mp3");
     bgMusic1.volume = 0.05;
     bgMusic1.loop = true;

     let sounds = [bgMusic1];

     function getSound() {
          return sounds;
     }

     return {
          getSound : getSound
     }
}());
