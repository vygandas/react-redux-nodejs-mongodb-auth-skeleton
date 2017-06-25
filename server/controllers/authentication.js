const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // Sub as subject; iat as issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User already had their email and password authenticated
  // user just needs his access token
  res.json({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  // See if a given user exists
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide email and password!' });
  }

  // If user exists return error
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
        return res.status(422).send({ error: 'Email is already in use!' });
    }

    // If email doesn't exist - create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // Respond to request the user was created
      return res.json({ token: tokenForUser(user) });
    });

  });

}
