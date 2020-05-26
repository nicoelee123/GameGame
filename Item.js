Item = function(imgName, invImg, gifSource, centerX, centerY, invScale) {

     this.image = new Image();
     this.image.src = imgName;

     this.selected = false;

     this.width = frameWidth;
     this.height = frameHeight;

     this.invImg = new Image();
     this.invImg.src = invImg;

     this.centerX = centerX;
     this.centerY = centerY;

     this.gifSource = gifSource;

     this.invScale = invScale;

     this.frameWidth = 0;
     this.frameHeight = 0;

     this.iFrameWidth = 0;
     this.iFrameHeight = 0;

     this.invWidth = invScale * frameWidth;
     this.invHeight = invScale * frameHeight;

     this.frameOrder = [];

     this.invTotalFrames = 0;

     this.frameStep = 0;

     this.counter = 0;
     this.invCounter = 0;

     this.delayCounter = 0;

     this.delay = 0;

     this.currentlyAnimating = false;
     this.invCurrentlyAnimating = false;

     this.getInvCurrentlyAnimating = function() {
          return this.invCurrentlyAnimating;
     }

     this.setInvCurrentlyAnimating = function(boolean) {
          this.invCurrentlyAnimating = boolean;
     }

     this.getWidth = function() {
          return this.width;
     }

     this.getHeight = function() {
          return this.height;
     }

     this.setFrameDimensions = function(fWidth, fHeight, iFWidth, iFHeight) {
          this.width = fWidth;
          this.height = fHeight;
          this.frameWidth = fWidth;
          this.frameHeight = fHeight;
          this.iFrameWidth = iFWidth;
          this.iFrameHeight = iFHeight;
     }

     this.getCounter = function() {
          return this.counter;
     }

     this.setCounter = function(int) {
          this.counter = int;
     }

     this.getInvCounter = function() {
          return this.invCounter;
     }

     this.setInvCounter = function(int) {
          this.invCounter = int;
     }

     this.getFrameWidth = function() {
          return this.frameWidth;
     }

     this.getFrameHeight = function() {
          return this.frameHeight;
     }

     this.getDelayCounter = function() {
          return this.delayCounter;
     }

     this.setDelayCounter =  function(number) {
          this.delayCounter = number;
     }

     this.getCurrentlyAnimating = function() {
          return this.currentlyAnimating;
     }

     this.setCurrentlyAnimating = function(d) {
          this.currentlyAnimating = d;
     }

     this.getAnimationDelay = function() {
          return this.animationDelay;
     }

     this.setAnimation = function(list, frameStep, delay, invFrames) {
          for(num of list) {
               this.frameOrder.push(num);
          }
          this.frameStep = frameStep;
          this.delay = delay;
          this.invTotalFrames = invFrames;
     }

     this.getGifSource = function() {
          return this.gifSource;
     }

     this.getInvTotalFrames = function() {
          return this.invTotalFrames;
     }

     this.getDelay = function () {
          return this.delay;
     }

     this.getFrameStep = function() {
          return this.frameStep;
     }

     this.getFrameOrder = function() {
          return this.frameOrder;
     }

     this.getSelected = function() {
          return this.selected;
     }

     this.setSelected = function(boolean) {
          this.selected = boolean;
     }

     this.getImage = function() {
          return this.image;
     }

     this.getInvImg = function() {
          return this.invImg;
     }

     this.getCenterX = function() {
          return this.centerX;
     }

     this.getCenterY = function() {
          return this.centerY;
     }

     this.getInvScale = function() {
          return this.invScale;
     }
}
