"user strict"

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
      break;
    case "demo-title":
      setNavBarSelect("demo-menu");
      break;
    case "downloads-title":
      setNavBarSelect("downloads-menu");
      break;
    case "products-title":
      setNavBarSelect("products-menu");
      break;
    default:

  }
}

function setNavBarSelect(elementId) {
  var navbarItem = document.getElementById(elementId);
  navbarItem.classList.add("menu_item_selected");
}
