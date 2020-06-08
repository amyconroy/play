//makes a random quote appear on the main page title
"use strict"
addEventListener('load', writeQuote);

var quotes = ["We'll be back", "Play on, play off", "Unity drew first blood, not us", "Nobody puts PLAY in the corner", "There can only be PLAY", "Snakes, why'd it have to be snakes?", "Luke, I am your father", "Heeeereeee's Johnny (coming to recommend PLAY)", "Yipee-ki-yay motherPLAYer"];

writeQuote();

function writeQuote() {
  var quote;
  quote=document.getElementsByClassName("quote")[0]; //will change as ian doesnt like this, but for now
  quote.innerHTML = quotes[randomNum()]; //find a way to include into page/innerText maybes?
}

function randomNum() {
  var curr_quote;
  curr_quote = Math.floor((Math.random() * (quotes.length)));
  return curr_quote;
}
