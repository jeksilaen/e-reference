const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  email : String,
  password : String,
  references : [{
    title : String,
    summary : String,
    date : String
  }]
  
});



module.exports = mongoose.model('User', userSchema);