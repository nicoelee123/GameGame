var Sound = (function() {

     bgMusic1 = new Audio("bgMusic1.mp3");
     bgMusic1.volume = 0.05;
     bgMusic1.loop = true;

     function getSound(sound) {
          return sound;
     }

     return {
          getSound : getSound
     }
}());
