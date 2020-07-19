const express     = require("express"),
      app         = express(),
      bp          = require("body-parser"),
      cors        = require("cors"),
      // database
      mongoose    = require("mongoose"),
      // mongoose models
      Campground 	= require("./models/campground.js"),
      Comment			= require("./models/comment.js"),
      path        = require("path"),
      react       = require("react"),
      reactDOM    = require("react-dom"),
      seedDB 			= require("./seeds.js");

    // FIGURE OUT THE CROSS ORIGIN REQUEST THING, THERE WAS A VIDEO



// fixing deprecation warnings for mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/YelpCamp");

// app setup
app.use(bp.urlencoded({extended: true}));
app.use(cors()); // allows cross origin requests, make more specific with a whitelist in time
app.use(bp.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "../frontend/src/views"));
app.use(express.static(path.join(__dirname, "../frontend/src/public"))); // THIS LINE IS SO IMPORTANT FOR LOADING STYLESHEETS OR ANYTHING IN /public
// IMPORTANT FOR AXIOS POST, took a long time to figure out, try got maybe
app.use(express.json()) 



seedDB(); // seeds(resets) db

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "../frontend/src/views"));
  // res.render("landing.jsx");
});

// Campground index route
app.get("/campgrounds", async (req, res) => {
  //console.log(req.user);
  // res.send("does this work");
	try{
		var allCampgrounds = await Campground.find({/*name: "idk*/});
		res.send({campgrounds: allCampgrounds/*, currentUser: req.user*/});
	} catch (err) {
		console.log(err);
	}	
});

// campground CREATE route
app.post("/campgrounds", async (req, res) => {
  const newCampgroundName = req.body.CampgroundName;
  const newImg = req.body.CampgroundImg;
  const newDescription = req.body.CampgroundDescription;

  const newCG = {
    name: newCampgroundName,
    img: newImg,
    description: newDescription
  };

  const newCampground = await Campground.insertMany([newCG]).catch((err) => {
    console.log("Error adding campground, mongoose error: " + err);
  });

  if (newCampground) {
    console.log("new Campground Added");
  }
// need to res.send something so that axios knows post was successful
  res.status(200).send();

});

// SHOW ROUTE
app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findOne({_id: req.params.id}).populate("comments").exec().catch((err) => {
    console.log("mongoose error show page: " + err);
  });
  if (campground) {
    res.send(campground);
  }
});

// UPDATE
app.put("/campgrounds/:id", async (req, res) => {
  console.log(req.body);

  const updatedCG = {
    name: req.body.editedCampground.updatedCampgroundName,
    img: req.body.editedCampground.updatedCampgroundImg,
    description: req.body.editedCampground.updatedCampgroundDescription
  };

  let foundCampground = await Campground.findByIdAndUpdate(req.params.id, updatedCG).catch((err) => {
    console.log("mongoose put error: " + err);
  });

  if (foundCampground) {
    res.send(foundCampground);
  }

});


// DESTrOYYYYYYYYYYYYYYY
app.delete("/campgrounds/:id", async (req, res) => {
  const campgroundToDelete = await Campground.findOne({_id: req.params.id}).catch((err) => {
    console.log("mongoose destroy error: " + err);
  });

  if (campgroundToDelete) {
    // delete comments first
    campgroundToDelete["comments"].forEach(async (comment) => {
      await Comment.findOneAndDelete({_id: comment}).catch((err) => { // comment returns just comment id
        console.log("mongoose campground destroy: comments destroy error: " + err);
      });
    });

    // then delete campground
    await Campground.findOneAndDelete({_id: req.params.id}).catch((err) => {
      console.log("mongoose campground destroy error: " + err);
    });
    console.log("Campground Deleted");
    res.send("Campground Deleted");
  }
});




app.listen(process.env.PORT || 5000, () => {
  console.log("YelpCamp on 5000 yo");
});