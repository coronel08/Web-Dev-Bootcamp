# ConcertZone
This is my full stack project
* Express as a server and backend such as authentication
* EJS as a template and frontend
* MongoDB and Mongoose as a database in development, Cloudinary for media storage in the cloud.
* Deployed on Heroku Cloud


The goal is to make a web app/site that allows experiences at venues to be shared, I miss it. <br><br>

Finish dockerizing the site using this as an example[Toptal Docker Node Auth App](https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3)

## Table of Contents
* [Deployment](#deployment)
* [Folder Structure](#folder-structure)
* [ToDo](#todo)
<br>

## Deployment
To deploy you have the options of
* localhost deployment 
    * install mongodb
        * replace the mongoLocal variable in app.js line 95 with your <dbuser> and <password>
* docker deployment,
    * repalce the mongoDockerDb variable in app.js line 96 with your <dbuser> and <password>
* cloud deployment
    * git init
    * heroku create 
    * git remote -v
    * git add .
    * git commit -m ""
    * git push heroku master

        * Make sure to rename items in env file with your credentials. Then rename env file as .env
            * cloudinary: Used as cloud media storage in uploads section
            * mongoAtlas: Used as cloud MongoDB Instance

<b>All options require you to sign up for Mapbox and use your token in the env file then rename it as .env</b>


To Seed data into the Database
* Register a user first
    * login to mongodb shell
    ```
    $ show dbs
    $ use {{databaseName}}
    $ show collections
    $ db.users.find({})
    ```
    * node ./seeds/index.js, would need to be replaced with your authors user id. <br>

### Folder Structure
ConcertZone/
    app.js
    README.md
    controllers/
        reviews.js
        users.js
        venue.js
    models/
        review.js
        user.js
        venue.js
    node_modules/
    public/
        stylesheet/
            app.css
            home.css
            stars.css
        clusterMap.js
        map.js
        validateForms.js
    routes/
        campground.js
        review.js
        users.js
        venues.js
    seeds/
        cities.js
        index.js
        seedHelper.js
        venues.js
    utils/
        ExpressError.js
        wrapAsync.js
    views/
        layouts/
        partials/
        users/
        venues/
        error.ejs
        home.ejs
<br><br>

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
