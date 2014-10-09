var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var userController = require('./controllers/user');
var dishController = require('./controllers/dish');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');


var ejs = require('ejs');


//Connect to the bookdish MongoDB
mongoose.connect('mongodb://localhost:27017/bookdish')
// Create our Express application
var app = express();

//Set view engine to ejs
app.set('view engine', 'ejs');
//Use the passport package in our application
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Use express session support since OAuth2orize requires it
app.use(session({ 
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Create our Express router
var router = express.Router();

router.route('/auth').get(function(req, res, next) {
	  res.sendfile('views/login.html');
	});

//Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);


router.get('/dish/:id', dishController.getDish);

//Create endpoint handlers for /dish
router.route('/dish')
  .post(authController.isAuthenticated, dishController.postDish)
  .get(authController.isAuthenticated, dishController.getDishes);

//Create endpoint handlers for /clients
router.route('/client')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

//Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

//Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);
//Register all our routes with /api
app.use('/api', router);
module.exports = app;
