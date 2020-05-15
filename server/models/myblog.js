const mongoose = require('mongoose'); 

//Schema
const Schema = mongoose.Schema; 
const BlogPostSchema = new Schema({
  title: String, 
  body: String, 
  date: {
    type: String,
    default: Date.now(), 
  }
});

// model
const BlogPost = mongoose.model('Blogpost', BlogPostSchema);

module.exports = BlogPost; 