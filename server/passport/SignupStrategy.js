const Strategy = require('passport-local').Strategy; 
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const SignupStrategy = new Strategy({passReqToCallback: true, usernameField: 'email' }, function(req, email, password, done) {
    
    User.findOne({ email }).lean().exec((err, user) => {
        if (err) {
            return done(error);
        }
        if (user){
            return done('User already exists', null); 
        }

        const encryptedPassword = bcrypt.hashSync(password, salt);
        let newUser = new User({
            email,
            password: encryptedPassword
        });
        newUser.save((error, inserted) =>{
            if (err) {
                return done(error, null);
            }
        
            return done(null, inserted); 

        }); 
    });
});

module.exports = SignupStrategy; 

