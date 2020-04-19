# PLAY Text Adventure Game

Website for PLAY text adventure game engine, in the style of retro 80's nerds.

<center><b> Grades estimated based on current work in preparation for formative deadline on Wednesday. </center></b>

<b> HTML : A </b>

We have a number of pages working and have ensured that they work with a validator (we can still include XHTML in the partials header, so I think this counts as validation as it will still throw an error for an unclosed tags etc even when rendered with template engine, because the browser is returned a full normal html page rendered by server). We also have experienced a number of issues (issues with html: can't think of any, maybe adding semantic tags instead of div?) and are highly confident in the structure of HTML pages. 

<b> CSS : B </b> 

We have ensured that there are no style tags and attributs in our HTML pages, and have gained a high level of experience with stylesheets. (potential issues still to fix: mostly responsive design. I put in a lot of px measurements which ian doesn't like but these can be easily enough switched to something like rem/em or %. Additionally mediaframes so if looking at webpage on a phone the navbar doesn't crush).

<b> JS : B </b>

We have written a large amount of script ourselves, including the routes script (!! and db!!). // should potentially touch on the number of issues involved.
Slider script was self written, main issue with that was timing as javascript does not have native sleep() function.
Random quote generator -> need to add a text file to pull quotes from, change it from HTMLinner method which is unsafe.

<b> PNG : A </b>

C means you've sorted out basic skills such as converting images to PNG, cropping away unwanted edges, changing resoluation
B means you've gained experience with some basic tools such as using filters or changing colours or combining existing images or creating simple shapes or filling
A means you have gained experience with some more sophisticated tools such as handling layers and transparency, or airbrushing or creating original artwork
ANA! 
(I think A but you can decide teehee) 
Main background and title fonts are all original artwork created in gimp. Following steps to reproduce:

Pexels.com for a large resolution Creative Commons license (no attribution required for personal or commercial purposes) as the space background. 3 groups of layers created, one for font, one for grid, one for background.
Grid group:
Generate a grid render.
Use perspective tool to stretch it out as if going into the distance.
Neon filter with drop shadow to create the glowing effect.
Create a horizonal path using path tool. 
Stroke path, 20px, same neon filter to create the glow.

Duplicate and rotate those two layers to make the above grid as well.

Background group:
Create a custom purple gradient.
Set the layer type to Soft Light.
This makes sure the light bleeds through and the dark is dyed purple.

Font group:
Download free for personal use 80's style font.
Create two transparent layers
Create a mask on the top layer and bottom layers for highlights, one opacity one transparency.
Set layer types to overlay.
Create two black->white gradients, due to mask this will create a highlights and shadows. 
Create another layer, set to HSV Value (to "dye" the font underneath).
Add custom linear gradient with different colours to give 80's effect.
Make a new layer group so border does not interefere with text.
Select by colour tool on the font, create a new layer.
Stroke by select on that layer to create a border.
Neon effect on border, add another metallic gradient layer and set to multiply.

Over top of everything add layer with wide radial black->transparent gradient.
This creates a soft vignette and adds more focus into the centre. 

<b> SVG : </b>

// BY WEDNESDAY - vector graphics, can also use canvas in light of this... 
N/A

<b> SERVER : C </b>

Our server has currently been set up by following a tutorial to set up express. 

// BY WEDNESDAY to reach a B by Wednesday submission : have to deal with port numbs / URL validation / content negotiation for old browsers / redirections to browsers/ UTF-8 

<b> DATABASE : C </b> 

// BY WEDNESDAY aiming for a B by dealing with callbacks and the below: 

As well as manually creating a database and extracting data from it in our server, we also update and insert data from the login and products pages. We update user details when they create an account, and update data based on the products that they buy. 
(This is just an example for a login, but don't want to use +userid and +password)
Login route -> connection.query("SELECT * FROM users WHERE userid = ? AND password = ?",[
     req.body.userid,
     req.body.password
    ],function(error, results){});
To prevent constructing an explicit SQL string and making vulnerable to SQL injection.
For Registration route -> parameter validation, to make sure username is unique, password is longer than say 8 letters contains numbers, a capital, and a special character. This would have the insert.

<b> DYNAMIC PAGES : C </b>

// BY WEDNESDAY aiming for a B: use more features of handlebars / organise in a more sophisticated way. 

We have delivered dynamic pages by inserting data into templates on the server side, and have currently created a simple dynamic delivery system. We also want to pull data from DB for a current user that is loggen in, to display profile.
