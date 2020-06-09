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
      fadeText(document.getElementById('welcome'));
      clearChildNodes(displayText);

      firstInput = true;

    } else {
      console.log("user input incoming");
      console.log(userInput.value);

      childTextNodes = displayText.childNodes;
      var childNodesNum = childTextNodes.length;

      if(childNodesNum > 13) {
        clearChildNodes(displayText);
      }

      outputResponseToParent(displayText, userInput.value);

    }
  }
}

function fadeText(element) {
  var element;
  var transparency = 1;
  var id = setInterval(frame, 100);

  console.log(element);

  function frame() {
    if (transparency == 0) {
      clearInterval(id);
    } else {
      transparency -= 0.1;
      element.style.opacity = transparency;
    }
  }
}

function clearChildNodes(element) {
  var child = element.lastElementChild;

  while (child) {

    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function outputResponseToParent(parent, text) {
  var newOutputText = document.createElement('p'); //new p node
  newOutputText.classList.add("welcome-text"); //styling

  var textnode = document.createTextNode(text);
  newOutputText.appendChild(textnode);
  parent.appendChild(newOutputText);
}

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
