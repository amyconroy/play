"use strict";

//GENERAL ENGINE STRUCTURE, cobbled together with caffiene and pain, is outlined below
//TRIGGERS: take a story branch, story index at which branch will trigger, and an effect
//Pass trigger will continue the next branch
//End will occur during a condition, triggered by a specific
//LOCATIONSTORY: responses to player input in each branch
//STORYOPTIONS: options presented to the player
//in future this configeration can be abstracted to a json config file

var userInput = document.getElementById("user-input");
var username = "";
var firstInput = false;
var displayText = document.getElementById("display-text");
var childTextNodes;

var locations = ["room", "ssh", "linkedlist", "stacks", "root", "ssh", "room"]; //linear sequence, advance one thru the other

var roomStoryWelcome = "you see a large, messy room. the area is filled with red bull, crisps, and half opened computer science textbooks. you see the computer blinking in front of you, with the blinking prompt... CONNECT TO SSH?";
var roomStory = {
  branch1: ["as you type the command, the room around you begind to swirl. you see nothing but swirling characters and darkness. you fear you may never finish this homework on time!"],
  branch2: ["you leave your room and go to hand out with friends. you are done with this homework for now."]
};
var roomStoryOptions = {
  options1: ["connect to ssh"],
  options2: ["walk away and socialise"]
};
var roomStoryTriggers = [{result:"end", branch:"branch2", index:1}, {result:"ssh", branch:"branch1", index:1}];

var sshStoryWelcome = "you are spat out of the vortex. you look around, and see a large purple portal, with the letters S S H engraved into the stone. in the end of the room is a door which appears locked.";
var sshStory = {
  branch1: ["the portal is solid, and unresponsive.", "you try the portal again, no dice. but the portal starts to glow unpleasantly.", "you try the portal one more time, and an SQL Injection pierces you with an unsanitized query."],
  branch2: ["you attempt to open the door, and to your suprise it swings open.", "you decide to head for the door, and to your suprise it swings open.", ""] //branch takes you out
};
var sshStoryOptions = {
  options1: ["try to go back inside the portal", "try again?", "try again?"],
  options2: ["try the door", "leave the portal alone, and head for the door", "this portal isn't looking too good, try the door..."]
};
var sshStoryTriggers = [{result:"pass", branch:"branch1", index:1}, {result:"pass", branch:"branch1", index:2}, {result:"main", branch:"branch2",index:1}, {result:"main", branch:"branch2", index:2}, {result:"main", branch:"branch2", index:3}, {result:"end", branch:"branch1", index:3}];

var mainStoryWelcome = "passing the open door, you arrive within what can only be described as a junkyard. you see the letters main() high in the sky. this must be your program! You spot a lonely creature of the Github Branch species sitting quietly on the ground.";
var mainStoryOptions = {
  options1: ["talk to the github branch","you humour the cute, albeit annoying develop","you proceed to the door with the potion develop dropped"], //nice options
  options2: ["carry on past him to the next area","you punch develop on the face and tell him people should commit straight to master","not wanting to continue to yet another door, you run away into the main() badlands"] //mean options
};
var mainStory = {
  branch1: ["the branch looks excited as you approach. shaking your hand, he introduces himself as develop.","develop is so pleased and happy he gives you a potion, and points you to the next door",""],
  branch2: ["you try to walk past the branch, but something starts tugging at your sleeve excitedly.","develop scoffs, picks himself up, and walks away. 'committing to master is comitting crime against humanity', he yells. you notice he dropped a potion on the ground.", "you are eaten by wild dangling pointers in the badlands. should've checked for memory leaks..."]
};
var mainStoryTriggers = [{result:"pass", branch:"branch1",index:1}, {result:"pass", branch:"branch1",index:2}, {result:"doorPuzzle", branch:"branch1",index:3}, {result:"pass", branch:"branch2",index:1}, {result:"pass", branch:"branch2",index:2},{result:"end", branch:"branch2",index:3}];

var doorPuzzleWelcome = "you arrive the the door at the end of the main() junkyard. you see a strange language on a circular lock, which seems familiar. the top line reads 1 == '1' IS ?. below are two labelled buttons.";
var doorPuzzleOptions = {
  options1:["TRUE", "TRUE","proceed to the stacks like a nerd"],
  options2:["FALSE","FALSE", "proceed to the stacks in style"]
};
var doorPuzzleStory = {
  branch1:["you breath a sigh of relief as the lock begins to turn. however, just before completion it seems to become stuck, and another question appears. 1 === '1' IS ?","the door emitts a shrieking screech, and you are zapped by electricity as the words 'TYPE ERROR' are seared into your brain forever."],
  branch2:["the door emitts a shrieking screech, and you are zapped by electricity as the words 'TYPE ERROR' are seared into your brain forever.","you put on our glasses, and proceed to the stacks"]
};
var doorPuzzleTriggers = [{result:"end", branch:"branch2",index:1}, {result:"pass", branch:"branch1", index:1}, {result:"end", branch:"branch1", index:2}, {result:"stacks", branch:"branch2", index:2}];

