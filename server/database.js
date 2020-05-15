const mongoose = require("mongoose");

// connect to mongodb atlas cloud database using mongoose 
const mongooseAccess = async () => {
    const URL = 'mongodb+srv://admin:Illuminorz27@cluster0-vm8dw.mongodb.net/test?retryWrites=true&w=majority'
    
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        //console.log("Database Request Successful!");
      
      } catch (e) {
          //console.log(e);
          throw e;
      }
    };
  
  mongooseAccess();
  
  //verify connection to mongoose
  mongoose.connection.on('connected', () => {
    //console.log('You Are Connected To MongoDB Atlas!'); 
  });

  module.exports = mongooseAccess; 