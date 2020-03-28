var Campground  = require("../models/campground.js"),
    Comment     = require("../models/comment.js");

middlewareObj = {};

middlewareObj.checkCampgroundOwnership = async function checkCampgroundOwnership(req, res, next) {
	// if user logged in
	if (req.isAuthenticated()) {
		// does user own campground
		try{
			var foundCampground = await Campground.findById(req.params.id);
			if (foundCampground.author.id.equals(req.user._id)) {
				next();
			} else {
				res.redirect("back");
			}
		} catch(err) {
			console.log(err);
			res.redirect("back");	
		}
	} else {
		//else 
		res.redirect("back");
		// res.redirect("/campgrounds/" + req.params.id + "/edit");
	}
}



middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



middlewareObj.checkCommentOwnership = async function checkCommentOwnership(req, res, next) {
	// if user logged in
	if (req.isAuthenticated()) {
		// does user own campground
		try{
			var foundComment = await Comment.findById(req.params.comment_id);
			if (foundComment.author.id.equals(req.user._id)) {
				next();
			} else {
				res.redirect("back");
			}
		} catch(err) {
			console.log(err);
			res.redirect("back");	
		}
	} else {
		//else 
		res.redirect("back");
		// res.redirect("/campgrounds/" + req.params.id + "/edit");
	}
}

module.exports = middlewareObj;