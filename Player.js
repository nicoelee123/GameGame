"use strict"
let Player = (function() {
     let centerX = 0;
     let centerY = 1000;
     let frameWidth = 0;
     let frameHeight = 0;
     let image = new Image();
     let facingDirection = "DOWN";

     let interact = true;

     let items = [];

     let currentlyInteractingWith = null;

     let speed = 2;
     let width = 0;
     let height = 0;
     let prevX = 0;
     let prevY = 0;

     let controls = true;

     let movement = "STOP";

     let counter = 0;

     let centered = true;

     function getCentered() {
          return centered;
     }

     function setCentered(boolean) {
          centered = boolean;
     }

     function getCounter() {
          return counter;
     }

     function setCounter(int) {
          counter = int;
     }

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
          setItems : setItems,
          getCounter : getCounter,
          setCounter : setCounter,
          getCentered : getCentered,
          setCentered : setCentered
     }

}());
