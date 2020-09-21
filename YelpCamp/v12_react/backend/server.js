const express               = require("express"),
      app                   = express(),
      bp                    = require("body-parser"),
      cors                  = require("cors"),
      path                  = require("path"),
      // authentication
      passport		          = require("passport"),
      LocalStrategy 	      = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      cp                    = require("cookie-parser"),
      // database
      mongoose              = require("mongoose"),
      // mongoose models
      Campground 	          = require("./models/campground.js"),
      Review			          = require("./models/review.js"),
      User			            = require("./models/user.js"),
      // react
      react                  = require("react"),
      reactDOM               = require("react-dom"),
      // seed
      seedDB 			           = require("./seeds.js");
      require("dotenv").config();

// Route requires
let campgroundRoutes = require("./routes/campground.js"),
reviewRoutes = require("./routes/review.js"),
indexRoutes = require("./routes/index.js");
// ------------------------END OF IMPORTS----------------------


// fixing deprecation warnings for mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

uriString = process.env.DB_URI || "mongodb://localhost/YelpCampv12_react";
mongoose.connect(uriString, (err, res) => {
  if (err) {
    console.log("ERROR connecting to db " + uriString + ": " + err);
  } else {
    console.log("Succeeded connecting to db: " + uriString);
  }
});

// ------------------END OF DB CONNECTION-----------------


// middleware and setup
app.use(bp.urlencoded({extended: true}));
app.use(cors()); // allows cross origin requests, make more specific with a whitelist in time
app.set("views", path.join(__dirname, "../frontend/src/views"));
app.use(express.static(path.join(__dirname, "../frontend/src/public"))); // THIS LINE IS SO IMPORTANT FOR LOADING STYLESHEETS OR ANYTHING IN /public
app.use(express.static(path.join(__dirname,"../frontend")));
app.use(express.static(path.join(__dirname, "../dist")));

app.use(express.json()) // IMPORTANT FOR AXIOS POST, took a long time to figure out, try got maybe

app.use(require("express-session")({
	secret: "SECRETMESSAGEEEE",
	resave: false,
	saveUninitialized: true // ?? just needed
}));

app.use(cp("SECRETMESSAGEEEE"));

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // exists bc of plugin passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ----------------------------END OF MIDDLEWARE-----------------------


seedDB(); // seeds(resets) db




// ROUTES
// ======================================================
// only api routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use("/api", indexRoutes);
app.use("/api/campgrounds", campgroundRoutes);
app.use("/api/campgrounds/:campground_id/reviews", reviewRoutes);



// -----------------------------END OF ROUTES---------------------


app.listen(process.env.PORT || 5000, () => {
  console.log("YelpCamp on 5000 yo");
});


