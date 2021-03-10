# YELP Camp 
This is the final project in the bootcamp using 
* Express as a server
* EJS as a template
* MongoDB and Mongoose as a database


The goal is to make a web app similar to yelp that allows campsites and rv parks to be reviewed and rated. 


## Table of Contents
* [Structure](#structure)
* [ToDo](#todo)


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
    * [x] show ratings in campgrpunds, populate reviews
