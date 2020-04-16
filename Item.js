Item = function(imgName, invImg, centerX, centerY, canvasScale, invScale) {

     this.image = new Image();
     this.image.src = imgName;

     this.selected = false;

     this.invSpace = "";

     this.invImg = new Image();
     this.invImg.src = ingImg;

     this.centerX = centerX;
     this.centerY = centerY;

     this.canvasScale = canvasScale;
     this.invScale = invScale;

     this.getInvSpace = function() {
          return this.invSpace;
     }

     this.setInvSpace = function(string) {
          this.invSpace = string;
     }
     
     this.getSelected = function() {
          return this.selected;
     }

     this.setSelected = function(boolean) {
          this.selected = boolean;
     }

     this.getImage = function() {
          return this.image();
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

     this.getCanvasScale = function() {
          return this.canvasScale;
     }

     this.getInvScale = function() {
          return this.invScale;
     }
}
