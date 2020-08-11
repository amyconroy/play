# PLAY Text Adventure Game

Website for PLAY text adventure game engine, in the style of retro 80's nerds. Features include a fully working shop, comments page, and text-adventure game playable on the demo page.

## Usage 
    $ npm install
    $ node server.js 
   
Visit http(s)://localhost:8080/ to view the website.
   
For full content, uncomment:
       
     const fillDB = require('./database/filldb.js');
     
in server.js as well as the subsequent function calls to fill the database with dummy data.

## Built With 
- [Node.js](https://github.com/nodejs)
- [Express](https://github.com/expressjs/express)
- [Handlebars](https://github.com/handlebars-lang)
- [SQLite3](https://www.sqlite.org/index.html)

