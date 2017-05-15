var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.user) {
    res.render('orders')
  } else {
    res.send('<h2>Access denied!</h2><a href="/login">You must log in</a>')
  }
});

router.post('/checkout', function(req, res) {
  console.log('Checking Out');
  res.render('checkout')
})

module.exports = router;
