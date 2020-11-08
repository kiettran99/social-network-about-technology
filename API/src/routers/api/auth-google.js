const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const User = require('../../models/user');
const { createNotification } = require('../../utils/notification');
const createProfile = require('../../utils/profile');

const appUrl = process.env.APP_URL || 'http://localhost:3000';
const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT}`;

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID_GG,
  clientSecret: process.env.CLIENT_SECRET_GG,
  callbackURL: `${apiUrl}/auth/google/callback`,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {

    try {
      const email = profile.emails[0].value;
      const username = email.split('@')[0].trim();

      User.findOne({ $or: [{ googleId: profile.id }, { email: email }] })
        .then((user) => {

          // 1. Check if user is registed before.
          if (user) {
            // 1.1. If others social account same email
            if (!user.googleId) {
              user.googleId = profile.id;

              user.save().then((user) => {
                return done(null, user);
              });
            }
            else {
              // 1.2. Callback current user
              return done(null, user);
            }
          }

          //2. Create new user
          User.create({
            fullname: profile.displayName,
            email,
            username,
            googleId: profile.id,
            avatar: profile.picture
          }).then((user) => {

            // Create two collections about profile and notification.
            createNotification(user);
            createProfile(user);

            done(null, user);
          });
        })
        .catch((err) => {
          done(err, null);
        })
    }
    catch (e) {
      done(e, null);
    }
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
        return res.redirect(`${appUrl}//notfound`);
      }

      const token = await user.generateAuthToken();

      res.redirect(`${appUrl}?token=${token}`);
    }
    catch (e) {
      console.log(e);
      res.status(500).send('Server is errors.');
    }
  });
module.exports = router;