var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

router.get('/update/shipping', function(req, res) {
  res.render('shipping')
});

router.post('/update/shipping', function(req, res) {
  console.log(req.body);
  res.send('Your data has been successfully updated');
});

router.get('/update/billing', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

router.get('/update/cart', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

module.exports = router;
