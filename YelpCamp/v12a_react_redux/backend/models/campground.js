const mongoose = require("mongoose");

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

const campgroundSchema = new mongoose.Schema({
  name: String,
	img: String, // img url
	// price: String,
	// address: String,
	// latitude: String,
	// longitude: String,
	description: String,
	// author: {
	// 	id: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	},
	// 	username: String
	// },
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review"
		}
	]
});

//collection will be called campgrounds, hopefully YelpCamp.campgrounds
module.exports = mongoose.model("Campground", campgroundSchema); 