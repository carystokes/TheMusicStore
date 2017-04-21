var express = require('express');
var customerRouter = express.Router();
customerRouter.get('/customers', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

customerRouter.get('/customers/update/shipping', function(req, res) {
  res.render('shipping')
});

customerRouter.get('/customers/update/billing', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

customerRouter.get('/customers/update/cart', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

module.exports = customerRouter;
