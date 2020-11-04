const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../../models/user');

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/callback`
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ facebookId: profile.id })
            .then((user) => {
                // 1. Check if user is registed before.
                if (user) done(null, user);

                //2. Create new user
                User.create({
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    facebookId: profile.id
                }).then((user) => {
                    done(null, user);
                });
            })
            .catch((err) => {
                done(err, null);
            })
    }
));

router.get('/auth/facebook',

    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
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