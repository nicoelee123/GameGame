
var Player = (function() {
     centerX = 0;
     centerY = 0;
     frameWidth = 0;
     frameHeight = 0;
     image = new Image();
     facingDirection = "DOWN";

     interact = true;

     items = [];

     currentlyInteractingWith = null;

     speed = 2;
     width = 0;
     height = 0;
     prevX = 0;
     prevY = 0;

     controls = true;

     movement = "STOP";

     function getItems() {
          return items;
     }

     function setItems(index, element) {
          items[index] = element;
     }

     function getCurrentlyInteractingWith() {
          return currentlyInteractingWith;
     }

     function setCurrentlyInteractingWith(interactable) {
          currentlyInteractingWith = interactable;
     }

     function getInteract() {
          return interact;
     }

     function setInteract(boolean) {
          interact = boolean;
     }

     function setControls(b) {
          controls = b;
     }

     function getControls() {
          return controls;
     }

     function getCenterX() {
          return centerX;
     }

     function getCenterY() {
          return centerY;
     }

     function setCenterX(x) {
          centerX = x;
     }

     function setCenterY(y) {
          centerY = y;
     }

     function setImage(imageName) {
          image.src = imageName;
     }

     function getImage() {
          return image;
     }

     function setMovement(m) {
          movement = m;
     }

     function getMovement() {
          return movement;
     }

     function setFrameDimensions(w, h) {
          frameWidth = w;
          frameHeight = h;
          width = frameWidth
          height = frameHeight;
     }
     function getFrameWidth() {
          return frameWidth;
     }
     function getFrameHeight() {
          return frameHeight;
     }

     function getSpeed() {
          return speed;
     }

     function getFacingDirection() {
          return facingDirection;
     }

     function setFacingDirection(d) {
          facingDirection = d;
     }

     function getCanvasScale() {
          return canvasScale;
     }

     function getWidth() {
          return width;
     }

     function getHeight() {
          return height;
     }

     function setPrevX(x) {
          prevX = x;
     }

     function setPrevY(y) {
          prevY = y;
     }

     function getPrevX() {
          return prevX;
     }

     function getPrevY() {
          return prevY;
     }

     function trackPrevLocation() {
          prevX = centerX;
          prevY = centerY;
     }
     return {
          getCenterY : getCenterY,
          getCenterX : getCenterX,
          setCenterX : setCenterX,
          setCenterY : setCenterY,
          setImage : setImage,
          getImage : getImage,
          setMovement : setMovement,
          getMovement : getMovement,
          setFrameDimensions : setFrameDimensions,
          getFrameWidth : getFrameWidth,
          getFrameHeight : getFrameHeight,
          getSpeed : getSpeed,
          getFacingDirection : getFacingDirection,
          setFacingDirection : setFacingDirection,
          setInteract : setInteract,
          getInteract : getInteract,
          getCanvasScale : getCanvasScale,
          getWidth : getWidth,
          getHeight : getHeight,
          setPrevX : setPrevX,
          setPrevY : setPrevY,
          getPrevX : getPrevX,
          getPrevY : getPrevY,
          trackPrevLocation : trackPrevLocation,
          setControls : setControls,
          getControls : getControls,
          getCurrentlyInteractingWith : getCurrentlyInteractingWith,
          setCurrentlyInteractingWith : setCurrentlyInteractingWith,
          getItems : getItems,
          setItems : setItems
     }

}());
