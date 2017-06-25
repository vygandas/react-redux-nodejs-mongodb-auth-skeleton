const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy for SIGN IN
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify the username and password and call done with user
  // if it's not found - call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { done(null, false); }

    // compare passwords
    user.comparePassword(password, function (err, isMathc) {
      if (err) { return done(err); }
      if (!isMathc) { return done(null, false); }
      return done(null, user);
    });

  });
});

// Set up options for JWT Strategy
const jwtOptions = {
  // Extract token from request header
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy for SIGN UP
// payload - decoded token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user id in the payload exists in the database
  // If it does, call 'done', otherwise, call done without user object
  User.findById(payload.sub, function(err, user) {
    // On error - done(<error>, <user object>)
    if (err) { return done(err, false); }
    if (user) {
      // Found user
      done(null, user);
    } else {
      // Coud'nt find user
      done(null, false);
    }
  })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
