var express = require("express");
var router = express.Router(); // dont need var app = express();
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var Middleware = require("../middleware/index.js");
var request = require("request");
var rp = require("request-promise-any");
var multer = require('multer');
var cloudinary = require('cloudinary');
require('dotenv').config();

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Please upload an image file'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});




//==================================
// CAMPGROUND ROUTES
// ================================

// INDEX - list all campgrounds
router.get("/", async (req, res) => { // just "/" bc of app.js require statements
  //console.log(req.user);
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    try{
      var allCampgrounds = await Campground.find({name: regex});
      
      if (allCampgrounds.length < 1) {
        // req.flash("error", "No campgrounds found");
        res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user, noMatch: true});
      } else {
        res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user, noMatch: false});
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try{
      var allCampgrounds = await Campground.find({/*name: "idk*/});
      res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user, noMatch: false});
    } catch (err) {
      console.log(err);
    }
  }
	
		
});

// CREATE - post a new campground to db
// "campgroundImage" needs to be name of image in form
router.post("/", upload.single("CampgroundImage"), Middleware.isLoggedIn, async (req, res) => {
  
	var newCampground = req.body.CampgroundName;
	var newPrice = req.body.CampgroundPrice;
	var newAddress = req.body.CampgroundAddress;
	// making address useful for api call
	var formattedAddress = newAddress.replace(/ /g, "+");
	formattedAddress = formattedAddress.replace(/\./g, '');

	var newLat = req.body.CampgroundLatitude;
	var newLong = req.body.CampgroundLongitude;
	var newDescription = req.body.CampgroundDescription;
	var newAuthor = {
		id: req.user._id,
		username: req.user.username
	}

	// want campgrounds to always have address and coordinates, WANT ERROR HANDLING FOR IF NOT A VALID COORDS OR ADDRESS
	if (newAddress && newLat && newLong) {
		//do nothing
	} else if (newAddress) {
		// forward geocode to get coordinates for campground
    var urlForwardGeocoding = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formattedAddress + "&key=" + process.env.MAPS_API_KEY;

		var [forwardCodingError, forwardCodingResponse, forwardCodingBody] = await captureRequestData(urlForwardGeocoding, "GET").catch((err) => {
      console.log("maps api forward geocoding error: " + err);
    }); // geocoding

		if (!forwardCodingError && forwardCodingResponse.statusCode === 200) {
      var parsedForwardCodingBody = JSON.parse(forwardCodingBody);
      // show error if no address result
      if (parsedForwardCodingBody["results"].length === 0) {
        req.flash("error", "Sorry, we had some trouble with that location, try again");
		    res.redirect("/campgrounds");
      }

			newLat = parsedForwardCodingBody["results"][0]["geometry"]["location"]["lat"];
			newLong = parsedForwardCodingBody["results"][0]["geometry"]["location"]["lng"];

			//res.render("campgrounds/show.ejs", {campground: foundCampground, address: address, userLat: userLat, userLng: userLng});
		} else if (codingError) {
			console.log(codingError);
		}
		
	} else if (newLat && newLong) {
		console.log("AAS");
		// reverse geocode to get address for campground
    var urlReverseGeocoding = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + newLat + "," + newLong + "&key=" + process.env.MAPS_API_KEY;
    console.log(urlReverseGeocoding);


		var [reverseCodingError, reverseCodingResponse, reverseCodingBody] = await captureRequestData(urlReverseGeocoding, "GET"); // geocoding
		if (!reverseCodingError && reverseCodingResponse.statusCode === 200) {
      var parsedReverseCodingBody = JSON.parse(reverseCodingBody);

			newAddress = parsedReverseCodingBody["results"][0]["formatted_address"];
			//res.render("campgrounds/show.ejs", {campground: foundCampground, address: address, userLat: userLat, userLng: userLng});
		} else if (codingError) {
			console.log(codingError);
		}
  }
  let imageURL;
  let imageID;
  await cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
    imageURL = result.secure_url;
    imageID = result.public_id;
  })
	var newCG = {
		name: newCampground,
    price: newPrice,
    imgID: imageID, 
		img: imageURL,
		address: newAddress,
		latitude: newLat,
		longitude: newLong,
		description: newDescription,
		author: newAuthor
  };
  console.log(newCG);
	try {
		var newCampground = await Campground.insertMany([newCG]);
		

		console.log("New Campground added");
		//console.log(newCampground);
		req.flash("success", "Campground added");
		res.redirect("/campgrounds"); // default to redirect as a GET request
	} catch (err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds");
	}
	
});

