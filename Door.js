Door = function(imageName, openImageName, width, height, posX, posY) {

     this.image = new Image();
     this.image.src = imageName;

     this.openImage = new Image();
     this.openImage.src = openImageName;

     this.displayImage = this.image;

     this.width = width;
     this.height = height;

     this.open = false;

     this.centerX = posX;
     this.centerY = posY;

     this.getImage = function() {
          return this.image;
     }

     this.getOpenImage = function() {
          return this.openImage;
     }

     this.setOpenImage = function(img) {
          this.openImage = img;
     }

     this.setDisplayImage = function(image) {
          this.displayImage = image;
     }

     this.getDisplayImage = function() {
          return this.displayImage;
     }

     this.setOpen = function(boolean) {
          this.open = boolean;
     }

     this.getOpen = function() {
          return this.open;
     }

     this.getWidth = function() {
          if(this.open == false) {
               return this.width;
          } else if(this.open == true) {
               return this.height;
          }
     }

     this.getHeight = function() {
          if(this.open == false) {
               return this.height;
          } else if(this.open == true) {
               return this.width;
          }
     }

     this.getCenterX = function() {
          return this.centerX;
     }

     this.getCenterY = function() {
          return this.centerY;
     }
}
