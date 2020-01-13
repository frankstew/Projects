# YelpCamp

- Add landing page
- Add campgrounds page that lists all campgrounds

# V1:
# ------------------------------------------------
## Each campground has:

- Name
- Image




## Layout and Basic Styling:

- Create header and footer partials
- Add in bootstrap



## Creating New Campgrounds:
- Setup campground post route
- Add in body-parser
- Setup route to show form
- Add basic unstyled form





## Style Campgrounds page:
- Add a better header/title
- Make campgrounds display in a grid



## Style the Navbar and Form:
- Add a navbar to all templates
- Styke the new campground form

# V2:
# ------------------------------------------------

## Add Mongoose:
- Install and configure mongoose
- Setup campground model
- use model inside of routes


## Show Page:
- Review RESTful routes we have seen
- Add description to campground model
- Learn db.collection.drop(): deletes all things in collection
- Add a show route/template


# V3

# ------------------------------------------------

## Refactor mongoose code:
- create a models directory
- use module.exports
- require everything correctly

## add a seeds file:
- add a seeds.js file
	- has some data, deletes everything in the database and re fills it whenevr the server starts
- run the file everytime the server starts

## Add comments model:
- add comments models
- add comments to campground schema
- show comments on show pages

# V4:

# ------------------------------------------------

## Add comment NEW/CREATE:
- add comment NEW and CREATE routes
- add new comment form
*** fix form and route combo + make create route ***

NEed nested routes for comments:
NEW		campgrounds/:id/comments/new	 GET
CREATE	campgrounds/:id/comments		 POST