// NEW - displays form for new campground
router.get("/new", Middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new.ejs", {currentUser: req.user});
});



// SHOW - show info about 1 specific campground
// need campgrounds/new first ow will pop up as a id page
router.get("/:id", async (req, res) => {
	// show campground info with campground of id <id>
	// request sent by form via See more button on campgrounds page
	// want to render a show template with that campground
	try {

		var foundCampground = await Campground.findOne({_id: req.params.id}).populate("comments").exec();
		var urlGeolocating = "https://www.googleapis.com/geolocation/v1/geolocate?&key=" + process.env.MAPS_API_KEY;

		// calling geolocation api for user location
		// SOMETHINGS NOT WORKING
    var [locatingError, locatingResponse, locatingBody] = await captureRequestData(urlGeolocating, "POST");
    
		if (!locatingError && locatingResponse.statusCode === 200) {
			var parsedLocatingBody = JSON.parse(locatingBody);
			var userLat = parsedLocatingBody.location.lat;
			var userLng = parsedLocatingBody.location.lng;
			res.render("campgrounds/show.ejs", {campground: foundCampground, address: foundCampground.address, userLat: userLat, userLng: userLng, API_URL: "https://maps.googleapis.com/maps/api/js?key=" + process.env.MAPS_API_KEY + "&callback=initMap" 
    });
		} else if (locatingError) {
			console.log(locatingError);
		}
		
	} catch (err) {
		req.flash("error", "Campground not found");
	}
});

// EDIT
router.get("/:id/edit", Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id});
		//res.send(campground);
		res.render("campgrounds/edit.ejs", {campground: foundCampground});
	} catch (err) {
		console.log(err);
		res.redirect("/campgrounds");
	}
}); 

// UPDATE

router.put("/:id", upload.single("image"), Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
    let foundCampground = await Campground.findById(req.params.id);
    updatedCampground = req.body.campground;
    
    if (req.file) {
      try {
        await cloudinary.v2.uploader.destroy(foundCampground.imgID);
        let result = await cloudinary.v2.uploader.upload(req.file.path);
        updatedCampground.imgID = result.public_id;
        updatedCampground.img = result.secure_url;
      } catch(err) {
        req.flash("error", err.message);
          return res.redirect("back");
      }
    }
    // foundCampground.save() wasn't working
    await Campground.updateOne({_id: req.params.id}, updatedCampground);
		//res.send(campground);
		req.flash("success", "Campground updated");
		res.redirect("/campgrounds/" + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds");
	}
});


// DESTROYYYYYYY

router.delete("/:id", Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
		// DELETE COMMENTS FIRST
    let campgroundToDelete = await Campground.findOne({_id: req.params.id});
    
    
		
		for (let commentIndex = 0; commentIndex < campgroundToDelete["comments"].length; commentIndex++) {
			await Comment.findOneAndRemove({_id: campgroundToDelete["comments"][commentIndex]});
		}
    
    // THEN DELETE IMAGE FROM CLOUDINARY
    await cloudinary.v2.uploader.destroy(campgroundToDelete.imgID);

		// THEN DELETE CAMPGROUND
    await campgroundToDelete.remove();
    req.flash("success", "Campground deleted");
		res.redirect("/campgrounds");
	}
	catch(err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds/" + req.params.id);
	}
});


// using promises to make request api calls into a function so I don't have to use nested callbacks, try to generalize for post and get requests, maybe others
var captureRequestData = async (url, requestType) => {
	var capturedError;
	var capturedResponse;
	var capturedBody;
	
	// GET REQUESTS
	if (requestType === "GET") {
		return new Promise((resolve, reject) => { 
			request(url, (error, response, body) => {
				//console.log(body);
				capturedError = error;
				capturedResponse = response;
				capturedBody = body;
				//console.log(capturedBody);
				if (!capturedError) {
					resolve([capturedError, capturedResponse, capturedBody]);
				} else {
					console.log(capturedError);
					reject(capturedError);
				}
			});	
		});

	// POST REQUESTS
	} else if (requestType === "POST") {
		return new Promise((resolve, reject) => { 
			request.post(url, (error, response, body) => {
				//console.log(body);
				capturedError = error;
				capturedResponse = response;
				capturedBody = body;
				//console.log(capturedBody);
				if (!capturedError) {
					resolve([capturedError, capturedResponse, capturedBody]);
				} else {
					console.log(capturedError);
					reject(capturedError);
				}
			});	
		});
	}	
}

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


module.exports = router;
