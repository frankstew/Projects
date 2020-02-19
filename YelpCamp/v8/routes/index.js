var express = require("express");
var router = express.Router(); // dont need var app = express();
var passport = require("passport");
var User = require("../models/user.js");


// =============================
// OTHER ROUTES
// =============================

router.get("/", (req, res) => {
	res.render("landing.ejs", {currentUser: req.user});
});


// AUTH ROUTES -------------------------------------------------------------

// show register form
router.get("/register", (req, res) => {
	res.render("register.ejs");
});

// handle sign up logic
router.post("/register", (req, res) => {
	// registers a new user
	// register, then if it works, authenticate, then redirect
	// ********** User is not a constructor *****************
	
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			res.render("register.ejs");
		}
		passport.authenticate("local")(req, res, () => {
			res.redirect("/campgrounds");
		});
	});
});

// LOGIN 
// get to show form, post to actually login

// show login form
router.get("/login", (req, res) => {
	res.render("login.ejs");
});

// handle login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), (req, res) => {
	res.redirect("/campgrounds"); // shouldnt be hitting this 
});


// logout route

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;