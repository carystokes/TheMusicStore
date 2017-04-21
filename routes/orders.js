var express = require('express');
var router = express.Router();

router.get('/orders', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

router.post('/orders/add', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
})

module.exports = router;
