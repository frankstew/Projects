// require mongoose, campgrounds
//clear database

const mongoose 	= require("mongoose"),
  	  Campground	= require("./models/campground.js"),
	    Review		= require("./models/review.js");




var data = [
    {
        name: "Cloud's Rest", 
        img: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        img: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        img: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

let reviewData = [
  {
    username: "some person",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi lacus sed viverra tellus in hac habitasse. Penatibus et magnis dis parturient montes. Elementum integer enim neque volutpat ac tincidunt vitae semper. Convallis tellus id interdum velit laoreet id donec ultrices. Dolor sit amet consectetur adipiscing. Aenean sed adipiscing diam donec adipiscing tristique risus. In arcu cursus euismod quis. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Mattis enim ut tellus elementum. \n \n Augue interdum velit euismod in pellentesque. Turpis tincidunt id aliquet risus. Ullamcorper malesuada proin libero nunc consequat. Euismod lacinia at quis risus sed vulputate odio ut. Nisi porta lorem mollis aliquam ut porttitor leo a. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Quis commodo odio aenean sed adipiscing. Nulla facilisi morbi tempus iaculis urna id volutpat. Lobortis elementum nibh tellus molestie nunc non. Consectetur libero id faucibus nisl tincidunt eget nullam non. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Eu mi bibendum neque egestas congue quisque egestas diam in. Eu mi bibendum neque egestas congue quisque egestas. Eget egestas purus viverra accumsan in nisl. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Ultrices tincidunt arcu non sodales neque sodales ut etiam sit.",
    rating: 4,
    likes: 0,
    dislikes: 0
  },
  {
    username: "anoter person",
    text: "this is a short review.",
    rating: 1,
    likes: 0,
    dislikes: 0
  },
  {
    username: "yet another person",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi lacus sed viverra tellus in hac habitasse. Penatibus et magnis dis parturient montes. Elementum integer enim neque volutpat ac tincidunt vitae semper. Convallis tellus id interdum velit laoreet id donec ultrices. Dolor sit amet consectetur adipiscing. Aenean sed adipiscing diam donec adipiscing tristique risus. In arcu cursus euismod quis. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Mattis enim ut tellus elementum.",
    rating: 5,
    likes: 0,
    dislikes: 0
  }
]






async function seedDB() {
	try {
		await Campground.deleteMany({});
		console.log("removed campgrounds");
		await Review.deleteMany({});
		console.log("Reviews removed");

		data.forEach(async function(campground) {
			var newCampground = await Campground.create(campground);
			console.log("New campground added");
			let review1 = await Review.create(reviewData[2]);
      let review2 = await Review.create(reviewData[1]);
      let review3 = await Review.create(reviewData[0]);
      newCampground.reviews.push(review1, review2, review3);
			await newCampground.save();
			console.log("Created new Review");								
		});
	} catch (err) {
		console.log(err)
	}				
}


module.exports = seedDB;







 
// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Review.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed Reviews!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a Review
//                         Review.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, Review){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.Reviews.push(Review);
//                                     campground.save();
//                                     console.log("Created new Review");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few Reviews
// }
 
// module.exports = seedDB;