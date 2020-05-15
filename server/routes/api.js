const express = require('express'); 

const router = express.Router(); 
const BlogPost = require('../models/myblog'); 

// Routes
router.get('/', (req, res) => {

    BlogPost.find({ })
      .then((data) => {
          //console.log('Data: ', data);
          res.json(data); 
      })
      .catch((error) => {
        //console.log('Error: ', error);
      });
  });

  router.post('/save', (req, res) => {
    //console.log('Body:', req.body);
    const data = req.body; 
   
    const newBlogPost = new BlogPost(data); 

    newBlogPost.save((error) => {
      if (error){
        res.status(500).json({
          //msg: 'Internal sever error occurred'
        });
        return; 
      }
      return res.json({
        //msg: 'data has been saved to database' 
      }); 
  });
});


module.exports = router; 