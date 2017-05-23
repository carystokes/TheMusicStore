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
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');

var cart_server = express();
var db;

cart_server.engine('html', require('ejs').renderFile);
cart_server.set('view engine', 'ejs');
cart_server.set('views', './static');

cart_server.use(bodyParser.urlencoded({ extended: true }));
cart_server.use(bodyParser.json());
cart_server.use(express.static('./static'));

cart_server.get('/reset', function(req, res) {
  res.render('reset.ejs')
})

cart_server.post('/reset', function(req, res) {
  var user, email, password;

  db.collection('users').find( {email: req.body.email} ).toArray((err, results) => {
    if (err) return console.log(err)
    user = results[0]
    email = user.email
    password = hashPW(user.password)
  })

  setTimeout(function() {if (hashPW(req.body.old_password) == password) {
    db.collection('users').update( { 'email': req.body.email }, { $set: { 'password': req.body.new_password } })
    res.redirect('/')
  } else {
    res.redirect('/login');
  }}, 1000)
})

cart_server.get('/registration', function(req, res) {
  res.render('registration.ejs')
});

cart_server.post('/registration', function(req, res) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var user = req.body
  user['id'] = getRandomInt(1, 1000)
  user['password'] = 'welcome1'
  db.collection('users').save(user, (err, result) => {
    if (err) return console.log(err)
    console.log('Registration Successful')
    res.redirect('/login')
  })
})

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
  res.render('authenticate.ejs');
});

cart_server.post('/login', function(req, res) {
  var user, email, password;

  db.collection('users').find( {email: req.body.username} ).toArray((err, results) => {
    if (err) return console.log(err)
    user = results[0]
    email = user.email
    password = hashPW(user.password)
  })

  setTimeout(function() {if (hashPW(req.body.password) == password) {
    req.session.regenerate(function() {
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;
      res.redirect('/')
    });
  } else {
    req.session.regenerate(function() {
      req.session.error = 'Authentication failed.'
    });
    res.redirect('/login');
  }}, 500)
})

cart_server.use('/cart', cart);
cart_server.use('/products', products);
cart_server.use('/orders', orders);
cart_server.use('/customers', customers);
cart_server.use('/checkout', checkout);
cart_server.use('/', index);

var mongoKey = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@cluster0-shard-00-00-4iued.mongodb.net:27017,cluster0-shard-00-01-4iued.mongodb.net:27017,cluster0-shard-00-02-4iued.mongodb.net:27017/nodestuff?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

MongoClient.connect(mongoKey, (err, database) => {
  if (err) return console.log(err)
  db = database
  cart_server.listen(8080, function() {
    console.log('listening on 8080')
  })
})

module.exports = cart_server
