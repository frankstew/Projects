let express = require("express");
let passport = require("passport");
let User = require("../models/user.js");
let router = express.Router();

// =============================
// OTHER ROUTES
// =============================

// Register
router.post("/register", (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      console.log("Mongoose find user error: " + err);
    } else if (user) {
      console.log("FFFFF");
      res.status(409).send("User already exists with that username");
    } else if (!user) {
      User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
          console.log("mongoose register error: " + err);
          res.send("ERROR");
        }
        passport.authenticate("local")(req, res, () => {
          res.send(req.user);
        });
      });
    } 
  });
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      console.log("Login Authenticate error: " + err);
      return res.send("Try again"); 
    }
    if (!user) { 
      return res.status(500).send("Wrong username or password"); 
    }
    req.login(user, function(err) {
      if (err) { 
        console.log("Login error: " + err);
        return res.send("try again") 
      }
      return res.send(user);
    });
  })(req, res, next);
});

// Logout
router.post("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});


module.exports = router;