var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var DishSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
	    type: String
  }
});

//Export the Mongoose model
module.exports = mongoose.model('Dish', DishSchema);