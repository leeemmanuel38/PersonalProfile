const express = require('express');
const router = express.Router();
const passport = require('../passport'); 


// Custom Passport Callback - authenticate user on sign up
router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', function(error, user, info) {

    if(error) {
      return res.status(500).json({
        message: error || 'something bad happened', 
  
      })
    }

    if(!user) {
      return res.status(500).json({
        message: error || 'Cannot register this user', 
  
      })
    }

    return res.json({user})
    
  })(req, res, next);

});

// Custom Passport Callback - authenticate user on log in
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(error, user, info) {

    if(error) {
      return res.status(500).json({
        message: error || 'something bad happened', 
  
      })
    }

    if(!user) {
      return res.status(500).json({
        message: error || 'Please log in using email and password', 
  
      })
    }

    return res.json({user})
    
  })(req, res, next);
});
module.exports = router;
