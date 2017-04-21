var express = require('express');
var bodyParser = require('body-parser');
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

cart_server.use('/products', products);
cart_server.use('/orders', orders);
cart_server.use('/customers', customers);
cart_server.use('/', index);
cart_server.listen(8080);

module.exports = cart_server
