"use strict"
let Engine = (function() {

     let currentFrame = 0;

     function startClock() {
          currentFrame++;
          if(currentFrame > 3000) {
               currentFrame = 0;
          }
     }

     function getCurrentFrame() {
          return currentFrame;
     }

     return {
          startClock : startClock,
          getCurrentFrame : getCurrentFrame
     }
}());
