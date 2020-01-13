var express    	= require("express"),
	bp         	= require("body-parser"),
	mongoose   	= require("mongoose"),
	Campground 	= require("./models/campground.js"),
	Comment		= require("./models/comment.js"),
	seedDB 		= require("./seeds.js");	
	app        	= express();
app.use(bp.urlencoded({extended: true}));

// fixing deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/YelpCamp");

seedDB();

app.get("/", function(req, res) {
	res.render("landing.ejs");
});


// INDEX - list all campgrounds
app.get("/campgrounds", function(req, res) {
		Campground.find({/*name: "idk*/}, function(err, allCampgrounds) {
			if (err) {
				console.log(err);
			} else {
				res.render("index.ejs", {campgrounds: allCampgrounds});
			}
	});
});

// CREATE - post a new campground to db
app.post("/campgrounds", function(req, res) {
	var newCampground = req.body.CampgroundName;
	var newImageURL = req.body.CampgroundImage;
	var newDescription = req.body.CampgroundDescription;
	var newCG = {
		name: newCampground,
		img: newImageURL,
		description: newDescription
	};
	
	Campground.insertMany([newCG], function(err, newCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log("New Camoground added");
			console.log(newCampground);
		}
	});
	res.redirect("/campgrounds"); // default to redirect as a GET request
});

// NEW - displays form for new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});



// SHOW - show info about 1 specific campground
// need campgrounds/new first ow will pop up as a id page
app.get("/campgrounds/:id", function(req, res) {
	// show campground info with campground of id <id>
	// request sent by form via See more button on campgrounds page
	// want to render a show template with that campground
	Campground.findOne({_id: req.params.id}).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			//res.send(campground);
			res.render("show.ejs", {campground: foundCampground});
			
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp is running")
});