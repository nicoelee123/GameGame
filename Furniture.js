Furniture = function(imgName, iImageName, frameWidth, frameHeight, centerX, centerY, scale) {
     this.image = new Image();
     this.image.src = imgName;
     this.imageWidth = 0;
     this.imageHeight = 0;

     this.iImage = new Image();
     this.iImage.src = iImageName;
     this.iImageWidth = 0;
     this.iImageHeight = 0;

     this.frameWidth = frameWidth;
     this.frameHeight = frameHeight;

     this.width = scale * frameWidth;
     this.height = scale * frameHeight;

     this.centerX = centerX;
     this.centerY = centerY;

     this.scale = scale;

     this.frameOrder = [];

     this.frameStep = 0;

     this.counter = 0;
     this.delayCounter = 0;

     this.delay = 0;

     this.currentlyAnimating = false;

     this.getDelayCounter = function() {
          return this.delayCounter;
     }

     this.setDelayCounter = function(number) {
          this.delayCounter = number;
     }

     this.getCurrentlyAnimating = function () {
          return this.currentlyAnimating;
     }

     this.setCurrentlyAnimating = function(d) {
          this.currentlyAnimating = d;
     }

     this.getAnimationDelay = function() {
          return this.animationDelay;
     }

     this.setAnimation = function(list, frameStep, delay) {
          for(num of list) {
               this.frameOrder.push(num);
          }
          this.frameStep = frameStep;
          this.delay = delay;
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

     this.getImage = function() {
          return this.image;
     }

     this.getiImage = function() {
          return this.iImage;
     }

     this.getWidth = function() {
          return this.width;
     }

     this.getHeight = function() {
          return this.height;
     }

     this.getCenterX = function() {
          return this.centerX;
     }

     this.getCenterY = function() {
          return this.centerY;
     }

     this.getScale = function() {
          return this.scale;
     }

     this.getFrameWidth = function() {
          return this.frameWidth;
     }

     this.getFrameHeight = function() {
          return this.frameHeight;
     }

     this.setCounter = function(c) {
          this.counter = c;
     }

     this.getCounter = function() {
          return this.counter;
     }

     this.setImageDimensions = function(w, h) {
          this.imageWidth = w;
          this.imageHeight = h;
     }

     this.setiImageDimensions = function(w, h) {
          this.iImageWidth = w;
          this.iImageHeight = h;
     }

     this.getImageWidth = function() {
          return this.imageWidth;
     }

     this.getImageHeight = function() {
          return this.imageHeight;
     }

     this.getiImageWidth = function() {
          return this.iImageWidth;
     }

     this.getiImageHeight = function() {
          return this.iImageHeight;
     }
}
