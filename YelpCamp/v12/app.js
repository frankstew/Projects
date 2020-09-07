	// app stuff
var express    		= require("express"),
	app        		= express(),
	bp         		= require("body-parser"),
	methodOverride 	= require("method-override"),
	// database
	mongoose   		= require("mongoose"),
	// authentication
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	// mongoose models
	Campground 		= require("./models/campground.js"),
	Comment			= require("./models/comment.js"),
	User 			= require("./models/user.js"),
	seedDB 			= require("./seeds.js"),
	flash 			= require("connect-flash"),
	request			= require("request"),
  rp 				= require("request-promise-any");

require('dotenv').config();



	



	// ROUTE REQUIRES
var campgroundRoutes 	= require("./routes/campgrounds.js"),
	commentRoutes 		= require("./routes/comments.js"),
	indexRoutes 		= require("./routes/index.js");



// fixing deprecation warnings for mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose connection
const localHostURL = "mongodb://localhost/YelpCamp";
uriString = process.env.DB_URI || localHostURL;
mongoose.connect(uriString, (err, res) => {
	if (err) { 
		console.log ('ERROR connecting to: ' + uriString + ': ' + err);
	} else {
		console.log ('Succeeded connection to: ' + uriString);
	}
});



app.use(bp.urlencoded({extended: true}));
app.use(flash());

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//console.log(__dirname); returns /workspace/Projects/YelpCamp/v5








//seedDB(); // seeds(resets) db

// PASSPORT CONFIGURATION ----------------------------------------------------

app.use(require("express-session")({
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: false // ?? just needed
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // exists bc of plugin passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
	res.locals.currentUser = req.user; // makes it available in every route
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


// ROUTES ================================================================
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);





app.listen(3000, function() {
	console.log("YelpCamp is running");
});