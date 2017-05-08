var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.user) {
    res.render('orders.ejs')
  } else {
    res.send('<h2>Access denied!</h2><a href="/login">You must log in</a>')
  }
});

router.post('/add', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
})

module.exports = router;
