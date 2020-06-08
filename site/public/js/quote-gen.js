"use strict";

//makes a random quote appear on the main page title
var quotes = ["We'll be back", "Play on, play off", "Unity drew first blood, not us", "Nobody puts PLAY in the corner", "There can only be PLAY", "Snakes, why'd it have to be snakes?", "Luke, I am your father", "Heeeereeee's Johnny (coming to recommend PLAY)", "Yipee-ki-yay motherPLAYer"];

writeQuote();

function randomNum() {
  curr_quote = Math.floor((Math.random() * (quotes.length)));
  return curr_quote;
}

function writeQuote() {
  quote=document.getElementsByClassName("quote")[0]; //will change as ian doesnt like this, but for now
  quote.innerHTML = quotes[randomNum()]; //find a way to include into page/innerText maybes?
}
