var express    	= require("express"),
	bp         	= require("body-parser"),
	mongoose   	= require("mongoose"),
	Campground 	= require("./models/campground.js"),
	Comment		= require("./models/comment.js"),
	seedDB 		= require("./seeds.js");	
	app        	= express();
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
//console.log(__dirname); returns /workspace/Porjects/YelpCamp/v5

// fixing deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/YelpCamp");

seedDB();

app.get("/", (req, res) => {
	res.render("landing.ejs");
});


// INDEX - list all campgrounds
app.get("/campgrounds", async (req, res) => {
	try{
		var allCampgrounds = await Campground.find({/*name: "idk*/});
		res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});
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

// NEW - show new comment form

app.get("/campgrounds/:id/comments/new", async (req, res) => {
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id});
		res.render("comments/new.ejs", {campground: foundCampground});
	} catch(err) {
		console.log(err);
	}
});


// CREATE - post new comment
app.post("/campgrounds/:id/comments", async (req, res) => {
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


app.listen(3000, function() {
	console.log("YelpCamp is running")
});