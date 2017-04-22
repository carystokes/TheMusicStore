var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Here is a history of your orders: ')
});

router.post('/add', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
})

module.exports = router;
