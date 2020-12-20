const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../../models/user');
const { createNotification } = require('../../utils/notification');
const createProfile = require('../../utils/profile');

const appUrl = process.env.APP_URL || 'http://localhost:3000';
const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT}`;

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    profileFields: ['id', 'emails', 'name', 'displayName'],
    callbackURL: `${apiUrl}/auth/facebook/callback`
},
    function (accessToken, refreshToken, profile, done) {
        const email = profile.emails[0].value;
        const username = email.split('@')[0].trim();

        User.findOne({ $or: [{ facebookId: profile.id }, { email: email }] })
            .then((user) => {

                // 1. Check if user is registed before.
                if (user) {

                    // 1.1. If others social account same email
                    if (!user.facebookId) {
                        user.facebookId = profile.id;

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
                    fullname: profile.displayName || username,
                    facebookId: profile.id,
                    username,
                    email
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
));

router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
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