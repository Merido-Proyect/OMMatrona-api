const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const User = require('../models/Admin.model')
const Admin = require('../models/User.model')

passport.use('google-auth'), new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, next) => {
        const googleID = profile.id;
        const email = profile.email[0] ? profile.emails[0].value : undefined;
        const image = profile.photos[0].value;

        if(googleID && email) {
            User.findOne({
                $or: [
                    { googleID },
                    { email }
                ]
            })
            .then(user => {
                if (user) {
                    next(null, user)
                    return
                }
                return User.create({
                    email, googleID, password: mongoose.Types.ObjectId(), name, image, active: true
                })
                .then(createdUser => {
                    next(null, createdUser)
                })
            })
            .catch( err => next(err))
        } else {
            next(null, false, { error: 'Error connecting to Google Auth' })
        }


    }
)