var express = require("express");
var router = express.Router(); // dont need var app = express();
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var Middleware = require("../middleware/index.js");
var request = require("request");
var rp = require("request-promise-any");
require('dotenv').config()


//==================================
// CAMPGROUND ROUTES
// ================================

// INDEX - list all campgrounds
router.get("/", async (req, res) => { // just "/" bc of app.js require statements
	//console.log(req.user);
	try{
		var allCampgrounds = await Campground.find({/*name: "idk*/});
		res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
	} catch (err) {
		console.log(err);
	}
		
});

// CREATE - post a new campground to db
router.post("/", Middleware.isLoggedIn, async (req, res) => {
	var newCampground = req.body.CampgroundName;
	var newPrice = req.body.CampgroundPrice;
	var newImageURL = req.body.CampgroundImage;
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

		var [forwardCodingError, forwardCodingResponse, forwardCodingBody] = await captureRequestData(urlForwardGeocoding, "GET"); // geocoding
		if (!forwardCodingError && forwardCodingResponse.statusCode === 200) {
			var parsedForwardCodingBody = JSON.parse(forwardCodingBody);
			newLat = parsedForwardCodingBody["results"][0]["geometry"]["location"]["lat"];
			newLong = parsedForwardCodingBody["results"][0]["geometry"]["location"]["lng"];

			//res.render("campgrounds/show.ejs", {campground: foundCampground, address: address, userLat: userLat, userLng: userLng});
		} else if (codingError) {
			console.log(codingError);
		}
		
	} else if (newLat && newLong) {
		
		// reverse geocode to get address for campground
		var urlReverseGeocoding = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + newLat + "," + newLong + "&key=" + process.env.MAPS_API_KEY;

		var [reverseCodingError, reverseCodingResponse, reverseCodingBody] = await captureRequestData(urlReverseGeocoding, "GET"); // geocoding
		if (!reverseCodingError && reverseCodingResponse.statusCode === 200) {
			var parsedReverseCodingBody = JSON.parse(reverseCodingBody);
			newAddress = parsedReverseCodingBody["results"][0]["formatted_address"];
			//res.render("campgrounds/show.ejs", {campground: foundCampground, address: address, userLat: userLat, userLng: userLng});
		} else if (codingError) {
			console.log(codingError);
		}
	}
	var newCG = {
		name: newCampground,
		price: newPrice,
		img: newImageURL,
		address: newAddress,
		latitude: newLat,
		longitude: newLong,
		description: newDescription,
		author: newAuthor
	};
	try {
		var newCampground = await Campground.insertMany([newCG]);
		

		console.log("New Camoground added");
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

router.put("/:id", Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
		var foundCampground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
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
		
		// THEN DELETE CAMPGROUND
		await Campground.findOneAndRemove({_id: req.params.id});
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


module.exports = router;