var stacksStoryWelcome = "you see massive highrise skyscrapers. at the end of the street in glowing neon is the sign 'SYSTEM STACK'. you proceed towards it. as you arrive, you see a guy in a fedora, and name tag reading 'Stack Overflow'";
var stacksStoryOptions = {
  options1:["you greet the stranger by name", "you appreciate his style, and say 'hello stack, how goes it?'", "you accept his help, and he shows you a seperate portal. you jump in."],
  options2:["you go to attack him", "you despise his pretentiousness, and smirk, saying 'what kind of name is that?'","you insult him and tell him where to put his portal"]
};
var stacksStory = {
  branch1: ["he replies with a suave tone - 'i'm stack.... stack overflow'", "'thanks man. you want the way of here?'", "you wake up at home, and promise you will never pull an alnighter doing homework again..."],
  branch2: ["you realise he was not prepared for your assualt, as you tackle the poor man to the ground", "his face falls, and he just looks very angry he leaves you alone.", "absolutely lost, you have nothing left but to wander this strange land, forever alone."]
};
var stacksStoryTriggers = [{result:"pass", branch:"branch1",index:1}, {result:"stacksFight", branch:"branch2",index:1}, {result:"pass", branch:"branch1",index:2}, {result:"pass", branch:"branch2",index:2},{result:"end", branch:"branch1",index:3},{result:"end", branch:"branch2",index:3}];

var stacksFightWelcome = "you attack him. catching him by suprise, you manage to defeat stack overflow quickly but take damage in the process.";
var stacksFightOptions = {
  options1:["loot the body for useful items"],
  options2:["carry on to the final door"]
};
var stacksFight = {
  branch1: ["you pick a scroll of debugging. you decide to stay and explore this world, and maybe become a better programmer. the hero this land needs, and definitely doesn't deserve."],
  branch2: ["you arrive at the door and go through it, completing your journey and waking up at home. you fell asleep at your computer, maybe now you will do homework on time!"]
};
var stacksFightTriggers = [{result:"end", branch:"branch1",index:1}, {result:"end", branch:"branch2",index:1}];

class Location {
  constructor(locationName, locationNarration, locationStory, storyOptions, triggers) {
    this.locationName = locationName;
    this.locationNarration = locationNarration;
    this.locationStory = locationStory;
    this.storyOptions = storyOptions;
    this.currentStoryIndex = 0;
    this.triggers = triggers;
    this.currentBranch;
  }

  welcomeNarration() { //onload call this
    outputResponseToParent(displayText, this.locationNarration);
  }

  presentOptions() {
    console.log(this.storyOptions);
    console.log(this.currentStoryIndex);
    var currentOption1 = this.storyOptions['options1'][this.currentStoryIndex];
    var currentOption2 = this.storyOptions['options2'][this.currentStoryIndex];
    outputResponseToParent(displayText, "1: "+currentOption1);
    outputResponseToParent(displayText, "2: "+currentOption2);
  }

  getTriggerResult(branchname) {
    var i, result;

    for (i = 0; i < this.triggers.length; i++) { //cycle thru triggers until we hit branch
      if (this.triggers[i].branch == branchname) {
        if (this.triggers[i].index == this.currentStoryIndex) {
          result = this.triggers[i].result;
          console.log(result);
          console.log(this.triggers[i].index);
          console.log("current index "+this.currentStoryIndex);
          return result;
        }
      }
    }
  }

  checkTriggers() {
    var status;

    console.log(this.currentBranch);
    status = this.getTriggerResult(this.currentBranch);
    return status;
  }

  triggerPass() {
    //advance narrative to next set of choices without user input yet, if we have a pass trigger
    if (this.currentStoryIndex < this.locationStory["branch1"].length) {
      this.presentOptions();
    }
  }

