
alert(getPostById("image_1"));
//showPicture(getPostById("image_1"));

function test() {
  alert("test1!!");
}

function getPostById(postId) {
  return document.getElementById(elementId);
  //get specific post by name
}

function getPosts(elementClass) {
  //get all posts by element type name
}

function showPicture(element) {
  element.classList.add("visible");
  //for specific post add visible class
}

function hidePictures(allPosts) {
  //for i in all posts, go thru posts and remove visible class
}
