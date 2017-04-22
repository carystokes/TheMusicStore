var express = require('express');
var customerRouter = express.Router();

customerRouter.get('/', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

customerRouter.get('/update/shipping', function(req, res) {
  res.render('shipping')
});

customerRouter.post('/update/shipping', function(req, res) {
  console.log(req.body);
  res.send('Your data has been successfully updated');
});

customerRouter.get('/update/billing', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

customerRouter.get('/update/cart', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

module.exports = customerRouter;
