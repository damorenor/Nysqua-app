const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('./models/users');


// JSON WEB TOKENS STRATEGY


/// Facebook oauth strategy

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: "974527812899696",
    clientSecret: "01e1ff33fe84285678138984e8744f9a"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "methodID": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'facebook',
            methodID: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: "568886817959-8j3mo86mfato65k3qdj65jjlmemih428.apps.googleusercontent.com",
    clientSecret: "LJezw9NLB_jumt3fPQZFEsjS"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "methodID": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'google',
            methodID: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));


// LOCAL STRATEGY
