"use strict"
let Sound = (function() {

     let outside = new Audio("sfx/outside.mp3");
     outside.volume = 0.55;
     outside.loop = true;

     let footstep = new Audio("sfx/footstep.wav");
     footstep.volume = 0.45;
     footstep.loop = false;

     let rain = new Audio("sfx/rain.wav");
     rain.volume = 0.10;
     rain.loop = true;


     let sounds = [outside, footstep, rain];

     function getSound() {
          return sounds;
     }

     return {
          getSound : getSound
     }
}());
