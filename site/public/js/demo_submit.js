"use strict";

var userInput = document.getElementById("user-input");
var firstInput = false;
var displayText = document.getElementById("display-text");
var childTextNodes;

var locations = ["room", "ssh", "linkedlist", "stacks", "root", "ssh", "room"]; //linear sequence, advance one thru the other

class Location {
  constructor(locationName, locationNarration) {
    this.locationName = locationName;
    this.locationNarration = locationNarration;
    /*this.locationStory = locationStory;
    this.completedTasks = completedTasks;*/
  }

  welcomeNarration() { //onload call this
    outputResponseToParent(displayText, this.locationNarration);
  }
  //load new location
  //read location narration
}

class Controller {
  constructor(playername, inventory, stats, currentLocation) {
    this.locations = [];
    this.playername = playername; //string
    this.inventory = inventory; //array
    this.stats = stats; //json object
    this.currentLocation = currentLocation;
  }

  spawnLocations() {
    this.locations.push(new Location("room", "you see a large, messy room. the area is filled with red bull, crisps, and half opened computer science textbooks."));
    this.locations.push(new Location("ssh", "the air around you spins rapidly as you are sucked into your computer! you look around, and see a large purple portal, with the lessers S S H engraved into the stone."));
    this.locations.push(new Location("main", "passing the open door, you arrive within what can only be described as a junkyard. you see the letters main() high in the sky. this must be your program!"));
    this.locations.push(new Location("stacks", "you see massive highrise skyscrapers. at the end of the street in glowing neon is the sign 'SYSTEM STACK'. you proceed there."));
  }

  introductionText() {
    outputResponseToParent(displayText, "welcome to our demo. to view inventory, please press inv.");
    outputResponseToParent(displayText, "if you forget commands, write 'help' in the console");
    outputResponseToParent(displayText, "to set character name, type setname <name>");
    outputResponseToParent(displayText, "to proceed write goto Room");
  }

  viewInventory() {
    outputResponseToParent(displayText, "inventory for: "+this.playername);
    outputResponseToParent(displayText, this.inventory.join(", "));
  }

  viewStats() {
    outputResponseToParent(displayText, "stats for: "+this.playername);
    outputResponseToParent(displayText, "health - "+this.stats['health']);
    outputResponseToParent(displayText, "armour - "+this.stats['armour']);
  }

  setCharName(newName) {
      this.playername = newName;
      outputResponseToParent(displayText, "set name to "+newName);
  }

  loadLocationNarrative(gotoLocation) {
    console.log("loading location");
    switch(gotoLocation) {
      case "room":
        this.locations[0].welcomeNarration();
        this.currentLocation = 0;
        break;
      case "ssh":
        this.locations[1].welcomeNarration();
        this.currentLocation = 1;
        break;
      case "main":
        this.locations[2].welcomeNarration();
        this.currentLocation = 2;
        break;
      case "stacks":
        this.locations[2].welcomeNarration();
        this.currentLocation = 2;
        break;
      default:
        outputResponseToParent(displayText, "you can't go there");
        break;
    }
  }

  gameCommands(userInput) {
    var inputWords = userInput.split(" ");

    switch (inputWords[0]) {
      case "help":
        outputResponseToParent(displayText, "commands: help look inv setname goto stats");
        break;
      case "inv":
        this.viewInventory();
        break;
      case "stats":
        this.viewStats();
        break;
      case "setname":
        this.setCharName(inputWords[1]);
        break;
      case "goto":
        outputResponseToParent(displayText, "going to "+inputWords[1]);
        this.loadLocationNarrative(inputWords[1]);
        break;
      default: //cases for a/b/c?
        outputResponseToParent(displayText, "can't understand command. try again.");
        break;
    }
  }
}

var game = new Controller("", ["cs textbook", "calculator"], {health:3, armour:3}, 0);

mainDemo();

function mainDemo() {
  var userInput = document.getElementById("user-input");
  document.addEventListener("keypress", inputHandler, false);
}

function inputHandler(e) {
  if (e.key == 'Enter') {
    var userInput = document.getElementById("user-input");


    if (firstInput == false) {
      childTextNodes = displayText.childNodes;
      fadeText(document.getElementById('welcome'));
      clearChildNodes(displayText);

      game.spawnLocations();
      game.introductionText();

      firstInput = true;
      userInput.value = "";

    } else {

      childTextNodes = displayText.childNodes;
      var childNodesNum = childTextNodes.length;

      if(childNodesNum > 13) {
        clearChildNodes(displayText);
      }

      game.gameCommands(userInput.value);
      userInput.value = ""; //clear the value

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
  newOutputText.classList.add("console");

  var textnode = document.createTextNode(text);
  newOutputText.appendChild(textnode);
  parent.appendChild(newOutputText);
}
