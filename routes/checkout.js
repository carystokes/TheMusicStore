var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('Getting Checkout Page')
  res.render('checkout')
});

router.post('/', function(req, res) {
  res.render('checkout')
})

module.exports = router;
