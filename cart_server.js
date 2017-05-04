var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var environment = require('./.env')

function hashPW(password) {
  return crypto.createHash('sha256').update(password).digest('base64').toString();
}

var index = require('./routes/index');
var customers = require('./routes/customers');
var orders = require('./routes/orders');
var products = require('./routes/products');
var registration = require('./routes/registration')

var cart_server = express();
var db;

cart_server.engine('html', require('ejs').renderFile);
cart_server.set('view engine', 'html');
cart_server.set('views', './static');

cart_server.use(bodyParser.urlencoded({ extended: true }));
cart_server.use(bodyParser.json());
cart_server.use(express.static('./static'));

cart_server.use(session({
  secret: 'TheSECRET',
  resave: false,
  saveUninitialized: true,
}));

cart_server.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/')
  })
})

cart_server.get('/login', function(req, res) {
  res.render('authenticate.html');
});

cart_server.post('/login', function(req, res) {
  var user = {name: 'jdoe@mymusicstore.com', password: hashPW('welcome1')};
  if (user.name == req.body.username && user.password === hashPW(req.body.password.toString())) {
    req.session.regenerate(function() {
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;
      res.redirect('/orders')
    });
  } else {
    req.session.regenerate(function() {
      req.session.error = 'Authentication failed.'
    });
    res.redirect('/login');
  }
})

cart_server.use('/registration', registration);
cart_server.use('/products', products);
cart_server.use('/orders', orders);
cart_server.use('/customers', customers);
cart_server.use('/', index);

var mongoKey = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@cluster0-shard-00-00-4iued.mongodb.net:27017,cluster0-shard-00-01-4iued.mongodb.net:27017,cluster0-shard-00-02-4iued.mongodb.net:27017/nodestuff?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
console.log(mongoKey);
debugger;

MongoClient.connect(mongoKey, (err, database) => {
  if (err) return console.log(err)
  db = database
  cart_server.listen(8080, function() {
    console.log('listening on 8080')
  })
})

module.exports = cart_server
