"use strict";

///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database in fill db.');
});

const user = require('./routes/login_db.js');
const products = require('./routes/products_db.js');
const comments = require('./routes/comments_db.js');

exports.createTables = function(){
  try{
    user.createUserTable();
    products.createCategoryTable();
    products.createOrderTable();
    products.createProductTable();
    products.createOrderDetailsTable();
    comments.createCommentsTable();
    db.close();
  } catch(error){
    console.log(error);
    db.close();
  }
}

// CHANGE THE SESSION ID
exports.fillUsers = function(){
  var email = ['admin@admin.com', 'amy@bris.com', 'ana@bris.com', 'olaf@bris.com'];
  var userName = ['admin', 'amy', 'ana', 'olaf'];
  var password = ['admin', 'anarocks', 'amyrocks', 'summer'];

  for(var i = 0; i < 4; i++){
    newuser = {
      email: email[i],
      username: userName[i],
      password: password[i],
      userSession: i
    }
    user.newUser(newuser);
  }
}

exports.fillComments = function(){
  var userId = ['1', '2', '3', '4'];
  var userId2 = ['5', '6', '7', '8'];
  var content = ['Does anyone else have this issue? when I get to the end I cant seem to beat the final bit!',
  'wow I love the new downloads that are available!!',
  'this purchase was the best decision ive ever made',
  'This game has everything!! so nostalgic'];
  var content2 = ['man amy is the best admin ever!',
  'dude no ANA is the best!!',
  'OMG MY FAVE PRODUCT IS ON SALE !!',
  'i just beat the game!'];

  for(var i = 0; i < 4; i++){
    var time = Date.now();
    newcomm = {
      userId: userId[i],
      timePosted: time,
      content: content[i]
    }
    comments.newComment(newcomm);
  }
}

exports.fillCategories = function(){
  var categoryName = ['Game', 'Backgrounds', 'Animations', 'Models'];
  var categoryDescription = ['Experience PLAY for yourself! Get the game today.',
'Spice up your experience by buying your own background!',
'Add animations to the game to make it your own!',
'All the models you can imagine to make the game more realistic!'];

for(var i = 0; i < 4; i++){
    newcat = {
      categoryName: categoryName[i],
      categoryDescription: categoryDescription[i]
    }
    products.newCategory(newcat);
  }
}

exports.fillGameProducts = function(){
  var name = ['Personal Edition', 'Community Edition[BETA]',
 'Pro Edition', 'Student Edition'];
  var description = ['For single/small team developers this plan provides a compromise between the outstanding technical support provided by the PLAY team, and coming at a reasonable pricetag.',
  'We wanted to provide the creative open source community with the same powerful tools, and now we have!',
 'For teams larger than 5 people or those earning over 5 billion per year from use of our license.',
 'For Students all over the world. You will be required to sign up with a valid institution email, and will gain all of the excellent features of the PRO VERSION, for a quarter of the price.']
  var price = ['$5.00', '$0.00', '$50.00', '$10.00'];
  var image = ['Personal.png', 'Community.png', 'Pro.png', 'Student.png'];

  for(var i = 0; i < 4; i++){
      gameProd = {
        productCategory: 1,
        description: description[i],
        name: name[i],
        price: price[i],
        image: image[i]
      }
      products.newProduct(gameProd);
    }
}

exports.fillBackgroundProducts = function(){
  var name = ['Amys Face', 'Anas Face',
 'Galaxy', 'Surprise Meme'];
  var description = ['Have the judgmental face of one of our co-founders staring back at you as you play.',
  'Have the beautiful face of one of our co-founders staring back at you as you play.',
 'Stick to the theme and stare at the stars.',
 'Get a random meme as your background, garaunteed good quality.']
  var price = ['$10.00', '$10.00', '$5.00', '$10.00'];
  var image = ['Amy.png', 'Ana.png', 'Galaxy.png', 'Meme.png'];

  for(var i = 0; i < 4; i++){
      backProd = {
        productCategory: 2,
        description: description[i],
        name: name[i],
        price: price[i],
        image: image[i]
      }
      products.newProduct(backProd);
    }
}

exports.fillAnimationsProducts = function(){
  var name = ['Dab', 'Yeet',
 'Twirl', 'High Five'];
  var description = ['A dab animation just for you!',
  'A yeet animation just for you!',
 'A twirl animation just for you!',
 'A high five animation just for you!']
  var price = ['$5.00', '$5.00', '$5.00', '$10.00'];
  var image = ['Dab.png', 'Yeet.png', 'Twirl.png', 'HighFive.png'];

  for(var i = 0; i < 4; i++){
      animationProd = {
        productCategory: 3,
        description: description[i],
        name: name[i],
        price: price[i],
        image: image[i]
      }
      products.newProduct(animationProd);
    }
}
