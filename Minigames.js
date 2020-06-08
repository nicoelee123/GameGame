"use strict"
let Minigames = (function() {

     let mgLayer1 = document.getElementById("mgLayer1");
     let mgLayer1Ctx = mgLayer1.getContext("2d");

     let mgLayer2 = document.getElementById("mgLayer2");
     let mgLayer2Ctx = mgLayer2.getContext("2d");

     function minigameHandler() {
          let furniture = Player.getCurrentlyInteractingWith();

          //Chest
          if(furniture == Game.getFurnitureList()[0]) {
               console.log("chest minigame activated");
          }

          if(Player.getInteract() == false) {
               Game.setMode("Game");
          }
     }

     function getCanvas() {
          let array = [mgLayer1, mgLayer2];
          return array;
     }

     return {
          minigameHandler : minigameHandler,
          getCanvas : getCanvas
     }
}());
