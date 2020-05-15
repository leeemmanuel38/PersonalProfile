const passport = require('passport');
const User = require('../models/users'); 

passport.serializeUser(function(user, done) {
    done(null, user.email);
});
   
passport.deserializeUser(function(email, done) {
User.findOne({email}).exec((err, user) => {
        done(err, user);
    });
});

//inport all strategies 
const SignupStrategy = require('./SignupStrategy');
const LoginStrategy = require('./LoginStrategy');

passport.use("local-signup", SignupStrategy); 
passport.use("local-login", LoginStrategy); 

module.exports = passport; 