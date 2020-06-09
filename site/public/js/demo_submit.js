"use strict";

var userInput = document.getElementById("user-input");
var firstInput = false;
var displayText = document.getElementById("display-text");
var childTextNodes;

mainDemo();

function mainDemo() {
  var userInput = document.getElementById("user-input");
  document.addEventListener("keypress", inputHandler, false);
}

function inputHandler(e) {
  if (e.key == 'Enter') {
    var userInput = document.getElementById("user-input");
    console.log("user input for first time");

    if (firstInput == false) {
      childTextNodes = displayText.childNodes;

      for (var i = 0; i < childTextNodes.length; i++) {
        displayText.removeChild(childTextNodes[i]);
      }
      firstInput = true;

    } else {
      console.log("user input incoming");
      console.log(userInput.value);

      childTextNodes = displayText.childNodes;
      console.log(childTextNodes.length);

      if(childTextNodes.length > 10) {
        for (var i = 0; i < childTextNodes.length; i++) {
          displayText.removeChild(childTextNodes[i]);
        }
      }

      var newOutputText = document.createElement('p'); //new p node
      newOutputText.classList.add("welcome-text"); //styling

      var textnode = document.createTextNode(userInput.value);
      newOutputText.appendChild(textnode);
      displayText.appendChild(newOutputText);

    }
  }
}

/*
var b = document.createElement('b');
b.appendChild(document.createTextNode('World');
para.appendChild(b);

para.appendChild(document.createTextNode('!'));

var someDiv = document.getElementById('someID');
var children = someDiv.childNodes;
for(var i = 0; i < children.length; i++)
    someDiv.removeChild(children[i]);
*/

// 1. print welcome intro (set the scene), say just a demo so you can't win
// 2. must enter the option exactly as they are presented to you
// throw up disclaimer stating that you can't win! small sample of the game
// (user has to enter what is in quotes, if not throw an error saying please try again!)
// hackily offer the first narration with two options
//  would you like to 1. go to 'entrance' or 2. speak to 'neill'
//get.name(); // based on name that user enters (case sensitive)
//get.narration(); // where name.equals() what they entered, get naration (based on the name )
//get.node(); // return array of nodes, present as options to user ... (these are the names of other places they can go/ people they can speak to)

/*class location {
  String: narration
  getNarration();
}

class NPC {
    String: narration
    getNarration();
}



{ "graph": [
    "name" : "room",
    "description": "your room desc",
    "node" : ["ssh"]
  ],
  [
    "name" : "ssh",
    "description" : "ssh portal room desc",
    "node" : ["main", "room"]
  ],
  [
    "name" : "main",
    "description" : "main desc",
    "node" : ["stacks", "root"]
  ],
  [
    "name" : "stacks",
    "description" : "stacks desc",
    "node" : ["linkedlist"]
  ],
  [
    "name" : "linkedlist",
    "description" : "",
    "node" : ["root"]
  ],
  [
    "name" : "root",
    "description" : "Main",
    "node" : ["ssh"]
  ]
}*/
