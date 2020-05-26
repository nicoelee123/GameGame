"use strict"
let StartScreen = (function(){

     let startScreen1 = document.getElementById("startScreen1");
     let ctxStartScreen1 = startScreen1.getContext("2d");

     let startScreen2 = document.getElementById("startScreen2");
     let ctxStartScreen2 = startScreen2.getContext("2d");


                    /*=======================================

                         MAIN START SCREEN LOOP

                    ========================================*/
     function startScreenLoop() {
          window.requestAnimationFrame(startScreenLoop);
     }

          /*8888888888888888888888888888888
                    METHODS
          8888888888888888888888888888888*/

     function StartScreen() {
          let time = 1300;
          $("#startScreen1").fadeIn(time);
          $("#startScreen2").fadeIn(time);
          $("#startBtn").fadeIn(time);

          startScreenLoop();
     }

     return {
          StartScreen : StartScreen
     }
}())
