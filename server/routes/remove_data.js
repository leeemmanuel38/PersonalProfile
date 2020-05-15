const express = require('express'); 

const router = express.Router(); 
const BlogPost = require('../models/myblog'); 

// Routes
router.get('/', (req, res) => {

    BlogPost.remove({ })
    .then((data) => {
      //console.log('data removed');
    })
    .catch((error) => {
      //console.log('Error:', error);
    });

  });
  


module.exports = router; 