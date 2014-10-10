// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	console.log(req.body);
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!' });
  });
};


// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  console.log("fetching users");
  User.find(function(err, users) {
    if (err){
     console.log("error fetching users");
      res.send(err);
    }
    console.log(users);
    res.json(users);
  });
};