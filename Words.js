var Words = (function(){
     wordToPrint = "";
     wordCounter = 0;
     tempWords = "";
     let image = new Image();
     image.src = "pixels/textBox.png"

     printing = true;

     skip = false;

     next = false;

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
