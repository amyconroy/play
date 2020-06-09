//polyfills for old browsers
"use strict";

var current_slide = 0;
var posts = getPosts("post_image");
var total_posts = posts.length;
var outputTextParent = document.getElementById('remove-inner-text');

var randomFacts = ["The first commerical U.S cell phone weighed two pounds!",
"Olivia Newton-John's 'Phyiscal' was the 80's most popular song!",
"The original Gameboy had only five games available in the United States!",
"You couldn't play a CD at home until 1982!",
"The first widely-used disposable camera hit the market in 1986!",
"80's computers typicall had 64KB of memory!",
"MTV was created in 1981, the first ever video played was 'Video Killed the Radio Star'!",
"McDonald's Chicken McNuggets were introduced in 1981!",
"Coca-Cola changed their iconic formula once during the 80s, causing a consumer uproar!"];

var textContent = ["Visit products for amazing deals", "Check out our engine demo today", "Sign up to receive 10% off on your first purchase"];

init();
slider();

function init() {
  document.getElementById("prev_slide").addEventListener("click", prevSlide);
  document.getElementById("next_slide").addEventListener("click", nextSlide);
}

function slider() {
  hidePosts(posts);
  hideText(outputTextParent);
  addText(outputTextParent, textContent[current_slide], "title-post");
  addText(outputTextParent, randomFacts[randomNum()], "post-text");

  posts[current_slide].classList.add("visible");

  if (current_slide < (total_posts-1)) {
    current_slide++;
    curr_text++;
  } else {
    current_slide = 0;
  }
  if(curr_text = 9){
    curr_text = 0;
  }
  setTimeout(slider, 5000);
}

function nextSlide() {
  if (current_slide < (total_posts-1)) {
    current_slide++;
  } else {
    current_slide = 0;
  }
  hidePosts(posts);
  hideText(outputTextParent);
  addText(outputTextParent, textContent[current_slide], "title-post");
  addText(outputTextParent, randomFacts[randomNum()], "post-text");
  posts[current_slide].classList.add("visible");
}

function prevSlide() {
  if (current_slide > 0) {
    current_slide--;
  } else {
    current_slide = (total_posts-1);
  }
  hidePosts(posts);
  hideText(outputTextParent);
  addText(outputTextParent, textContent[current_slide], "title-post");
  addText(outputTextParent, randomFacts[randomNum()], "post-text");
  posts[current_slide].classList.add("visible");

}

function getPostById(postId) {
  return document.getElementById(postId);
}

function getPosts(elementClass) {
  //get all posts by element type name
  return document.getElementsByClassName(elementClass);
}

function showPicture(element) {
  element.classList.add("visible");
  //for specific post add visible class
}

function hidePosts(allPosts) {
  //for i in all posts, go thru posts and remove visible class
  var i;

  for (i = 0; i < allPosts.length; i++) {
    allPosts[i].classList.remove("visible");
  }
}

function addText(parent, text, elclass) {
  var newText = document.createElement('h4');
  newText.classList.add(elclass);

  var textnode = document.createTextNode(text);
  newText.appendChild(textnode);
  parent.appendChild(newText);
}

function hideText(element){
  var child = element.lastElementChild;

  console.log(child);

  while(child){
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function randomNum() {
  var num;
  num = Math.floor((Math.random() * (randomFacts.length)));
  return num;
}
