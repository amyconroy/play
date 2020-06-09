var userInput = document.getElementById("user-input");
mainDemo();

function mainDemo() {
  var userInput = document.getElementById("user-input");
  document.addEventListener("keypress", inputHandler, false);
}

function inputHandler(e) {
  if (e.key == 'Enter') {
    var userInput = document.getElementById("user-input");

    alert(userInput.value);
    alert("keypresswords");
  }
}


// 1. print welcome intro (set the scene), say just a demo so you can't win
// 2. must enter the option exactly as they are presented to you
// throw up disclaimer stating that you can't win! small sample of the game
// (user has to enter what is in quotes, if not throw an error saying please try again!)
// hackily offer the first narration with two options
//  would you like to 1. go to 'entrance' or 2. speak to 'neill'
get.name(); // based on name that user enters (case sensitive)
get.narration(); // where name.equals() what they entered, get naration (based on the name )
get.node(); // return array of nodes, present as options to user ... (these are the names of other places they can go/ people they can speak to)

class location {
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
    "node" : ["main", "room"] //only go to room if you have key
  ],
  [
    "name" : "main",
    "description" : "main desc",
    "node" : ["stacks", "root"] //if they solve puzzle in main go straight to root
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
    "node" : ["ssh"] //go back to ssh with key
  ]
}
