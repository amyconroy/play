"use strict";

//polyfills for old browsers, remove the frigging copy pasting

var current_slide = 0;
var posts = getPosts("post_image");
var total_posts = posts.length;

init();
slider();

function init() {
  document.getElementById("prev_slide").addEventListener("click", prevSlide);
  document.getElementById("next_slide").addEventListener("click", nextSlide);
}

function slider() {
  hidePosts(posts);

  posts[current_slide].classList.add("visible");

  if (current_slide < (total_posts-1)) {
    current_slide++;
  } else {
    current_slide = 0;
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
  //get specific post by name, do we need this?
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
  for (i = 0; i < allPosts.length; i++) {
    allPosts[i].classList.remove("visible");
  }
}
