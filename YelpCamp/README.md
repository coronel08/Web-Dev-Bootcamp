# YELP Camp 
This is the final project in the bootcamp using 
* Express as a server
* EJS as a template
* MongoDB and Mongoose as a database


The goal is to make a web app similar to yelp that allows campsites and rv parks to be reviewed and rated. <br>
Make sure to create .env file with our cloudlare information


## Table of Contents
* [Deploy](#deploy)
* [Structure](#structure)
* [ToDo](#todo)

### Deploy
```
npm init -y
npm i express
// create app.js and readme etc and write file
node app.js //or nodemon app.js
```

### Structure


### Todo
* [x] npm init -y
* [x] npm i express mongoose ejs
* [x] create app.js /views/home.ejs README.md
* [x] set app.js view engine to 
* [x] Mongoose model for yelp campground in models/campground.js
    * [x] seed data into model
* [x] Style frontend using ejs
    * [x] create views for campgrounds, layouts, partial
    * [x] use bootstrap to stylize the page
* [x] Setup client and server side validation
    * [x] Use bootstrap for validation handling
    * [x] make wrapper and error files in utils. Used in app.js
    * [x] Use JOI schema to validate server side
* [x] Add Rating system 
    * [x] Create review schema in models folder, use one to many relation to campgrounds schema
    * [x] Create review form in show.ejs 
    * [x] Create reviews post path/route to receive information from show.ejs and push review to campground 
    * [x] show ratings in campgrpunds, populate reviews in one to many schema in app.js
    * [x] create delete path/route for reviews
    * [x] add middleware for deleting associated reviews to a campground
* [x] Express Router and Cookies
    * [x] Split paths/routes into /routes
    * [x] Add Cookies and Signing Cookies
* [x] Add Session and Flash
    * [x] Add middleware for session and flash 
    * [x] Create a public route for static content
* [x] Add authentication with passport
    - [x] Create /models/user.js and store schema for adding user
    - [x] Create register path and postand add logic
    - [x] isLoggedIn Middleware 
    - [x] logout path aand logic added and fix navbar with new user paths.
    - [x] ReturnTo behavior, and register also logs in user
* [x] Fix authentication behavior to tie in with author
    * [x] add author to route for add campgrounds
    * [x] Show Campground by id View, hide if user doesnt match author 
    * [x] If user doesnt match author give req.flash error and redirect. Need to move into its own middleware next
    * [x] Moved all middlewares from routes into middleware.js and cleaned routes path
    * [x] Add same author != user to Reviews. Hide leave a review if no user signed in. 
        * [x] When creating a review review.author = req.user._id
        * [x] Review.js schema added author
        * [x] Populate review author in routes/campgrounds.js, create middleware for isReviewAuthor and use it in reviews 
* [x] Refractor to use models and router.route instead of router.get
* [x] Add star ratings using [starability.css](https://github.com/LunarLogic/starability) in show.ejs, and using the rating scale input
* [x] Add image upload to campgrounds using cloudinary
    * [x] Create Cloudinaryconfig file and use it in routes/campground
    * [x] Also npm i dotenv and store cloudinary info there, add conditional in app.js to see if in development mode or deployment.
    * [x] Add upload images to edit page, CRUD imgs
* [x] Adding Maps using mapbox
* [x] Dockerize the node/express/mongo application. Used this for reference [dockerize express and mongo](https://dev.to/jay97/docker-compose-an-express-and-mongo-app-aai)
