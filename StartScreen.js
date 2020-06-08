"use strict"
let StartScreen = (function(){

     let startScreen1 = document.getElementById("startScreen1");
     let ctxStartScreen1 = startScreen1.getContext("2d");

     let startScreen2 = document.getElementById("startScreen2");
     let ctxStartScreen2 = startScreen2.getContext("2d");


                    /*=======================================

                         MAIN START SCREEN LOOP

                    ========================================*/

          /*8888888888888888888888888888888
                    METHODS
          8888888888888888888888888888888*/

     function getCanvas() {
          let canvasArray = [startScreen1, startScreen2];
          return canvasArray;
     }
     function StartScreen() {

     }

     return {
          StartScreen : StartScreen,
          getCanvas : getCanvas
     }
}())
