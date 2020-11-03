const router = require('express').Router();
const GoogleStrategy  = require('passport-google-oauth2').Strategy;
const passport = require('passport'); 
const User = require('../../models/user');
passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID_GG,
    clientSecret: process.env.CLIENT_SECRET_GG,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

router.get('/auth/google',
passport.authenticate('google', { scope:
    [ 'email', 'profile' ] })    
);

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
module.exports = router;