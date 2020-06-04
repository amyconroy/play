findPageType();

function findPageType() {
  var pageId = document.getElementsByClassName("title-content")[0].id
  console.log("page id is "+pageId);

  switch(pageId) {
    case "index-title":
      setNavBarSelect("index-menu");
      break;
    case "comments-title":
      setNavBarSelect("comments-menu");
      break;
    case "login-title":
      setNavBarSelect("login-menu");
    default:

  }
}

function setNavBarSelect(elementId) {
  var navbarItem = document.getElementById(elementId);
  navbarItem.classList.add("menu_item_selected");
}
