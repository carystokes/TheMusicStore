var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.user) {
    res.render('orders')
  } else {
    res.send('<h2>Access denied!</h2><a href="/login">You must log in</a>')
  }
});

router.get('/checkout', function(req, res) {
  console.log('Getting checkout page');
  res.render('static/checkout')
})

router.post('/checkout', function(req, res, next) {
  console.log('Checking Out');
  next()
})

router.all('/checkout', function(req, res) {
  console.log('Getting checkout page');
  res.render('checkout')
})

module.exports = router;
