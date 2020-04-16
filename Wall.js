Wall = function(imgName, centX, centY, w, h) {
     this.image = new Image();
     this.image.src = imgName;

     this.centerX = centX;
     this.centerY = centY;
     this.width = w;
     this.height = h;

     this.getCenterX = function() {
          return this.centerX;
     }

     this.getCenterY = function() {
          return this.centerY;
     }

     this.getWidth = function() {
          return this.width;
     }

     this.getHeight = function() {
          return this.height;
     }

     this.getImage = function() {
          return this.image;
     }
}
