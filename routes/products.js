var express = require('express');
var router = express.Router();

router.get('/products', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

module.exports = router;
