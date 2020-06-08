// image changing code
"use strict";

let myImage = document.querySelector('img');

// this is in text java script
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/firefox2.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
};

object.onclick = function() {
  // run the demo game (HA)
};
