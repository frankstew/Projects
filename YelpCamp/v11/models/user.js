var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); // needed for mongoose stuff
module.exports = mongoose.model("User", UserSchema);
// THERES SOMETHING MISSING SO THAT INDX DOESNT SEE THIS FILE OR SOMETHING
// USER.CREATE IS NOT A FUNCTION OR CANNOT CALL CREATE OF UNDEFINED
// ......it was the word require........