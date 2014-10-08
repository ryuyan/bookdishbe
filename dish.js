var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('dishdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'dishdb' database");
        db.collection('dishes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'dishes' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 

exports.getDish = function(req, res){
	var id = req.params.id;
	console.log('Retrieving dish: ' + id);
    db.collection('dishes', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
}

exports.getAllDishes = function(req, res) {
    db.collection('dishes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addDish = function(req, res){
	var dish = req.body;
    console.log('Adding dish: ' + JSON.stringify(wine));
    db.collection('dishes', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

var populateDB = function() {
	 
    var dishes = [
    {
        dishId: "1",
        name: "Gong Bao Ji Ding",
        description: "Delicious",
        imageUrl: ""
    },
    {
    	dishId: "2",
        name: "Yu Xiao Rou si",
        description: "Delicious",
        imageUrl: ""
    }];
 
    db.collection('dishes', function(err, collection) {
        collection.insert(dishes, {safe:true}, function(err, result) {});
    });
 
};