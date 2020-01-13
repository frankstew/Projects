var express = require("express");
var bp = require("body-parser");

var app = express();


// will get rid of array when database is incorporated
app.use(bp.urlencoded({extended: true}));
var campgrounds = [
		{
			name: "idk",
			img: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false"
		},
		{
			name: "idk2",
			img: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"
		},
		{
			name: "idk3",
			img: "https://0901.nccdn.net/4_2/000/000/01e/20c/PSX_20180304_125314-2168x1289.jpg"
		},
	{
			name: "idk",
			img: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false"
		},
		{
			name: "idk2",
			img: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"
		},
		{
			name: "idk3",
			img: "https://0901.nccdn.net/4_2/000/000/01e/20c/PSX_20180304_125314-2168x1289.jpg"
		},
	{
			name: "idk",
			img: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false"
		},
		{
			name: "idk2",
			img: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"
		},
		{
			name: "idk3",
			img: "https://0901.nccdn.net/4_2/000/000/01e/20c/PSX_20180304_125314-2168x1289.jpg"
		},
	{
			name: "idk",
			img: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false"
		},
		{
			name: "idk2",
			img: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"
		},
		{
			name: "idk3",
			img: "https://0901.nccdn.net/4_2/000/000/01e/20c/PSX_20180304_125314-2168x1289.jpg"
		},
	{
			name: "idk",
			img: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false"
		},
		{
			name: "idk2",
			img: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"
		},
		{
			name: "idk3",
			img: "https://0901.nccdn.net/4_2/000/000/01e/20c/PSX_20180304_125314-2168x1289.jpg"
		}
	];


app.get("/", function(req, res) {
	res.render("landing.ejs");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds.ejs", {campgrounds: campgrounds});
});

// same name as get request but totally different bc of post request. Follow REST convention for naming routes, kinda like setter and getter methods it seems
app.post("/campgrounds", function(req, res) {
	var newCampground = req.body.CampgroundName;
	var newImageURL = req.body.CampgroundImage
	var newCG = {
		name: newCampground,
		img: newImageURL
	}
	campgrounds.push(newCG);
	res.redirect("/campgrounds"); // default to redirect as a GET request
});

// REST convention for page that shows form
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.listen(3000, function() {
	console.log("YelpCamp is running")
});