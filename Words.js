"use strict"
let Words = (function(){
     let wordToPrint = "";
     let wordCounter = 0;
     let tempWords = "";
     let image = new Image();
     image.src = "pixels/textBox.png"

     let printing = true;

     let skip = false;

     let next = false;

     function getNext() {
          return next;
     }

     function setNext(boolean) {
          next = boolean;
     }

     function getWordToPrint() {
          return wordToPrint;
     }

     function setWordToPrint(words) {
          wordToPrint = words;
     }

     function setPrinting(boolean) {
          printing = boolean;
     }

     function getPrinting() {
          return printing;
     }

     function setSkip(boolean) {
          skip = boolean;
     }

     function getSkip() {
          return skip;
     }

     function getTextBox() {
          return image;
     }

     function getTempWords() {
          return tempWords;
     }

     function setTempWords(string) {
          tempWords = string;
     }

     function getCounter() {
          return wordCounter;
     }

     function setCounter(int) {
          wordCounter = int;
     }

     return {
          getCounter : getCounter,
          setCounter : setCounter,
          getTempWords : getTempWords,
          setTempWords : setTempWords,
          getTextBox : getTextBox,
          setPrinting : setPrinting,
          getPrinting : getPrinting,
          setSkip : setSkip,
          getSkip : getSkip,
          getWordToPrint : getWordToPrint,
          setWordToPrint : setWordToPrint,
          getNext : getNext,
          setNext : setNext
     }
}())
