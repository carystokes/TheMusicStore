var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');

function hashPW(password) {
  return crypto.createHash('sha256').update(password).digest('base64').toString();
}

var index = require('./routes/index');
var customers = require('./routes/customers');
var orders = require('./routes/orders');
var products = require('./routes/products');

var cart_server = express();

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

cart_server.use('/products', products);
cart_server.use('/orders', orders);
cart_server.use('/customers', customers);
cart_server.use('/', index);
cart_server.listen(8080);

module.exports = cart_server
