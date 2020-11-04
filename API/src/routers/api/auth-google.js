const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const Profile = require('../../models/profile');
const User = require('../../models/user');
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID_GG,
  clientSecret: process.env.CLIENT_SECRET_GG,
  callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {

    User.findOne({ googleId: profile.id })
      .then((user) => {
        console.log(profile);
        // 1. Check if user is registed before.
        if (user) done(null, user);

        //2. Create new user
        User.create({
          fullname: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        }).then((user) => {
          done(null, user);
        });
      })
      .catch((err) => {
        done(err, null);
      })
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    //successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  }), async (req, res) => {

    try {
      const user = req.user;

      if (!user) {
        return res.redirect("http://localhost:3000/notfound");
      }

      const token = await user.generateAuthToken();

      res.redirect("http://localhost:3000?token=" + token);
    }
    catch (e) {
      console.log(e);
      res.status(500).send('Server is errors.');
    }
  });
module.exports = router;