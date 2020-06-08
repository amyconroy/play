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
