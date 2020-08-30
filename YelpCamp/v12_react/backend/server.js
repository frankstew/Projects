const express     = require("express"),
      app         = express(),
      bp          = require("body-parser"),
      cors        = require("cors"),
      path        = require("path"),
      // database
      mongoose    = require("mongoose"),
      // mongoose models
      Campground 	= require("./models/campground.js"),
      Review			= require("./models/review.js"),
      // react
      react       = require("react"),
      reactDOM    = require("react-dom"),
      // seed
      seedDB 			= require("./seeds.js");
      
      

    // FIGURE OUT THE CROSS ORIGIN REQUEST THING, THERE WAS A VIDEO


// Route requires
let campgroundRoutes = require("./routes/campground.js"),
reviewRoutes = require("./routes/review.js"),
indexRoutes = require("./routes/index.js");

// fixing deprecation warnings for mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/YelpCampv12_react", (err, res) => {
  if (err) {
    console.log("ERROR connecting to db: " + err);
  } else {
    console.log("Succeeded connecting to db: ");
  }
});


// app setup
app.use(bp.urlencoded({extended: true}));
app.use(cors()); // allows cross origin requests, make more specific with a whitelist in time
app.set("views", path.join(__dirname, "../frontend/src/views"));
app.use(express.static(path.join(__dirname, "../frontend/src/public"))); // THIS LINE IS SO IMPORTANT FOR LOADING STYLESHEETS OR ANYTHING IN /public

app.use(express.json()) // IMPORTANT FOR AXIOS POST, took a long time to figure out, try got maybe



seedDB(); // seeds(resets) db




// ROUTES
// ======================================================
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:campground_id/reviews", reviewRoutes);







app.listen(process.env.PORT || 5000, () => {
  console.log("YelpCamp on 5000 yo");
});


