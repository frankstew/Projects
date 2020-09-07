var express = require("express");
var router = express.Router(); // dont need var app = express();
var passport = require("passport");
var User = require("../models/user.js");


// =============================
// OTHER ROUTES
// =============================

router.get("/", (req, res) => {
	res.render("landing.ejs");
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
			req.flash("error", err.message);
			res.render("register.ejs");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp " + user.username);
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
    failureRedirect: "/login",
    failureFlash: "Invalid username or password"
	}), (req, res) => { 
});


// logout route

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out")
	res.redirect("/campgrounds");
});


module.exports = router;