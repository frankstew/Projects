var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var reviewSchema = new mongoose.Schema({
	text: String,
	// author: {
	// 	id: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	},
	// 	username: String
  // }
  username: String,
  rating: Number,
  likes: Number,
  dislikes: Number
});

reviewSchema.plugin(passportLocalMongoose); // needed for mongoose stuff

module.exports = mongoose.model("Review", reviewSchema);