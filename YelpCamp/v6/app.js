	// app stuff
var express    		= require("express"),
	bp         		= require("body-parser"),
	// database
	mongoose   		= require("mongoose"),
	// authentication
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	// mongoose models
	Campground 		= require("./models/campground.js"),
	Comment			= require("./models/comment.js"),
	User 			= require("./models/user.js"),
	seedDB 			= require("./seeds.js");	

	app        		= express();


app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
	res.locals.currentUser = req.user; // makes it available in every route
	next();
});
//console.log(__dirname); returns /workspace/Porjects/YelpCamp/v5

// fixing deprecation warnings for mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/YelpCamp");

seedDB(); // seeds(resets) db

// PASSPORT CONFIGURATION ----------------------------------------------------

app.use(require("express-session")({
	secret: "Pan on the kitchen stove",
	resave: false,
	saveUninitialized: false // ?? just needed
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // exists bc of plugin passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES ------------------------------------------------------------------

app.get("/", (req, res) => {
	res.render("landing.ejs");
});


// INDEX - list all campgrounds
app.get("/campgrounds", async (req, res) => {
	//console.log(req.user);
	try{
		var allCampgrounds = await Campground.find({/*name: "idk*/});
		res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
	} catch (err) {
		console.log(err);
	}
		
});

// CREATE - post a new campground to db
app.post("/campgrounds", async (req, res) => {
	var newCampground = req.body.CampgroundName;
	var newImageURL = req.body.CampgroundImage;
	var newDescription = req.body.CampgroundDescription;
	var newCG = {
		name: newCampground,
		img: newImageURL,
		description: newDescription
	};
	try {
		var newCampground = await Campground.insertMany([newCG]);
		console.log("New Camoground added");
		//console.log(newCampground);
		res.redirect("/campgrounds"); // default to redirect as a GET request
	} catch (err) {
		console.log(err);
		res.redirect("/campgrounds");
	}
	
});

// NEW - displays form for new campground
app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new.ejs");
});



// SHOW - show info about 1 specific campground
// need campgrounds/new first ow will pop up as a id page
app.get("/campgrounds/:id", async (req, res) => {
	// show campground info with campground of id <id>
	// request sent by form via See more button on campgrounds page
	// want to render a show template with that campground
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id}).populate("comments").exec();
		//res.send(campground);
		res.render("campgrounds/show.ejs", {campground: foundCampground});
	} catch (err) {
		console.log(err);
	}
});



// ===========================
// Comments Routes
// ===========================

// NEW - show new comment form, with middleware

app.get("/campgrounds/:id/comments/new", isLoggedIn, async (req, res) => {
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id});
		res.render("comments/new.ejs", {campground: foundCampground});
	} catch(err) {
		console.log(err);
	}
});


// CREATE - post new comment
app.post("/campgrounds/:id/comments", isLoggedIn, async (req, res) => {
	try {
		var foundCampground = await Campground.findById(req.params.id);
		var comment = await Comment.create(req.body.comment);
		foundCampground.comments.push(comment);
		foundCampground.save();
		res.redirect("/campgrounds/" + req.params.id);
	} catch(err) {
		console.log(err);
		res.redirect("/campgrounds");
	}
});

// AUTH ROUTES -------------------------------------------------------------

// show register form
app.get("/register", (req, res) => {
	res.render("register.ejs");
});

// handle sign up logic
app.post("/register", (req, res) => {
	// registers a new user
	// register, then if it works, authenticate, then redirect
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
app.get("/login", (req, res) => {
	res.render("login.ejs");
});

// handle login logic
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), (req, res) => {
	res.redirect("/campgrounds"); // shouldnt be hitting this 
});


// logout route

app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});


// MIDDLEWARE

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000, function() {
	console.log("YelpCamp is running")
});