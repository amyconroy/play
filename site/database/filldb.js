"use strict";
///// init database /////
const playDB = require('./play_db.js');
const user = require('./login_db.js');
const products = require('./products_db.js');
const comments = require('./comments_db.js');

exports.createTables = function(){
  try{
    user.createUserTable();
    products.createCategoryTable();
    products.createOrderTable();
    products.createProductTable();
    products.createOrderDetailsTable();
    comments.createCommentsTable();
  } catch(error){
    console.log(error);
    playDB.closeDB(); // close DB if fail to create
  }
}

// CHANGE THE SESSION ID
exports.fillUsers = function(){
  var email = ['admin@admin.com', 'amy@bris.com', 'ana@bris.com', 'olaf@bris.com', 'grace@grace.com', 'sarah@bris.com', 'davide@bris.com', 'mickie@bris.com'];
  var userName = ['admin', 'amy', 'ana', 'olaf', 'grace', 'sarah', 'davide', 'mickie'];
  var password = ['admin', 'anarocks', 'amyrocks', 'summer', 'kittiecats', 'amyisthebest', 'amyislove', 'woofwoof'];

  for(var i = 0; i < 4; i++){
    var newuser = {
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
  'OMG MY FAVE PRODUCT IS ON SALE !! this is better than amy!',
  'i just beat the game! woof woof!'];

  for(var i = 0; i < 4; i++){
    var time = Date.now();
    var newcomm = {
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
    var newcat = {
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
      var gameProd = {
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
  var name = ['Ocean Textures', 'Sci-Fi Textures',
 'Galaxy', 'Surprise Meme'];
  var description = ['Bring the beach to your game with ocean textures in the background! This is a package of 92 ocean materials.',
  'Give your game a Sci-Fi feel with this pack of 82 Sci-Fi backgrounds!',
 'Stick to the theme and stare at the stars.',
 'Get a random meme as your background, garaunteed good quality.']
  var price = ['$13.00', '$11.00', '$12.00', '$10.00'];
  var image = ['Ocean.png', 'Scifi.png', 'Galaxy.png', 'Meme.png'];

  for(var i = 0; i < 4; i++){
      var backProd = {
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
  var name = ['RGB Character', 'Flying Animations',
 'Twirl', 'High Five'];
  var description = ['Add some realistic animations to your game with this basic character pack filled with 53 new animations.',
  'This pack is the perfect addition for your game if you want to reach new heights!',
 'A twirl animation just for your characters, add a bit of flair to your game!',
 'A high five animation for your characters, celebrate your successes!']
  var price = ['$12.00', '$12.00', '$5.00', '$5.00'];
  var image = ['Dab.png', 'Yeet.png', 'Twirl.png', 'HighFive.png'];

  for(var i = 0; i < 4; i++){
      var animationProd = {
        productCategory: 3,
        description: description[i],
        name: name[i],
        price: price[i],
        image: image[i]
      }
      products.newProduct(animationProd);
    }
}

exports.fillModelsProducts = function(){
  var name = ['Character Avatar', 'Farming Kit',
 'Customisable Character', 'Map Editor'];
  var description = ['This is a standard character avatar to add a bit of flair to your game.',
  'Does your game involve some farming? Add a farming map and some more tools!',
 'Go that bit extra and add the ability to customise your characters!',
 'Build your own map, move around as the user enters input!']
  var price = ['$22.00', '$5.00', '$52.00', '$45.00'];
  var image = ['char.png', 'farmkit.png', 'customchar.png', 'map.png'];

  for(var i = 0; i < 4; i++){
      var modelProd = {
        productCategory: 4,
        description: description[i],
        name: name[i],
        price: price[i],
        image: image[i]
      }
      products.newProduct(modelProd);
    }
}