  advanceNarration(userInputText) {
    if (this.currentStoryIndex < this.locationStory["branch1"].length) { //if story for a single location is still going, first branch for now is assumed to be longest
      if (userInputText == "1") {
        var branchStory = this.locationStory["branch1"];
        this.currentBranch = "branch1";
        outputResponseToParent(displayText, branchStory[this.currentStoryIndex]);
        this.currentStoryIndex++; //for longer locations

      } else if (userInputText == "2"){
        var branchStory = this.locationStory["branch2"];
        this.currentBranch = "branch2";
        outputResponseToParent(displayText, branchStory[this.currentStoryIndex]);
        this.currentStoryIndex++;

      } else {
        outputResponseToParent(displayText, "sorry, that's not an option");
      }
    } else { //story is done for this location, player must move on
      outputResponseToParent(displayText, "there is nothing to do! type look to see where you can go");
    }

    var triggerResult = this.checkTriggers();

    if (triggerResult == "end") { //check for game ending
      outputResponseToParent(displayText, "game over");
      userInput.disabled = true;
      return "end";

    } else {
      console.log("TRIGGER RESULT "+triggerResult);
      console.log(this.currentStoryIndex);

      return triggerResult; //return new location we going to
    }

  }
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
    this.locations.push(new Location("room", roomStoryWelcome, roomStory, roomStoryOptions, roomStoryTriggers));
    this.locations.push(new Location("ssh", sshStoryWelcome, sshStory, sshStoryOptions, sshStoryTriggers));
    this.locations.push(new Location("main", mainStoryWelcome, mainStory, mainStoryOptions, mainStoryTriggers));
    this.locations.push(new Location("doorPuzzle", doorPuzzleWelcome, doorPuzzleStory, doorPuzzleOptions, doorPuzzleTriggers));
    this.locations.push(new Location("stacks", stacksStoryWelcome, stacksStory, stacksStoryOptions, stacksStoryTriggers));
    this.locations.push(new Location("stacksFight", stacksFightWelcome, stacksFight, stacksFightOptions, stacksFightTriggers));
  }

  introductionText() {
    outputResponseToParent(displayText, "welcome to our demo. to view inventory, please press inv.");
    outputResponseToParent(displayText, "if you forget commands, write 'help' in the console");
    outputResponseToParent(displayText, "to set character name, type setname <name>");
    outputResponseToParent(displayText, "to proceed write goto room");
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
        this.locations[0].presentOptions();
        this.currentLocation = 0;
        break;
      case "ssh":
        this.locations[1].welcomeNarration();
        this.locations[1].presentOptions();
        this.currentLocation = 1;
        break;
      case "main":
        this.locations[2].welcomeNarration();
        this.locations[2].presentOptions();
        this.currentLocation = 2;
        break;
      case "doorPuzzle":
        this.locations[3].welcomeNarration();
        this.locations[3].presentOptions();
        this.currentLocation = 3;
        break;
      case "stacks":
        this.locations[4].welcomeNarration();
        this.locations[4].presentOptions();
        this.currentLocation = 4;
        break;
      case "stacksFight":
        this.locations[5].welcomeNarration();
        this.locations[5].presentOptions();
        this.currentLocation = 5;
      default:
        outputResponseToParent(displayText, "you can't go there");
        break;
    }
  }

  getLocationIndex(name) {
    var i;
    for (i = 0; i < this.locations.length; i++) {
      if (this.locations.locationName == name) {
        return i;
      }
    }
    return 0;
  }

  gameCommands(userInput) {
    var inputWords = userInput.split(" ");
    console.log("NEW COMMAND ACCEPTING USER INPUT");
    switch (inputWords[0]) {
      case "help":
        outputResponseToParent(displayText, "commands: help look inv setname goto stats");
        break;
      case "look":
        outputResponseToParent(displayText, this.locations[this.currentLocation].welcomeNarration());
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
        console.log("GOTO COMMAND");
        outputResponseToParent(displayText, "going to "+inputWords[1]);
        this.loadLocationNarrative(inputWords[1]);
        break;
      case "1":
        var narrationResult = this.locations[this.currentLocation].advanceNarration(inputWords[0]);

        if (narrationResult != "end" && narrationResult != "pass") {
          console.log("CHANGING LOCATION");
          this.loadLocationNarrative(narrationResult);
        }

        if (narrationResult == "pass") {
          narrationResult = this.locations[this.currentLocation].triggerPass();
        }

        break;
      case "2":
        var narrationResult = this.locations[this.currentLocation].advanceNarration(inputWords[0]);

        if (narrationResult != "end" && narrationResult != "pass") {
          this.loadLocationNarrative(narrationResult);
        }

        if (narrationResult == "pass") {
          narrationResult = this.locations[this.currentLocation].triggerPass();
        }

        break;
      default:
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
      fadeText(document.getElementById('demo-title'));
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
      userInput.value = ""; //clear the value after each input so user doesn't accidently submit same thing again

    }
  }
}

function fadeText(element) { //animation to fade text slowly in main title
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

