//polyfills for old browsers
"use strict";

var current_slide = 0;
var posts = getPosts("post_image");
var total_posts = posts.length;

var curr_text = 0;
var randomFacts = ["The first commerical U.S cell phone weighed two pounds!",
"Olivia Newton-John's 'Phyiscal' was the 80's most popular song!",
"The original Gameboy had only five games available in the United States!",
"You couldn't play a CD at home until 1982!",
"The first widely-used disposable camera hit the market in 1986!",
"80's computers typicall had 64KB of memory!",
"MTV was created in 1981, the first ever video played was 'Video Killed the Radio Star'!",
"McDonald's Chicken McNuggets were introduced in 1981!",
"Coca-Cola changed their iconic formula once during the 80s, causing a consumer uproar!"];

init();
slider();

function init() {
  document.getElementById("prev_slide").addEventListener("click", prevSlide);
  document.getElementById("next_slide").addEventListener("click", nextSlide);
}

function slider() {
  hidePosts(posts);
  posts[current_slide].classList.add("visible");

  var text = randomFacts[curr_text];
  document.getElementById("text").innerHTML = text;

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
    curr_text++;
  } else {
    current_slide = 0;
    curr_text = 0;
  }
  hidePosts(posts);
  posts[current_slide].classList.add("visible");
}

function prevSlide() {
  if (current_slide > 0) {
    current_slide--;
  } else {
    current_slide = (total_posts-1);
  }
  hidePosts(posts);
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
