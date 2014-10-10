var Dish = require('../models/dish');

//Create endpoint /api/dish for POST
exports.postDish = function(req, res) {
	var dish = req.body;
    console.log('Adding dish: ' + JSON.stringify(dish));
  var dishRecord = new Dish(dish);

  dishRecord.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New dish added to the menu!' });
  });
};

// Create endpoint /api/dishes for GET
exports.getDishes = function(req, res) {
  Dish.find(function(err, dishes) {
    if (err){
     console.log("error fetching dishes");
      res.send(err);
    }
    res.json(dishes);
  });
};

exports.getDish = function(req, res) {
	  var id = req.params.id;
	  console.log(id);
	  Dish.find({'_id': id}, function(err, dishes) {
	    if (err){
	     console.log("error fetching dishes");
	      res.send(err);
	    }
	    res.json(dishes);
	  });
	};
