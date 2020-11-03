const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport'); 
const User = require('../../models/user');
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id, }, function (err, user) {
            return cb(err, user);
        });
        console.log(profile);
    }
));

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/callback');
    });
module.exports = router;