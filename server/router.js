const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session: false - prevent creating default session with cookie because
// we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123!' });
  });

  app.post('/signup', Authentication.signup);

  app.post('/signin', requireSignIn, Authentication.signin);

}
