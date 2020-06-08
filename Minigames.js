"use strict"
let Minigames = (function() {

     function minigameHandler() {
          // Hiding mainstage
          $("#floor").hide();
          $('#layer1').hide();
          $('#layer2').hide();
          $('#layer3').hide();

          // Showing Minigame
          $("#mgLayer1").show();
          $("#mgLayer2").show();
          $("#mgLayer3").show();

          let furniture = Player.getCurrentlyInteractingWith();

          //Chest
          if(furniture == Game.getFurnitureList()[0]) {
               console.log("chest minigame activated");
          }
     }

     return {
          minigameHandler : minigameHandler
     }
}());
